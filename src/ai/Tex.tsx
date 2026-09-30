import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useMemo } from 'react'

/** Render a TeX formula with KaTeX (display mode). */
export function Tex({ tex }: { tex: string }) {
  const html = useMemo(() => katex.renderToString(tex, { displayMode: true, throwOnError: false }), [tex])
  return <div className="tex" dangerouslySetInnerHTML={{ __html: html }} />
}
