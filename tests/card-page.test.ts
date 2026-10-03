import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { Bi } from '../src/data/types'
import { CARDS } from '../src/ai/content'
import { CardPage } from '../src/ai/pages/CardPage'
import { UI } from '../src/i18n'

const language = vi.hoisted(() => ({ current: 'zh' as 'zh' | 'en' }))

vi.mock('../src/i18n', async (importOriginal) => ({
  ...await importOriginal<typeof import('../src/i18n')>(),
  useT: () => (text: Bi) => text[language.current],
}))

const escaped = (text: string) => renderToStaticMarkup(createElement('span', null, text)).slice(6, -7)

describe('bilingual comparison cards', () => {
  for (const lang of ['zh', 'en'] as const) {
    for (const card of CARDS) {
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
