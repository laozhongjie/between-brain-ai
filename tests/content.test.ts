import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { MODULES } from '../src/ai/content/blueprint'
import { CARDS, CARD_BY_ID, INTRO_REFS } from '../src/ai/content/index'
import { REF_BY_ID, REFS } from '../src/ai/content/refs'
import { LABS } from '../src/ai/labs/registry'
import { TOUR_BY_ID } from '../src/data/tours'
import { FIGS } from '../src/ai/figs'

describe('AI correspondence content', () => {
  it('ids are unique', () => {
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length)
    expect(new Set(REFS.map((r) => r.id)).size).toBe(REFS.length)
    expect(new Set(MODULES.map((m) => m.id)).size).toBe(MODULES.length)
  })

  it('every formula renders with KaTeX', () => {
    for (const c of CARDS)
      for (const f of [...(c.brainMath ?? []), ...(c.aiMath ?? [])])
        expect(() => katex.renderToString(f.tex, { throwOnError: true }), `${c.id}: ${f.tex}`).not.toThrow()
  })

  it('every cited reference exists and every reference is cited', () => {
    const cited = new Set<string>(INTRO_REFS)
    for (const c of CARDS) c.refs.forEach((r) => cited.add(r))
    for (const m of MODULES) m.refs.forEach((r) => cited.add(r))
    for (const r of cited) expect(REF_BY_ID[r], r).toBeDefined()
    for (const r of REFS) expect(cited.has(r.id), `unused ref ${r.id}`).toBe(true)
  })

  it('links to labs, tours and cards resolve', () => {
    for (const c of CARDS) {
      if (c.lab) expect(LABS[c.lab], c.lab).toBeDefined()
      if (c.tour) expect(TOUR_BY_ID[c.tour], c.tour).toBeDefined()
    }
    for (const m of MODULES) for (const id of m.cards) expect(CARD_BY_ID[id], `${m.id} → ${id}`).toBeDefined()
    // every functional-system tour has a layer-4 card
    for (const id of Object.keys(TOUR_BY_ID)) expect(CARDS.some((c) => c.tour === id), id).toBe(true)
  })

  it('every card has a brain-structure figure and an AI-architecture figure', () => {
    for (const c of CARDS) {
      const f = FIGS[c.id]
      expect(f, c.id).toBeDefined()
      expect(f.brain && f.ai && f.brainCap.zh && f.aiCap.en, c.id).toBeTruthy()
    }
  })

  it('blueprint cells do not overlap', () => {
    const cells = MODULES.map((m) => m.pos.join(','))
    expect(new Set(cells).size).toBe(cells.length)
  })
})
