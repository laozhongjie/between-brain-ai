import { describe, expect, it } from 'vitest'
import { NODE_H, NODE_W, isBus, makeLayout, type Pt } from '../src/schematic/layout'

const hw = NODE_W / 2
const hh = NODE_H / 2
const near = (a: number, b: number) => Math.abs(a - b) < 0.5

describe.each([1, 1.2, 1.5, 1.8])('schematic routing (stretch %s)', (k) => {
  const L = makeLayout(k)

  /** is point p on the border of node `key` (or on a bar's top edge / end)? */
  const onEnd = (key: string, [x, y]: Pt) => {
    if (isBus(key)) {
      const b = L.buses[key]
      const onTop = near(y, b.y - 9) && x >= b.x0 && x <= b.x1
      const onEndCap = near(y, b.y) && (near(x, b.x0) || near(x, b.x1))
      return onTop || onEndCap
    }
    const n = L.byKey[key]
    const onV = (near(x, n.x - hw) || near(x, n.x + hw)) && y >= n.y - hh && y <= n.y + hh
    const onH = (near(y, n.y - hh) || near(y, n.y + hh)) && x >= n.x - hw && x <= n.x + hw
    return onV || onH
  }

  it('every edge is orthogonal', () => {
    for (const e of L.edges) {
      const p = L.routes[e.id]
      for (let i = 1; i < p.length; i++) {
        const [ax, ay] = p[i - 1]
        const [bx, by] = p[i]
        expect(near(ax, bx) || near(ay, by), `${e.id} segment ${i}`).toBe(true)
      }
    }
  })

  it('every edge starts on its source and ends on its target', () => {
    for (const e of L.edges) {
      const p = L.routes[e.id]
      expect(onEnd(e.from, p[0]), `${e.id} start ${p[0]}`).toBe(true)
      expect(onEnd(e.to, p[p.length - 1]), `${e.id} end ${p[p.length - 1]}`).toBe(true)
    }
  })

  it('no edge passes through a node', () => {
    for (const e of L.edges) {
      const p = L.routes[e.id]
      for (let i = 1; i < p.length; i++) {
        const [ax, ay] = p[i - 1]
        const [bx, by] = p[i]
        for (const n of L.nodes) {
          // interior of the node box (its border may be touched by the edge's own ends)
          const l = n.x - hw + 1, r = n.x + hw - 1, t = n.y - hh + 1, b = n.y + hh - 1
          const hit = near(ay, by)
            ? ay > t && ay < b && Math.max(ax, bx) > l && Math.min(ax, bx) < r
            : ax > l && ax < r && Math.max(ay, by) > t && Math.min(ay, by) < b
          expect(hit, `${e.id} segment ${i} crosses ${n.key}`).toBe(false)
        }
      }
    }
  })

  it('feedforward edges enter from the left, feedback edges from below', () => {
    for (const e of L.edges) {
      if (isBus(e.from) || isBus(e.to)) continue
      const a = L.byKey[e.from]
      const c = L.byKey[e.to]
      const p = L.routes[e.id]
      const [x, y] = p[p.length - 1]
      if (c.col > a.col) expect(near(x, c.x - hw), `${e.id} should enter left`).toBe(true)
      if (c.col < a.col) expect(near(y, c.y + hh), `${e.id} should enter bottom`).toBe(true)
    }
  })
})
