import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { MODULES } from '../src/ai/content/blueprint'
import { CARDS, CARD_BY_ID, CROSS_TOPICS, DOMAINS, INTRO_REFS, MECH_BY_ID, MECH_GROUPS, TOPICS, TOPIC_BY_ID, TOPIC_CONTENT, aiLinkForTour } from '../src/ai/content/index'
import { REF_BY_ID, REFS } from '../src/ai/content/refs'
import { LABS } from '../src/ai/labs/registry'
import { TOUR_BY_ID } from '../src/data/tours'
import { FIGS, TOPIC_FIGS } from '../src/ai/figs'
import { CARD_GUIDES } from '../src/ai/content/guides'

describe('AI correspondence content', () => {
  it('every card has a complete bilingual guide without orphaned entries', () => {
    expect(Object.keys(CARD_GUIDES).sort()).toEqual(CARDS.map((card) => card.id).sort())
    for (const card of CARDS) {
      const guide = card.guide
      expect(guide, card.id).toBeDefined()
      expect(guide.comparisons.length, card.id).toBeGreaterThanOrEqual(2)
      const fields = [guide.answer, guide.scope, guide.boundary, ...guide.comparisons.flatMap((row) => [row.dimension, row.brain, row.ai])]
      for (const field of fields) {
        expect(field.zh.trim().length, card.id).toBeGreaterThan(0)
        expect(field.en.trim().length, card.id).toBeGreaterThan(0)
      }
      expect(new Set(guide.comparisons.map((row) => row.dimension.en)).size, card.id).toBe(guide.comparisons.length)
    }
  })

  it('ids are unique', () => {
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length)
    expect(new Set(TOPICS.map((t) => t.id)).size).toBe(TOPICS.length)
    expect(new Set(TOPICS.map((t) => t.code)).size).toBe(TOPICS.length)
    expect(new Set(REFS.map((r) => r.id)).size).toBe(REFS.length)
    expect(new Set(MODULES.map((m) => m.id)).size).toBe(MODULES.length)
  })

  it('the domains list every topic exactly once', () => {
    const listed = DOMAINS.flatMap((domain) => domain.topics)
    expect(new Set(listed).size).toBe(listed.length)
    expect([...listed].sort()).toEqual(TOPICS.map((t) => t.id).sort())
  })

  it('the mechanism index holds every layer 1 to 3 card exactly once', () => {
    const indexed = MECH_GROUPS.flatMap((group) => group.cards)
    expect(new Set(indexed).size).toBe(indexed.length)
    expect([...indexed].sort()).toEqual(CARDS.filter((c) => c.layer <= 3).map((c) => c.id).sort())
  })

  it('every old system card is reachable from a topic, a cross-domain topic or an atlas tour', () => {
    for (const c of CARDS.filter((card) => card.layer === 4)) {
      const reachable = TOPICS.some((t) => t.legacy === c.id) || CROSS_TOPICS.some((x) => x.legacy === c.id) || !!c.tour
      expect(reachable, c.id).toBe(true)
    }
  })

  it('topic links resolve', () => {
    for (const t of TOPICS) {
      if (t.legacy) expect(CARD_BY_ID[t.legacy], `${t.id} legacy`).toBeDefined()
      if (t.tour) expect(TOUR_BY_ID[t.tour], `${t.id} tour`).toBeDefined()
      for (const m of t.mechanisms) expect(MECH_BY_ID[m], `${t.id} → ${m}`).toBeDefined()
      for (const side of [t.systems.biological, t.systems.computational, t.name]) expect(side.zh && side.en, t.id).toBeTruthy()
    }
    for (const x of CROSS_TOPICS) if (x.legacy) expect(CARD_BY_ID[x.legacy], x.id).toBeDefined()
    expect(TOPIC_BY_ID['episodic-memory']).toBeDefined()
  })

  it('every formula renders with KaTeX', () => {
    for (const c of CARDS)
      for (const f of [...(c.brainMath ?? []), ...(c.aiMath ?? [])])
        expect(() => katex.renderToString(f.tex, { throwOnError: true }), `${c.id}: ${f.tex}`).not.toThrow()
    for (const [id, page] of Object.entries(TOPIC_CONTENT))
      for (const f of [...page.bioMath, ...page.compMath])
        expect(() => katex.renderToString(f.tex, { throwOnError: true }), `${id}: ${f.tex}`).not.toThrow()
  })

  it('every cited reference exists and every reference is cited', () => {
    const cited = new Set<string>(INTRO_REFS)
    for (const c of CARDS) c.refs.forEach((r) => cited.add(r))
    for (const m of MODULES) m.refs.forEach((r) => cited.add(r))
    for (const page of Object.values(TOPIC_CONTENT)) [...page.refs.neuro, ...page.refs.models, ...page.refs.ai].forEach((r) => cited.add(r))
    for (const r of cited) expect(REF_BY_ID[r], r).toBeDefined()
    for (const r of REFS) expect(cited.has(r.id), `unused ref ${r.id}`).toBe(true)
  })

  it('links to labs, tours and cards resolve', () => {
    for (const c of CARDS) {
      if (c.lab) expect(LABS[c.lab], c.lab).toBeDefined()
      if (c.tour) expect(TOUR_BY_ID[c.tour], c.tour).toBeDefined()
    }
    for (const m of MODULES) for (const id of m.cards) expect(CARD_BY_ID[id], `${m.id} → ${id}`).toBeDefined()
    // every functional-system tour links to an AI comparison
    for (const id of Object.keys(TOUR_BY_ID)) expect(aiLinkForTour(id), id).toBeDefined()
  })

  it('every card has a brain-structure figure and an AI-architecture figure', () => {
    for (const c of CARDS) {
      const f = FIGS[c.id]
      expect(f, c.id).toBeDefined()
      expect(f.brain && f.ai && f.brainCap.zh && f.aiCap.en, c.id).toBeTruthy()
    }
  })

  it('every topic page is complete: capabilities, figures, equations, limits and grouped evidence', () => {
    for (const [id, page] of Object.entries(TOPIC_CONTENT)) {
      expect(TOPIC_BY_ID[id], id).toBeDefined()
      const figs = TOPIC_FIGS[id]
      expect(figs?.arch.brain && figs.arch.ai && figs.dynamics.Fig, id).toBeTruthy()
      expect(page.capabilities.length, id).toBeGreaterThanOrEqual(3)
      expect(page.bioMath.length && page.compMath.length, id).toBeTruthy()
      expect(page.refs.neuro.length && page.refs.models.length && page.refs.ai.length, id).toBeTruthy()
      const fields = [page.thesis, page.asOf, page.limits.biological, page.limits.computational, page.limits.unsupported,
        figs.arch.brainCap, figs.arch.aiCap, figs.dynamics.cap,
        ...page.capabilities.flatMap((r) => [r.dimension, r.brain, r.ai, r.gap]),
        ...[...page.bioMath, ...page.compMath].flatMap((f) => [f.caption, f.maps, f.explains, f.limits])]
      for (const f of fields) expect(f.zh.trim() && f.en.trim(), id).toBeTruthy()
    }
    for (const id of Object.keys(TOPIC_FIGS)) expect(TOPIC_CONTENT[id], id).toBeDefined()
  })

  it('blueprint cells do not overlap', () => {
    const cells = MODULES.map((m) => m.pos.join(','))
    expect(new Set(cells).size).toBe(cells.length)
  })
})
