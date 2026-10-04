import { useState } from 'react'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { Icon } from '../../ui/Icon'
import { CITATIONS } from '../content'
import { REFS } from '../content/refs'
import type { Ref } from '../types'

const collator = new Intl.Collator('en', { sensitivity: 'base' })
/** The filing letter of a reference: the first Latin letter of its authors (so del Castillo files under D). */
const letterOf = (r: Ref) => (r.authors.match(/[A-Za-z]/)?.[0] ?? '#').toUpperCase()
const SORTED = [...REFS].sort((a, b) => collator.compare(a.authors, b.authors) || a.year - b.year)
const LETTERS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

/** Every reference on the site, filed by the first author’s initial, each with the pages that cite it. */
export function RefIndex() {
  const t = useT()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const shown = q ? SORTED.filter((r) => `${r.authors} ${r.year} ${r.title} ${r.venue}`.toLowerCase().includes(q)) : SORTED
  const byLetter = LETTERS.map((l) => ({ l, refs: shown.filter((r) => letterOf(r) === l) }))
  const jump = (l: string) => document.getElementById(`ri-${l}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <article className="ai-page ref-index">
      <div className="crumbs">
        <button className="btn-sm crumb-back" onClick={() => go('/ai')}><Icon name="arrow-left" />{t(UI.backToLadder)}</button>
      </div>
      <h1>{t(UI.refIndex)}</h1>
      <p className="lead">{t(UI.refIntro)}</p>
      <label className="ci-search">
        <Icon name="search" size={18} />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t(UI.refSearch)} aria-label={t(UI.refSearch)} />
        {query && <button className="ci-clear" onClick={() => setQuery('')} aria-label={t({ zh: '清除', en: 'Clear' })}><Icon name="x" size={15} /></button>}
        <span className="ci-count">
          {q ? <><b>{shown.length}</b> / {REFS.length}</> : <><b>{REFS.length}</b> {t({ zh: '篇', en: 'references' })}</>}
        </span>
      </label>
      <nav className="ri-letters" aria-label={t({ zh: '首字母', en: 'Initials' })}>
        {byLetter.map(({ l, refs }) => <button key={l} disabled={!refs.length} onClick={() => jump(l)}>{l}</button>)}
      </nav>

      {shown.length === 0 && <p className="ci-none">{t(UI.refNone)}</p>}
      {byLetter.map(({ l, refs }) => refs.length > 0 && (
        <section key={l} id={`ri-${l}`} className="ri-group">
          <h2 className="ri-letter">{l}</h2>
          <ol className="ri-list">
            {refs.map((r) => (
              <li key={r.id}>
                <p className="ri-ref">
                  {r.authors} ({r.year}). <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>. <em>{r.venue}</em>.
                </p>
                <div className="ri-cited">
                  <span>{t(UI.refCitedIn)}</span>
                  {(CITATIONS[r.id] ?? []).map((c) => <button key={c.href} className="chip" onClick={() => go(c.href)}>{t(c.name)}</button>)}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </article>
  )
}
