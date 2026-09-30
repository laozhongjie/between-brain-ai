import { describe, expect, it } from 'vitest'
import { NODES, REGION_META, resolveKey } from '../src/data/nodes'
import { REGIONS } from '../src/data/regions'

describe('brain data', () => {
  it('every mesh in the model has region info', () => {
    expect(Object.keys(REGION_META).length).toBe(90)
    for (const id of Object.keys(REGION_META)) expect(NODES.some((n) => n.id === id)).toBe(true)
  })

  it('every input/output link points to an existing node', () => {
    for (const r of REGIONS) {
      for (const link of [...r.inputs, ...r.outputs]) {
        expect(resolveKey(link.key), `${r.key} → ${link.key}`).toBeDefined()
      }
    }
  })

  it('every region is used by at least one node', () => {
    for (const r of REGIONS) expect(NODES.some((n) => n.key === r.key), r.key).toBe(true)
  })

  it('node ids are unique', () => {
    expect(new Set(NODES.map((n) => n.id)).size).toBe(NODES.length)
  })
})
