import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { MODULES } from '../src/ai/content/blueprint'
import { CARDS, CARD_BY_ID, CROSS_CUTTING, DOMAINS, INTRO_REFS } from '../src/ai/content/index'
import { REF_BY_ID, REFS } from '../src/ai/content/refs'
import { LABS } from '../src/ai/labs/registry'
import { TOUR_BY_ID } from '../src/data/tours'
import { FIGS } from '../src/ai/figs'
import { CARD_GUIDES } from '../src/ai/content/guides'

describe('AI correspondence content', () => {
  it('every card has a complete bilingual guide without orphaned entries', () => {
    expect(Object.keys(CARD_GUIDES).sort()).toEqual(CARDS.map((card) => card.id).sort())
    for (const card of CARDS) {
      const guide = card.guide
      expect(guide, card.id).toBeDefined()
      expect(guide.comparisons.length, card.id).toBeGreaterThanOrEqual(2)
      expect(guide.experiments.length, card.id).toBeGreaterThanOrEqual(2)
      const fields = [guide.question, guide.answer, guide.scope, guide.borrow, guide.boundary,
        ...guide.comparisons.flatMap((row) => [row.dimension, row.brain, row.ai]),
        ...guide.experiments.flatMap((idea) => [idea.title, idea.change, idea.test, idea.tradeoff])]
      for (const field of fields) {
        expect(field.zh.trim().length, card.id).toBeGreaterThan(0)
        expect(field.en.trim().length, card.id).toBeGreaterThan(0)
      }
      expect(new Set(guide.comparisons.map((row) => row.dimension.en)).size, card.id).toBe(guide.comparisons.length)
      expect(new Set(guide.experiments.map((idea) => idea.title.en)).size, card.id).toBe(guide.experiments.length)
    }
  })

  it('ids are unique', () => {
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length)
    expect(new Set(REFS.map((r) => r.id)).size).toBe(REFS.length)
    expect(new Set(MODULES.map((m) => m.id)).size).toBe(MODULES.length)
  })

  it('functional directory covers each card exactly once', () => {
    const grouped = [...DOMAINS, ...CROSS_CUTTING].flatMap((domain) => domain.cards)
    expect(new Set(grouped).size).toBe(grouped.length)
    expect(grouped.sort()).toEqual(CARDS.map((card) => card.id).sort())
    for (const id of grouped) expect(CARD_BY_ID[id], id).toBeDefined()
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
