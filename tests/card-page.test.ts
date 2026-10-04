import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { Bi } from '../src/data/types'
import { CARDS, MECH_CONTENT } from '../src/ai/content'
import { MECH_FIGS } from '../src/ai/figs'
import { CardPage } from '../src/ai/pages/CardPage'
import { UI } from '../src/i18n'

const language = vi.hoisted(() => ({ current: 'zh' as 'zh' | 'en' }))

vi.mock('../src/i18n', async (importOriginal) => ({
  ...await importOriginal<typeof import('../src/i18n')>(),
  useT: () => (text: Bi) => text[language.current],
}))

const escaped = (text: string) => renderToStaticMarkup(createElement('span', null, text)).slice(6, -7)
/** Rich text turns $…$ into KaTeX and links into anchors, so only check the plain parts of a string. */
const plain = (text: string) => text.replace(/\[([^\]]+)\]\((?:card|topic):[a-z0-9-]+\)/g, '\n').split(/\$[^$]+\$|\n/).map((s) => s.trim()).filter((s) => s.length > 3)

describe('mechanism entries', () => {
  for (const lang of ['zh', 'en'] as const) {
    for (const [id, entry] of Object.entries(MECH_CONTENT)) {
      it(`renders every part of the lean template: ${id} / ${lang}`, () => {
        language.current = lang
        const card = CARDS.find((c) => c.id === id)!
        const html = renderToStaticMarkup(createElement(CardPage, { card }))
        const texts: Bi[] = [entry.definition, entry.scale, entry.timescale, ...entry.notes, ...entry.counterpart, ...entry.conditions,
          ...entry.steps.flatMap((s) => [s.title, ...s.points]), ...entry.elsewhere.map((e) => e.title), ...entry.uses.map((u) => u.role),
          ...entry.math.flatMap((f) => [f.title, ...f.symbols.map((x) => x.meaning), ...f.steps, ...(f.example ? [f.example] : []), ...f.consequences, ...f.limitations])]
        for (const text of texts) for (const part of plain(text[lang])) expect(html, part).toContain(escaped(part))
        // the old two-column comparison is gone
        expect(html).not.toContain('<table class="card-comparison">')
        expect(html).not.toContain(escaped(card.guide.boundary[lang]))
        // the mechanism figure (or its pending frame) and any equation figures
        const figs = MECH_FIGS[id]
        expect(html.match(/<svg[^>]*class="fig-svg"/g) ?? []).toHaveLength((figs?.mech ? 1 : 0) + Object.keys(figs?.math ?? {}).length)
        expect(html.match(/<ol class="fig-steps/g) ?? []).toHaveLength(1)
        expect(html.match(/class="formula-card/g) ?? []).toHaveLength(entry.math.length)
        for (const m of JSON.stringify(entry).matchAll(/\]\((card|topic):([a-z0-9-]+)\)/g)) expect(html).toContain(`href="#/ai/${m[1]}/${m[2]}"`)
      })
    }
  }
})

describe('bilingual comparison cards', () => {
  for (const lang of ['zh', 'en'] as const) {
    for (const card of CARDS.filter((c) => !MECH_CONTENT[c.id])) {
      it(`renders paired comparisons: ${card.id} / ${lang}`, () => {
        language.current = lang
        const html = renderToStaticMarkup(createElement(CardPage, { card }))
        if (card.guide.review) {
          const review = card.guide.review
          expect(html).toContain(escaped(review.thesis[lang]))
          expect(html).toContain(escaped(review.systems.biological[lang]))
          expect(html).toContain(escaped(review.systems.computational[lang]))
          for (const row of [...review.capabilities, ...review.state, ...review.timescale]) {
            for (const text of [row.dimension, row.brain, row.ai, 'gap' in row ? row.gap : undefined]) {
              if (text) expect(html).toContain(escaped(text[lang]))
            }
          }
          for (const text of [review.limits.biological, review.limits.computational, review.limits.evidence]) expect(html).toContain(escaped(text[lang]))
          expect(html).toContain(escaped(UI.secArchitecture[lang]))
        } else {
          expect(html).toContain(escaped(card.guide.answer[lang]))
          const table = html.match(/<table class="card-comparison">(.*?)<\/table>/)?.[1]
          expect(table).toBeDefined()
          const rows = [...table!.matchAll(/<tr>(.*?)<\/tr>/g)].slice(1).map((match) => match[1])
          expect(rows).toHaveLength(card.guide.comparisons.length)
          card.guide.comparisons.forEach((row, index) => {
            expect(rows[index]).toContain('scope="row"')
            expect(rows[index]).toContain(escaped(row.dimension[lang]))
            expect(rows[index]).toContain(escaped(row.brain[lang]))
            expect(rows[index]).toContain(escaped(row.ai[lang]))
          })
          expect(html).toContain(escaped(card.guide.boundary[lang]))
          // the old teaching-style sections are gone
          for (const text of card.guide.experiments.map((idea) => idea.title)) expect(html).not.toContain(escaped(text[lang]))
          expect(html).not.toContain(escaped(card.guide.borrow[lang]))
        }
        const formulaGroups = [card.brainMath, card.aiMath].filter((group) => group?.length).length
        expect(html.match(/<div class="card-math">/g) ?? []).toHaveLength(formulaGroups)
        expect(html).not.toContain('<details class="card-math">')
        expect(html).not.toContain('原理还是约束？')
        expect(html).not.toContain('这张卡片回答什么')
      })
    }
  }
})
