import * as THREE from 'three'
import { useStore, type ClipAxis } from '../store'
import { BRAIN_CENTER } from './layout'

/** Shared section plane; three.js discards fragments on its negative side. */
export const clipPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0)

const NORMALS: Record<Exclude<ClipAxis, 'none'>, [THREE.Vector3, number, number]> = {
  // normal, centre coordinate on that axis, half extent
  sagittal: [new THREE.Vector3(-1, 0, 0), BRAIN_CENTER.x, 0.72],
  coronal: [new THREE.Vector3(0, 0, 1), BRAIN_CENTER.z, 0.9],
  axial: [new THREE.Vector3(0, -1, 0), BRAIN_CENTER.y, 0.78],
}

export function updateClipPlane(axis: ClipAxis, offset: number) {
  if (axis === 'none') return
  const [n, c, half] = NORMALS[axis]
  clipPlane.normal.copy(n)
  const along = n.x + n.y + n.z // ±1
  clipPlane.constant = -along * (c + offset * half)
}

/**
 * First intersection that is pickable and not cut away by the section plane. While the cortex is
 * see-through, a structure inside the brain (userData.deep) under the cursor wins over the cortex in front
 * of it; otherwise the cortical region is picked, so it can be hovered at any opacity.
 */
export function pickValid(hits: THREE.Intersection[]): string | null {
  const { clipAxis, cortexOpacity } = useStore.getState().view
  const preferDeep = cortexOpacity < 0.6
  let first: string | null = null
  for (const h of hits) {
    const id = h.object.userData.nodeId as string | undefined
    if (!id || !h.object.userData.pickable || !h.object.visible) continue
    if (clipAxis !== 'none' && clipPlane.distanceToPoint(h.point) < 0) continue
    if (!preferDeep || h.object.userData.deep) return id
    first ??= id
  }
  return first
}
