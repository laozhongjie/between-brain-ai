import * as THREE from 'three'
import type { GraphNode, Vec3 } from '../data/nodes'
import { SYSTEMS } from '../data/regions'
import type { ColorMode } from '../store'
import { ink } from '../theme'

/** Centre of the cortex bounding box in three.js coordinates (fsaverage surface RAS origin). */
export const BRAIN_CENTER = new THREE.Vector3(0, 0.05, 0.18)

/** x-offset applied to a node when hemispheres are pulled apart. */
export const hemiOffset = (hemi: string | undefined, explode: number) =>
  hemi === 'lh' ? -explode : hemi === 'rh' ? explode : 0

export function nodePosition(n: GraphNode, explode: number, useAnchor = false, out = new THREE.Vector3()) {
  const p: Vec3 = useAnchor ? n.anchor : n.pos
  return out.set(p[0] + hemiOffset(n.hemi, explode), p[1], p[2])
}

const ANATOMY: Record<string, string> = {
  cortex: '#f8d3d8',
  cerebellum: '#f1c5d2',
  brainstem: '#e9c2cf',
  subcortical: '#f0cfd3',
  medialwall: '#d9ccd3',
}

export function baseColor(n: GraphNode, mode: ColorMode): THREE.Color {
  if (n.key === 'medialwall') return new THREE.Color(ANATOMY.medialwall)
  if (mode === 'system' || n.kind !== 'mesh') return new THREE.Color(SYSTEMS[n.info.system].color)
  const lobe = n.info.lobe
  if (lobe === 'cerebellum') return new THREE.Color(ANATOMY.cerebellum)
  if (lobe === 'brainstem') return new THREE.Color(ANATOMY.brainstem)
  if (lobe === 'subcortical') {
    // subcortical nuclei keep a muted hint of their system colour so they are distinguishable
    return new THREE.Color(ANATOMY.subcortical).lerp(new THREE.Color(SYSTEMS[n.info.system].color), 0.45)
  }
  return new THREE.Color(ANATOMY.cortex)
}

/** Activation colour: a deeper tone of the system's pastel so activity reads on the light ground. */
export const glowColor = (n: GraphNode) => new THREE.Color(ink(SYSTEMS[n.info.system].color, 0.15))

export const isCortex = (n: GraphNode) =>
  n.kind === 'mesh' && ['frontal', 'parietal', 'temporal', 'occipital', 'limbic', 'insula'].includes(n.info.lobe)
