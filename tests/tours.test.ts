import { describe, expect, it } from 'vitest'
import { NODE_BY_ID } from '../src/data/nodes'
import { PATHWAYS, PATHWAY_DEFS } from '../src/data/pathways'
import { TOURS, idsFor, stepSets, tourSets } from '../src/data/tours'
import { HOP_EDGE, SEDGE_BY_ID, SNODE_BY_KEY, isBus } from '../src/schematic/layout'

const ids = new Set(PATHWAY_DEFS.map((p) => p.id))

describe('system tours', () => {
  it('reference existing pathways and regions', () => {
    for (const t of TOURS) {
      for (const p of t.pathways) expect(ids.has(p), `${t.id}: ${p}`).toBe(true)
      for (const s of t.steps) {
        for (const f of s.fire ?? []) expect(ids.has(typeof f === 'string' ? f : f[0]), `${t.id}: ${f}`).toBe(true)
        for (const x of s.stim ?? []) expect(idsFor(x).length, `${t.id}: ${x}`).toBeGreaterThan(0)
      }
    }
  })

  it('every step stays inside its system', () => {
    for (const t of TOURS) {
      const all = tourSets(t)
      for (const s of t.steps) for (const n of stepSets(s).nodes) expect(all.nodes.has(n), `${t.id}: ${n}`).toBe(true)
    }
  })
})

describe('schematic layout', () => {
  it('has a node or bus for every structure on a pathway', () => {
    for (const p of PATHWAYS) for (const id of p.nodes) {
      const key = NODE_BY_ID[id].key
      expect(isBus(key) || key in SNODE_BY_KEY, key).toBe(true)
    }
  })

  it('maps every pathway hop to an edge', () => {
    PATHWAYS.forEach((p, i) => HOP_EDGE[i].forEach((e) => expect(SEDGE_BY_ID[e] || e.split('>')[0] === e.split('>')[1], `${p.uid} ${e}`).toBeTruthy()))
  })
})
