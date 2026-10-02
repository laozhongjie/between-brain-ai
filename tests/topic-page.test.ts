import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { Bi } from '../src/data/types'
import { TOPIC_BY_ID, TOPIC_CONTENT } from '../src/ai/content'
import { TOPIC_FIGS } from '../src/ai/figs'
import { TopicPage } from '../src/ai/pages/TopicPage'

const language = vi.hoisted(() => ({ current: 'zh' as 'zh' | 'en' }))

vi.mock('../src/i18n', async (importOriginal) => ({
  ...await importOriginal<typeof import('../src/i18n')>(),
  useT: () => (text: Bi) => text[language.current],
}))

const escaped = (text: string) => renderToStaticMarkup(createElement('span', null, text)).slice(6, -7)
/** Rich text turns $…$ into KaTeX, so only check the plain parts of a string. */
const plain = (text: string) => text.split(/\$[^$]+\$/).map((s) => s.trim()).filter((s) => s.length > 3)

describe('topic pages', () => {
  for (const lang of ['zh', 'en'] as const) {
    for (const [id, page] of Object.entries(TOPIC_CONTENT)) {
      it(`renders every part of the template: ${id} / ${lang}`, () => {
        language.current = lang
        const topic = TOPIC_BY_ID[id]
        const html = renderToStaticMarkup(createElement(TopicPage, { topic }))
        const figs = TOPIC_FIGS[id]
        const texts: Bi[] = [topic.name, topic.systems.biological, topic.systems.computational, page.thesis, page.asOf,
          page.limits.biological, page.limits.computational, page.limits.unsupported,
          ...page.capabilities.flatMap((r) => [r.dimension, r.brain, r.ai, r.gap]),
          ...[...page.bioMath, ...page.compMath].flatMap((f) => [f.caption, f.maps, f.explains, f.limits])]
        for (const text of texts) for (const part of plain(text[lang])) expect(html, part).toContain(escaped(part))
        // the three figures render as SVG with their captions
        expect(html.match(/<svg[^>]*class="fig-svg"/g) ?? []).toHaveLength(3)
        for (const cap of [figs.arch.brainCap, figs.arch.aiCap, figs.dynamics.cap]) for (const part of plain(cap[lang])) expect(html).toContain(escaped(part))
        // equations are always shown, never folded
        expect(html).not.toContain('<details')
      })
    }
  }
})
