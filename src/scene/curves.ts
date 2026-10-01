import * as THREE from 'three'
import { NODE_BY_ID } from '../data/nodes'
import { PATHWAYS } from '../data/pathways'
import { BRAIN_CENTER, nodePosition } from './layout'

/**
 * A pathway as a chain of arcs, one quadratic Bézier per hop. Each arc bows away from the brain centre
 * (perpendicular to its chord), like a fibre tract arching over, and depends only on its two endpoints,
 * so a hop shared by several pathways is drawn as one line instead of a fan of slightly different ones.
 */
class HopCurve extends THREE.Curve<THREE.Vector3> {
  readonly segs: THREE.QuadraticBezierCurve3[]
  constructor(segs: THREE.QuadraticBezierCurve3[]) {
    super()
    this.segs = segs
  }
  /** t in [0, 1]; hop h spans [h/hops, (h+1)/hops] */
  getPoint(t: number, target = new THREE.Vector3()) {
    const u = t * this.segs.length
    const i = Math.min(this.segs.length - 1, Math.floor(u))
    return this.segs[i].getPoint(u - i, target)
  }
}

export interface PathCurve {
  curve: THREE.Curve<THREE.Vector3>
  /** number of hops; hop h spans curve parameter [h/hops, (h+1)/hops] via getPoint */
  hops: number
}

/** Peak offset of an arc from its chord, as a fraction of the chord length. */
const BOW = 0.14
const UP = new THREE.Vector3(0, 1, 0)
const SIDE = new THREE.Vector3(1, 0, 0)

function arc(a: THREE.Vector3, b: THREE.Vector3) {
  const chord = b.clone().sub(a)
  const len = chord.length()
  const dir = chord.divideScalar(len || 1)
  const mid = a.clone().add(b).multiplyScalar(0.5)
  // outward from the brain centre, with the component along the chord removed
  const out = mid.clone().sub(BRAIN_CENTER)
  out.addScaledVector(dir, -out.dot(dir))
  if (out.lengthSq() < 1e-4) out.crossVectors(dir, Math.abs(dir.y) < 0.9 ? UP : SIDE)
  out.normalize()
  // a quadratic's peak sits halfway to its control point
  return new THREE.QuadraticBezierCurve3(a, mid.addScaledVector(out, 2 * BOW * len), b)
}

let cacheKey = NaN
let cache: PathCurve[] = []

/** One arc chain per pathway through its nodes' anchor points (cached per explode value). */
export function pathCurves(explode: number): PathCurve[] {
  if (explode === cacheKey) return cache
  cache = PATHWAYS.map((p) => {
    const pts = p.nodes.map((id) => {
      const n = NODE_BY_ID[id]
      return nodePosition(n, explode, n.kind === 'mesh')
    })
    const segs = pts.slice(1).map((b, i) => arc(pts[i], b))
    return { curve: new HopCurve(segs), hops: segs.length }
  })
  cacheKey = explode
  return cache
}
