import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { MODULES, DIFFERENCES } from '../src/ai/content/blueprint'
import { CARDS, LAYERS } from '../src/ai/content/index'
import { REGIONS } from '../src/data/regions'
import { DAY } from '../src/data/scenario'
import { TOURS } from '../src/data/tours'
import { UI } from '../src/i18n'

/** Collect every string reachable from an object (bilingual texts, captions, …). */
function strings(x: unknown, out: string[] = []): string[] {
  if (typeof x === 'string') out.push(x)
  else if (Array.isArray(x)) x.forEach((v) => strings(v, out))
  else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => k !== 'tex' && strings(v, out))
  return out
}

const ALL = strings([CARDS, LAYERS, MODULES, DIFFERENCES, REGIONS, DAY, TOURS, UI])

describe('site text', () => {
  it('uses no dashes (破折号 / em dash)', () => {
    const bad = ALL.filter((s) => /——|—/.test(s))
    expect(bad).toEqual([])
  })

  it('every inline $…$ formula renders and has no swallowed escapes', () => {
    for (const s of ALL) {
      for (const [, tex] of s.matchAll(/\$([^$]+)\$/g)) {
        expect(/[\t\n\r\f\b\v]/.test(tex), `control char in ${JSON.stringify(tex)}`).toBe(false)
        expect(() => katex.renderToString(tex, { throwOnError: true }), tex).not.toThrow()
      }
    }
  })

  it('no plain-text subscripts that should be math', () => {
    const bad = ALL.filter((s) => /(^|[^$\\{\w])[A-Za-zτθ]_[A-Za-z]/.test(s.replace(/\$[^$]+\$/g, '')))
    expect(bad).toEqual([])
  })
})
