import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { MODULES, DIFFERENCES } from '../src/ai/content/blueprint'
import { CARDS, LAYERS } from '../src/ai/content/index'
import { REGIONS } from '../src/data/regions'
import { DAY } from '../src/data/scenario'
import { TOURS } from '../src/data/tours'
import { UI } from '../src/i18n'
import { CHAPTERS } from '../src/home/chapters'
import { tokenToTex, toSegments } from '../src/rich'

/** Collect every string reachable from an object (bilingual texts, captions, …). */
function strings(x: unknown, out: string[] = []): string[] {
  if (typeof x === 'string') out.push(x)
  else if (Array.isArray(x)) x.forEach((v) => strings(v, out))
  else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => k !== 'tex' && strings(v, out))
  return out
}

const ALL = strings([CARDS, LAYERS, MODULES, DIFFERENCES, REGIONS, DAY, TOURS, UI, CHAPTERS])

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

  it('stray symbols are converted to TeX', () => {
    const cases: [string, string][] = [
      ['x₁', 'x_{1}'], ['hₜ₋₁', 'h_{t-1}'], ['Wᵀ', 'W^{\\top}'], ['10¹⁴', '10^{14}'], ['Ca²⁺', '\\mathrm{Ca}^{2+}'],
      ['Δt', '\\Delta t'], ['→', '\\rightarrow'], ['↔', '\\leftrightarrow'], ['θ', '\\theta'],
    ]
    for (const [a, b] of cases) expect(tokenToTex(a)).toBe(b)
    expect(toSegments('视网膜 → LGN').map((x) => x.tex)).toEqual([false, true, false])
    expect(toSegments('V1 和 M1 不变').every((x) => !x.tex)).toBe(true)
  })

  it('every piece of site text renders through the auto-TeX converter', () => {
    for (const s of ALL)
      for (const seg of toSegments(s))
        if (seg.tex) expect(() => katex.renderToString(seg.s, { throwOnError: true }), `${seg.s} in ${s.slice(0, 40)}`).not.toThrow()
  })
})
