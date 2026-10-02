import katex from 'katex'
import 'katex/dist/katex.min.css'
import { Fragment, useMemo } from 'react'

const GREEK: Record<string, string> = {
  α: '\\alpha', β: '\\beta', γ: '\\gamma', δ: '\\delta', ε: '\\varepsilon', η: '\\eta', θ: '\\theta', κ: '\\kappa',
  λ: '\\lambda', μ: '\\mu', π: '\\pi', ρ: '\\rho', σ: '\\sigma', τ: '\\tau', φ: '\\varphi', ω: '\\omega',
  Δ: '\\Delta', Σ: '\\Sigma', Θ: '\\Theta', Φ: '\\Phi',
}
/** Stand-alone symbols rendered as TeX. */
const OPS: Record<string, string> = {
  '↔': '\\leftrightarrow', '→': '\\rightarrow', '←': '\\leftarrow', '⇒': '\\Rightarrow', '≈': '\\approx', '≠': '\\neq',
  '≤': '\\le', '≥': '\\ge', '×': '\\times', '∝': '\\propto', '⊙': '\\odot', '⊣': '\\dashv', '÷': '\\div', '±': '\\pm', '∞': '\\infty',
}

export const splitComparison = (text: string) => text.split(/\s*↔\s*/)
const SUB: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '-',
  'ₐ': 'a', 'ₑ': 'e', 'ₒ': 'o', 'ₓ': 'x', 'ₕ': 'h', 'ₖ': 'k', 'ₗ': 'l', 'ₘ': 'm', 'ₙ': 'n', 'ₚ': 'p', 'ₛ': 's', 'ₜ': 't', 'ᵢ': 'i', 'ⱼ': 'j', 'ᵧ': 'y',
}
const SUP: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-', 'ᵀ': '\\top', 'ᴬ': 'A',
}
const SPECIAL = new Set([...Object.keys(GREEK), ...Object.keys(SUB), ...Object.keys(SUP), '√', '′'])
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const TOKEN = new RegExp(`[A-Za-z0-9${esc([...SPECIAL].join(''))}]+|[${esc(Object.keys(OPS).join(''))}]`, 'gu')

/** Convert one token (a word containing Greek / sub- / superscripts, or an operator) to TeX. */
export function tokenToTex(tok: string): string {
  if (OPS[tok]) return OPS[tok]
  const chars = [...tok]
  let out = ''
  let i = 0
  while (i < chars.length) {
    const c = chars[i]
    if (/[A-Za-z]/.test(c)) {
      let j = i
      while (j < chars.length && /[A-Za-z]/.test(chars[j])) j++
      const run = chars.slice(i, j).join('')
      out += run.length > 1 ? `\\mathrm{${run}}` : run
      i = j
    } else if (/[0-9]/.test(c)) {
      out += c
      i++
    } else if (GREEK[c]) {
      out += `${GREEK[c]} `
      i++
    } else if (SUB[c] !== undefined || SUP[c] !== undefined) {
      const map = SUB[c] !== undefined ? SUB : SUP
      let j = i
      let body = ''
      while (j < chars.length && map[chars[j]] !== undefined) body += map[chars[j++]]
      out += `${map === SUB ? '_' : '^'}{${body}}`
      i = j
    } else if (c === '√') {
      let j = i + 1
      let body = ''
      while (j < chars.length && /[A-Za-z0-9]/.test(chars[j])) body += chars[j++]
      out += `\\sqrt{${body || '\\,'}}`
      i = j
    } else if (c === '′') {
      out += "'"
      i++
    } else {
      out += c
      i++
    }
  }
  return out.trim()
}

/** Split plain text into text and TeX segments: explicit $…$ plus auto-detected symbols. */
export function toSegments(text: string): { tex: boolean; s: string }[] {
  const out: { tex: boolean; s: string }[] = []
  text.split(/\$([^$]+)\$/g).forEach((part, k) => {
    if (k % 2) return out.push({ tex: true, s: part })
    let last = 0
    for (const m of part.matchAll(TOKEN)) {
      const tok = m[0]
      if (!OPS[tok] && ![...tok].some((ch) => SPECIAL.has(ch))) continue // ordinary word
      if (m.index! > last) out.push({ tex: false, s: part.slice(last, m.index) })
      out.push({ tex: true, s: tokenToTex(tok) })
      last = m.index! + tok.length
    }
    if (last < part.length) out.push({ tex: false, s: part.slice(last) })
  })
  return out
}

/** In-site cross-reference: `[label](card:id)` or `[label](topic:id)` links to a card or topic page. */
export const XREF = /\[([^\]]+)\]\((card|topic):([a-z0-9-]+)\)/g

function Segments({ text }: { text: string }) {
  const segs = useMemo(() => toSegments(text), [text])
  return (
    <>
      {segs.map((p, i) =>
        p.tex ? (
          <span key={i} className="tex-inline" dangerouslySetInnerHTML={{ __html: katex.renderToString(p.s, { throwOnError: false }) }} />
        ) : (
          <Fragment key={i}>{p.s}</Fragment>
        ),
      )}
    </>
  )
}

/** Text with math: $…$ segments and stray symbols (→, α, x₁, Wᵀ, …) are rendered by KaTeX; cross-references become links. */
export function Rich({ text }: { text: string }) {
  if (!text.includes('](')) return <Segments text={text} />
  const out = []
  let last = 0
  for (const m of text.matchAll(XREF)) {
    if (m.index! > last) out.push(<Segments key={`t${last}`} text={text.slice(last, m.index)} />)
    out.push(<a key={`a${m.index}`} className="xref" href={`#/ai/${m[2]}/${m[3]}`}><Segments text={m[1]} /></a>)
    last = m.index! + m[0].length
  }
  if (last < text.length) out.push(<Segments key={`t${last}`} text={text.slice(last)} />)
  return <>{out}</>
}
