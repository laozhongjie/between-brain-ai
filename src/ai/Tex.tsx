import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useMemo } from 'react'

/** Render a TeX formula with KaTeX (display mode). */
export function Tex({ tex }: { tex: string }) {
  const html = useMemo(() => katex.renderToString(tex, { displayMode: true, throwOnError: false }), [tex])
  return <div className="tex" dangerouslySetInnerHTML={{ __html: html }} />
}

/** Split a formula into the parts it lists side by side: at a top-level comma followed by `\qquad` or `\quad` (the
 * comma stays with its part), and before a `\qquad\Longrightarrow\qquad`. A formula with one part comes back whole. */
export function splitTex(tex: string): string[] {
  const parts: string[] = []
  let depth = 0, start = 0, i = 0
  while (i < tex.length) {
    const rest = tex.slice(i)
    if (depth === 0) {
      const sep = /^,\s*\\q?quad(?![a-zA-Z])\s*/.exec(rest)
      const implies = /^\s*\\qquad\s*\\Longrightarrow\s*\\qquad\s*/.exec(rest)
      if (sep) { parts.push(tex.slice(start, i + 1).trim()); i += sep[0].length; start = i; continue }
      if (implies) { parts.push(tex.slice(start, i).trim()); i += implies[0].length; start = i; parts.push('\\Longrightarrow'); continue }
    }
    if (tex[i] === '\\') { i += 2; continue }
    if (tex[i] === '{') depth++
    else if (tex[i] === '}') depth--
    i++
  }
  parts.push(tex.slice(start).trim())
  // an implication arrow opens the part after it
  const out: string[] = []
  for (let k = 0; k < parts.length; k++) out.push(parts[k] === '\\Longrightarrow' ? '\\Longrightarrow\\; ' + parts[++k] : parts[k])
  return out.filter(Boolean)
}

/** Parts grouped into lines: parts on one line keep their wide spacing, lines are stacked and centered. */
export const linesTex = (lines: string[][]) =>
  lines.length < 2 ? lines.flat().join(' \\qquad ') : `\\begin{gathered}${lines.map((l) => l.join(' \\qquad ')).join(' \\\\[4pt] ')}\\end{gathered}`

/** Pack parts of the given widths greedily into as few lines as fit `max`, given the width of the gap between parts. */
export function packLines(widths: number[], gap: number, max: number): number[][] {
  const lines: number[][] = []
  let w = Infinity
  widths.forEach((pw, i) => {
    if (lines.length && w + gap + pw <= max) { lines[lines.length - 1].push(i); w += gap + pw }
    else { lines.push([i]); w = pw }
  })
  return lines
}

export { Rich } from '../rich'
