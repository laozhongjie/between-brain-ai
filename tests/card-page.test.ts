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
      it(`renders paired comparisons and actionable proposals: ${card.id} / ${lang}`, () => {
        language.current = lang
        const html = renderToStaticMarkup(createElement(CardPage, { card }))
        expect(html).toContain(escaped(card.guide.question[lang]))
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
        for (const idea of card.guide.experiments) {
          for (const text of [idea.title, idea.change, idea.test, idea.tradeoff]) expect(html).toContain(escaped(text[lang]))
        }
        expect(html).toContain(escaped(UI.designStatus[lang]))
        expect(html).toContain(escaped(card.guide.boundary[lang]))
        const formulaGroups = [card.brainMath, card.aiMath].filter((group) => group?.length).length
        expect(html.match(/<details class="card-math">/g) ?? []).toHaveLength(formulaGroups)
        expect(html).not.toContain('<details class="card-math" open')
        expect(html).not.toContain('原理还是约束？')
      })
    }
  }
})
