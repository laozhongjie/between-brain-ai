import * as THREE from 'three'
import { NODE_BY_ID } from '../data/nodes'
import { PATHWAYS } from '../data/pathways'
import { nodePosition } from './layout'

export interface PathCurve {
  curve: THREE.CatmullRomCurve3
  /** number of hops; hop h spans curve parameter [h/hops, (h+1)/hops] via getPoint */
  hops: number
}

let cacheKey = NaN
let cache: PathCurve[] = []

/** One curve per pathway through its nodes' anchor points (cached per explode value). */
export function pathCurves(explode: number): PathCurve[] {
  if (explode === cacheKey) return cache
  cache = PATHWAYS.map((p) => {
    const pts = p.nodes.map((id) => {
      const n = NODE_BY_ID[id]
      return nodePosition(n, explode, n.kind === 'mesh')
    })
    if (p.loop) pts.pop()
    return { curve: new THREE.CatmullRomCurve3(pts, p.loop, 'centripetal'), hops: p.nodes.length - 1 }
  })
  cacheKey = explode
  return cache
}
