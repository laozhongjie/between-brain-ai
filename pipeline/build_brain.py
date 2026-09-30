"""Build the brain model used by the web app.

Source: FreeSurfer `fsaverage` template (downloaded via MNE).
  - Cortex: pial surface split by the Desikan-Killiany atlas (aparc.annot), 34 regions / hemisphere.
  - Subcortex: marching cubes on aseg.mgz labels.
  - Hypothalamus: no aseg label -> small ellipsoid placed at its anatomical location (approximation).

Output (written to ../public/models):
  brain.glb          one mesh per region, mesh name == region id (e.g. "lh.precentral", "rh.thalamus")
  region_meta.json   per region: centroid, surface anchor point, bbox, triangle count

Coordinates: FreeSurfer surface RAS (mm) converted to three.js (Y-up) and scaled to decimeters:
  three.x = R, three.y = S, three.z = -A   (x 0.01)
"""

from __future__ import annotations

import json
from pathlib import Path

import fast_simplification
import mne
import nibabel as nib
import numpy as np
import trimesh
from scipy.ndimage import gaussian_filter
from scipy.spatial import cKDTree
from skimage.measure import marching_cubes

ROOT = Path(__file__).resolve().parent
CACHE = ROOT / ".cache"
OUT = ROOT.parent / "public" / "models"

SCALE = 0.01
CORTEX_FACES_PER_HEMI = 90_000

# aseg label ids (FreeSurferColorLUT) -> region id suffix, target triangle count
SUBCORTICAL = {
    "thalamus": ((10, 49), 4000),
    "caudate": ((11, 50), 3000),
    "putamen": ((12, 51), 3000),
    "pallidum": ((13, 52), 2000),
    "hippocampus": ((17, 53), 4000),
    "amygdala": ((18, 54), 2000),
    "accumbens": ((26, 58), 1500),
    "ventraldc": ((28, 60), 3000),
    "cerebellum": ((8, 47), 30000),
}
MIDLINE = {"brainstem": (16, 8000)}


def ras_to_three(v: np.ndarray) -> np.ndarray:
    return np.column_stack([v[:, 0], v[:, 2], -v[:, 1]]) * SCALE


def decimate(verts: np.ndarray, faces: np.ndarray, target_faces: int):
    if len(faces) <= target_faces:
        return verts, faces
    reduction = 1.0 - target_faces / len(faces)
    return fast_simplification.simplify(verts.astype(np.float32), faces.astype(np.int32), reduction)


def make_mesh(verts_ras, faces, normals=None) -> trimesh.Trimesh:
    v = ras_to_three(verts_ras)
    m = trimesh.Trimesh(v, faces, process=False)
    if normals is not None:
        m.vertex_normals = ras_to_three(normals) / SCALE
    return m


def build_cortex(fs_dir: Path) -> dict[str, trimesh.Trimesh]:
    meshes = {}
    for hemi in ("lh", "rh"):
        verts, faces = nib.freesurfer.read_geometry(fs_dir / "surf" / f"{hemi}.pial")
        labels, _ctab, names = nib.freesurfer.read_annot(fs_dir / "label" / f"{hemi}.aparc.annot")
        names = [n.decode() for n in names]

        dv, df = decimate(verts, faces, CORTEX_FACES_PER_HEMI)
        # Label decimated vertices from nearest original vertex, faces by majority vote.
        _, nn = cKDTree(verts).query(dv)
        vlab = labels[nn]
        fl = vlab[df]
        face_lab = np.where(fl[:, 1] == fl[:, 2], fl[:, 1], fl[:, 0])

        full = trimesh.Trimesh(dv, df, process=False)
        normals = full.vertex_normals  # smooth normals across region seams

        for lab in np.unique(face_lab):
            name = names[lab] if lab >= 0 else "unknown"
            if name in ("unknown", "corpuscallosum"):
                name = "medialwall"
            sel = df[face_lab == lab]
            used = np.unique(sel)
            remap = -np.ones(len(dv), dtype=np.int64)
            remap[used] = np.arange(len(used))
            rid = f"{hemi}.{name}"
            m = make_mesh(dv[used], remap[sel], normals[used])
            meshes[rid] = trimesh.util.concatenate([meshes[rid], m]) if rid in meshes else m
        print(f"{hemi}: {len(df)} faces, {sum(k.startswith(hemi) for k in meshes)} regions")
    return meshes


