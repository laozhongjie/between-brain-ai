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
        for (const tex of [f.tex, ...f.symbols.map((s) => s.tex)])
          expect(() => katex.renderToString(tex, { throwOnError: true }), `${id}: ${tex}`).not.toThrow()
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

  it('every topic page is complete: thesis per side, capabilities, explained figures, taught equations, limits, evidence', () => {
    for (const [id, page] of Object.entries(TOPIC_CONTENT)) {
      expect(TOPIC_BY_ID[id], id).toBeDefined()
      const figs = TOPIC_FIGS[id]
      // figures may still be missing, but a figure set never comes half-drawn; a dynamics figure only where the page explains one
      if (figs?.arch) expect(figs.arch.brain && figs.arch.ai && (!page.dynamicsSteps || figs.dynamics), id).toBeTruthy()
      if (figs?.dynamics) expect(page.dynamicsSteps, id).toBeDefined()
      expect(page.capabilities.length, id).toBeGreaterThanOrEqual(3)
      for (const r of page.capabilities) expect(['bio', 'comp', 'even', 'mixed'], `${id}: ${r.dimension.en}`).toContain(r.lead)
      expect(page.bioMath.length && page.compMath.length, id).toBeTruthy()
      expect(page.refs.neuro.length && page.refs.models.length && page.refs.ai.length, id).toBeTruthy()
      for (const steps of page.dynamicsSteps ? [page.dynamicsSteps.biological, page.dynamicsSteps.computational] : [])
        expect(steps.length && steps.every((s) => s.points.length), id).toBeTruthy()
      expect(page.archSteps.biological.length && page.archSteps.computational.length, id).toBeTruthy()
      expect(page.archNotes.biological.length && page.archNotes.computational.length, id).toBeTruthy()
      for (const f of [...page.bioMath, ...page.compMath])
        expect(f.symbols.length && f.steps.length && f.consequences.length && f.limitations.length, `${id}: ${f.tex}`).toBeTruthy()
      const fields = [page.short.biological, page.short.computational, page.thesis.biological, page.thesis.computational, page.thesis.gap, page.asOf,
        ...[...page.limits.biological, ...page.limits.computational].flatMap((l) => [l.title, l.text]), ...page.limits.misreadings.flatMap((m) => [m.claim, m.fact]),
        ...page.capabilities.flatMap((r) => [r.dimension, r.brain, r.ai, r.gap]),
        ...[...page.archSteps.biological, ...page.archSteps.computational].flatMap((s) => [s.title, ...s.points]),
        ...page.archNotes.biological, ...page.archNotes.computational,
        ...[...(page.dynamicsSteps?.biological ?? []), ...(page.dynamicsSteps?.computational ?? [])].flatMap((s) => [s.title, ...s.points]),
        ...[...page.bioMath, ...page.compMath].flatMap((f) => [f.title, ...f.symbols.map((x) => x.meaning), ...f.steps, ...(f.example ? [f.example] : []), ...f.consequences, ...f.limitations])]
      for (const f of fields) expect(f.zh.trim() && f.en.trim(), id).toBeTruthy()
      expect(page.limits.biological.length && page.limits.computational.length && page.limits.misreadings.length, id).toBeTruthy()
      // a kept figure sits next to an equation that exists
      for (const [side, list] of [['bio', page.bioMath], ['comp', page.compMath]] as const)
        for (const i of Object.keys(figs?.math?.[side] ?? {})) expect(Number(i) < list.length, `${id}: ${side} figure ${i}`).toBe(true)
      // a limit points at architecture steps that exist on its own side
      for (const [limits, steps] of [[page.limits.biological, page.archSteps.biological], [page.limits.computational, page.archSteps.computational]] as const)
        for (const l of limits) for (const n of l.steps ?? []) expect(n >= 1 && n <= steps.length, `${id}: ${l.title.en} step ${n}`).toBe(true)
    }
    for (const id of Object.keys(TOPIC_FIGS)) expect(TOPIC_CONTENT[id], id).toBeDefined()
  })

  it('every cross-reference in the content points to an existing page', () => {
    const text = JSON.stringify([CARDS, TOPIC_CONTENT, MODULES])
    for (const m of text.matchAll(/\]\((card|topic):([a-z0-9-]+)\)/g)) {
      if (m[1] === 'card') expect(CARD_BY_ID[m[2]], m[0]).toBeDefined()
      else expect(TOPIC_CONTENT[m[2]], m[0]).toBeDefined()
    }
  })

  it('blueprint cells do not overlap', () => {
    const cells = MODULES.map((m) => m.pos.join(','))
    expect(new Set(cells).size).toBe(cells.length)
  })
})
