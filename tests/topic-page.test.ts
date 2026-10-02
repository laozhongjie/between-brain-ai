import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { Bi } from '../src/data/types'
import { TOPIC_BY_ID, TOPIC_CONTENT } from '../src/ai/content'
import { TopicPage } from '../src/ai/pages/TopicPage'

const language = vi.hoisted(() => ({ current: 'zh' as 'zh' | 'en' }))

vi.mock('../src/i18n', async (importOriginal) => ({
  ...await importOriginal<typeof import('../src/i18n')>(),
  useT: () => (text: Bi) => text[language.current],
}))

const escaped = (text: string) => renderToStaticMarkup(createElement('span', null, text)).slice(6, -7)
/** Rich text turns $…$ into KaTeX, so only check the plain parts of a string. */
const plain = (text: string) => text.replace(/\[([^\]]+)\]\((?:card|topic):[a-z0-9-]+\)/g, '\n').split(/\$[^$]+\$|\n/).map((s) => s.trim()).filter((s) => s.length > 3)

describe('topic pages', () => {
  for (const lang of ['zh', 'en'] as const) {
    for (const [id, page] of Object.entries(TOPIC_CONTENT)) {
      it(`renders every part of the template: ${id} / ${lang}`, () => {
        language.current = lang
        const topic = TOPIC_BY_ID[id]
        const html = renderToStaticMarkup(createElement(TopicPage, { topic }))
        const texts: Bi[] = [topic.name, topic.systems.biological, topic.systems.computational,
          page.thesis.biological, page.thesis.computational, page.thesis.gap, page.asOf,
          ...[...page.limits.biological, ...page.limits.computational].flatMap((l) => [l.title, l.text]), ...page.limits.misreadings.flatMap((m) => [m.claim, m.fact]),
          ...page.capabilities.flatMap((r) => [r.dimension, r.brain, r.ai, r.gap]),
          ...[...page.archSteps.biological, ...page.archSteps.computational].flatMap((s) => [s.title, ...s.points]),
        ...page.archNotes.biological, ...page.archNotes.computational,
        ...[...page.dynamicsSteps.biological, ...page.dynamicsSteps.computational].flatMap((s) => [s.title, ...s.points]),
          ...[...page.bioMath, ...page.compMath].flatMap((f) => [f.title, ...f.symbols.map((x) => x.meaning), ...f.steps, ...(f.example ? [f.example] : []), ...f.consequences, ...f.limitations])]
        for (const text of texts) for (const part of plain(text[lang])) expect(html, part).toContain(escaped(part))
        // the three figures render as SVG, each followed by its numbered explanation
        expect(html.match(/<svg[^>]*class="fig-svg"/g) ?? []).toHaveLength(3)
        expect(html.match(/<ol class="fig-steps/g) ?? []).toHaveLength(4)
        // every capability row gets a verdict pointer
        expect(html.match(/class="duel-row lead-/g) ?? []).toHaveLength(page.capabilities.length)
        // cross-references render as links
        for (const m of JSON.stringify(page).matchAll(/\]\((card|topic):([a-z0-9-]+)\)/g)) expect(html).toContain(`href="#/ai/${m[1]}/${m[2]}"`)
        // equations are always shown, never folded
        expect(html).not.toContain('<details')
      })
    }
  }
})