def label_surface(aseg: np.ndarray, affine: np.ndarray, label_id: int, target: int):
    mask = (aseg == label_id).astype(np.float32)
    if mask.sum() == 0:
        raise ValueError(f"aseg label {label_id} is empty")
    smooth = gaussian_filter(mask, sigma=1.0)
    verts, faces, _n, _v = marching_cubes(smooth, level=0.5)
    verts = nib.affines.apply_affine(affine, verts)
    faces = faces[:, ::-1]  # marching_cubes winding is inward for this orientation; fixed below anyway
    m = trimesh.Trimesh(verts, faces, process=True)
    trimesh.smoothing.filter_taubin(m, iterations=10)
    v, f = decimate(m.vertices, m.faces, target)
    m = trimesh.Trimesh(v, f, process=True)
    m.fix_normals()
    return m.vertices, m.faces


def build_subcortex(fs_dir: Path) -> dict[str, trimesh.Trimesh]:
    img = nib.load(fs_dir / "mri" / "aseg.mgz")
    aseg = np.asarray(img.dataobj).astype(np.int32)
    affine = img.header.get_vox2ras_tkr()
    meshes = {}
    for name, ((l, r), target) in SUBCORTICAL.items():
        for hemi, lid in (("lh", l), ("rh", r)):
            v, f = label_surface(aseg, affine, lid, target)
            meshes[f"{hemi}.{name}"] = make_mesh(v, f)
    for name, (lid, target) in MIDLINE.items():
        v, f = label_surface(aseg, affine, lid, target)
        meshes[name] = make_mesh(v, f)
    return meshes


def build_hypothalamus() -> trimesh.Trimesh:
    # Approximate bilateral hypothalamus flanking the 3rd ventricle, below the thalamus.
    # Centre / radii in fsaverage surface RAS (mm) ~ MNI305.
    m = trimesh.creation.icosphere(subdivisions=3)
    m.vertices *= np.array([7.0, 9.0, 6.0])
    m.vertices += np.array([0.0, -4.0, -11.0])
    return make_mesh(m.vertices, m.faces)


def region_meta(meshes: dict[str, trimesh.Trimesh]) -> dict:
    meta = {}
    for rid, m in meshes.items():
        c = m.vertices.mean(axis=0)
        anchor = m.vertices[np.argmin(np.linalg.norm(m.vertices - c, axis=1))]
        meta[rid] = {
            "centroid": np.round(c, 4).tolist(),
            "anchor": np.round(anchor, 4).tolist(),
            "bboxMin": np.round(m.vertices.min(axis=0), 4).tolist(),
            "bboxMax": np.round(m.vertices.max(axis=0), 4).tolist(),
            "triangles": int(len(m.faces)),
        }
    return meta


def main() -> None:
    CACHE.mkdir(exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    fs_dir = Path(mne.datasets.fetch_fsaverage(subjects_dir=CACHE, verbose=False))

    meshes = {}
    meshes.update(build_cortex(fs_dir))
    meshes.update(build_subcortex(fs_dir))
    meshes["hypothalamus"] = build_hypothalamus()

    scene = trimesh.Scene()
    for rid, m in sorted(meshes.items()):
        scene.add_geometry(m, node_name=rid, geom_name=rid)
    glb = scene.export(file_type="glb")
    (OUT / "brain.glb").write_bytes(glb)

    meta = region_meta(meshes)
    (OUT / "region_meta.json").write_text(json.dumps(meta, indent=1))

    total = sum(v["triangles"] for v in meta.values())
    for rid in sorted(meta):
        print(f"  {rid:32s} {meta[rid]['triangles']:7d} tris")
    print(f"{len(meta)} regions, {total} triangles, glb {len(glb) / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
