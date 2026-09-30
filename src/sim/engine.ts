import { NODES } from '../data/nodes'

/** Shared per-frame simulation output read by the 3D scene (filled in by the simulation). */
export const engine = {
  /** 0..1 activation per node index, drives glow */
  activity: new Float32Array(NODES.length),
}
