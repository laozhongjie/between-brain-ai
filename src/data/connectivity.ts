import type { Edge } from '../sim/wilsonCowan'
import { NODES, NODE_BY_ID, type GraphNode } from './nodes'
import { PATHWAYS } from './pathways'

const CORTICAL_LOBES = new Set(['frontal', 'parietal', 'temporal', 'occipital', 'limbic', 'insula'])
const isCortical = (n: GraphNode) => n.kind === 'mesh' && !n.inert && CORTICAL_LOBES.has(n.info.lobe)

const dist = (a: GraphNode, b: GraphNode) => Math.hypot(a.pos[0] - b.pos[0], a.pos[1] - b.pos[1], a.pos[2] - b.pos[2])

/** Conduction delay: ~6 mm/ms myelinated axons + 1 ms synaptic (scene units are decimetres). */
const delayMs = (a: GraphNode, b: GraphNode) => Math.min(55, 1 + (dist(a, b) * 100) / 6)

/**
 * Structural coupling for the neural-mass model, combining
 *  1. curated pathways (pathways.ts),
 *  2. thalamocortical loops, 3. homotopic callosal links, 4. short-range cortical neighbours.
 * Incoming weights are normalised per node so well-connected hubs do not saturate.
 */
export function buildConnectivity(): Edge[] {
  const w = new Map<string, number>()
  const add = (a: GraphNode, b: GraphNode, weight: number) => {
    if (a.inert || b.inert || a === b) return
    const k = `${a.index}>${b.index}`
    w.set(k, (w.get(k) ?? 0) + weight)
  }

  for (const p of PATHWAYS) {
    const sign = p.kind === 'inhib' ? -1 : 1
    const base = (p.weight ?? 1) * (p.kind === 'modul' ? 0.6 : 1)
    for (let i = 0; i + 1 < p.nodes.length; i++) add(NODE_BY_ID[p.nodes[i]], NODE_BY_ID[p.nodes[i + 1]], sign * base)
  }

  const cortex = NODES.filter(isCortical)
  for (const hemi of ['lh', 'rh'] as const) {
    const thal = NODE_BY_ID[`${hemi}.thalamus`]
    for (const c of cortex.filter((x) => x.hemi === hemi)) {
      add(thal, c, 0.25)
      add(c, thal, 0.2)
    }
  }
  for (const c of cortex) {
    if (c.hemi !== 'lh') continue
    const other = NODE_BY_ID[`rh.${c.key}`]
    if (other) {
      add(c, other, 0.2)
      add(other, c, 0.2)
    }
  }
  for (const a of cortex) {
    for (const b of cortex) {
      if (a === b || a.hemi !== b.hemi) continue
      const d = dist(a, b)
      if (d < 0.35) add(a, b, 0.3 * Math.exp(-d / 0.15))
    }
  }

  // Normalise excitatory in-strength to ≤ 1 per target
  const inSum = new Float64Array(NODES.length)
  for (const [k, v] of w) if (v > 0) inSum[+k.split('>')[1]] += v
  const edges: Edge[] = []
  for (const [k, v] of w) {
    const [s, d] = k.split('>').map(Number)
    const scale = 1 / Math.max(1, inSum[d])
    edges.push({ src: s, dst: d, weight: v * scale, delay: delayMs(NODES[s], NODES[d]) })
  }
  return edges
}

export const CORTICAL_INDICES = NODES.filter(isCortical).map((n) => n.index)
