import katex from 'katex'
import 'katex/dist/katex.min.css'
import { Fragment, useMemo } from 'react'

/** Render a TeX formula with KaTeX (display mode). */
export function Tex({ tex }: { tex: string }) {
  const html = useMemo(() => katex.renderToString(tex, { displayMode: true, throwOnError: false }), [tex])
  return <div className="tex" dangerouslySetInnerHTML={{ __html: html }} />
}

/** Text with inline math: segments wrapped in $…$ are rendered by KaTeX, the rest stays plain text. */
export function Rich({ text }: { text: string }) {
  const parts = useMemo(() => text.split(/\$([^$]+)\$/g), [text])
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <span key={i} className="tex-inline" dangerouslySetInnerHTML={{ __html: katex.renderToString(p, { throwOnError: false }) }} />
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}
