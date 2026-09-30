import meta from './region_meta.json'
import { REGION_BY_KEY } from './regions'
import type { Hemi, NodeKind, RegionInfo } from './types'

export type Vec3 = [number, number, number]

export interface GraphNode {
  index: number
  /** e.g. "lh.precentral", "brainstem", "rh.eye" */
  id: string
  key: string
  hemi?: Hemi
  kind: NodeKind
  info: RegionInfo
  /** three.js coordinates, before hemisphere explode */
  pos: Vec3
  /** point on the surface used for labels and pathway anchors */
  anchor: Vec3
  /** excluded from simulation and glow (e.g. medial wall) */
  inert: boolean
}

type MetaEntry = { centroid: number[]; anchor: number[]; bboxMin: number[]; bboxMax: number[]; triangles: number }
export const REGION_META = meta as Record<string, MetaEntry>

/** FreeSurfer surface RAS (mm) → three.js, same transform as pipeline/build_brain.py */
export const ras = (r: number, a: number, s: number): Vec3 => [r * 0.01, s * 0.01, -a * 0.01]

// Positions in fsaverage surface RAS (≈ MNI305, mm). Nuclei are approximate literature coordinates;
// body nodes are placed schematically outside the brain.
const BILATERAL_POS: Record<string, [NodeKind, number, number, number]> = {
  lgn: ['nucleus', 22, -25, -9],
  mgn: ['nucleus', 15, -27, -7],
  vpl: ['nucleus', 16, -20, 1],
  snc: ['nucleus', 10, -17, -14],
  eye: ['io', 32, 82, -38],
  ear: ['io', 88, -22, -28],
}
const MIDLINE_POS: Record<string, [NodeKind, number, number, number]> = {
  vta: ['nucleus', 0, -15, -15],
  raphe: ['nucleus', 0, -29, -18],
  lc: ['nucleus', 0, -37, -28],
  aras: ['nucleus', 0, -30, -38],
  scn: ['nucleus', 0, 2, -16],
  pineal: ['nucleus', 0, -33, -1],
  pituitary: ['nucleus', 0, 2, -32],
  nose: ['io', 0, 95, -45],
  tongue: ['io', 0, 80, -78],
  larynx: ['io', 0, 45, -100],
  spinalcord: ['io', 0, -38, -95],
  skin: ['io', -45, -30, -150],
  muscles: ['io', 45, -30, -150],
  heart: ['io', -30, 10, -135],
  adrenal: ['io', 30, 5, -165],
  viscera: ['io', 0, 20, -175],
}

function build(): GraphNode[] {
  const nodes: GraphNode[] = []
  const push = (id: string, key: string, hemi: Hemi | undefined, kind: NodeKind, pos: Vec3, anchor: Vec3) => {
    const info = REGION_BY_KEY[key]
    if (!info) throw new Error(`No region info for ${key}`)
    nodes.push({ index: nodes.length, id, key, hemi, kind, info, pos, anchor, inert: key === 'medialwall' })
  }

  for (const id of Object.keys(REGION_META).sort()) {
    const m = REGION_META[id]
    const [h, k] = id.includes('.') ? id.split('.') : [undefined, id]
    push(id, k, h as Hemi | undefined, 'mesh', m.centroid as Vec3, m.anchor as Vec3)
  }
  for (const [key, [kind, r, a, s]] of Object.entries(BILATERAL_POS)) {
    for (const hemi of ['lh', 'rh'] as const) {
      const p = ras(hemi === 'lh' ? -r : r, a, s)
      push(`${hemi}.${key}`, key, hemi, kind, p, p)
    }
  }
  for (const [key, [kind, r, a, s]] of Object.entries(MIDLINE_POS)) {
    const p = ras(r, a, s)
    push(key, key, undefined, kind, p, p)
  }
  return nodes
}

export const NODES = build()
export const NODE_BY_ID: Record<string, GraphNode> = Object.fromEntries(NODES.map((n) => [n.id, n]))

/** Resolve a base key to a node id, preferring the given hemisphere. */
export function resolveKey(key: string, hemi?: Hemi): string | undefined {
  if (hemi && NODE_BY_ID[`${hemi}.${key}`]) return `${hemi}.${key}`
  if (NODE_BY_ID[key]) return key
  if (NODE_BY_ID[`lh.${key}`]) return `lh.${key}`
  return undefined
}
