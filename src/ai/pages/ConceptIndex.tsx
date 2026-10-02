import { useState } from 'react'
import { UI, useT } from '../../i18n'
import { Rich, splitComparison } from '../../rich'
import { go } from '../../route'
import { Icon } from '../../ui/Icon'
import { CARD_BY_ID, CONCEPT_GROUPS, TOPIC_BY_ID, type AiConcept, type ConceptLink } from '../content'

/** Two names count as the same when they differ only in “&” versus “and” or in case. */
const same = (a: string, b: string) => a.replace(/&/g, 'and').toLowerCase() === b.replace(/&/g, 'and').toLowerCase()

/** One place a concept is compared: the brain side it meets, and the page it is on when that name differs. */
function ConceptTarget({ link }: { link: ConceptLink }) {
  const t = useT()
  const [kind, id] = link.to.split(':')
  const brain = t(link.brain)
  const page = kind === 'topic' ? t(TOPIC_BY_ID[id].name) : splitComparison(t(CARD_BY_ID[id].title))[0]
  return (
    <button className="chip concept-target" onClick={() => go(`/ai/${kind}/${id}`)}>
      <span className="concept-brain">{brain}</span>
      {/* a mechanism card often carries the same name as the brain side; say it once */}
      {same(page, brain) || <span className="concept-page"><Rich text={page} /></span>}
    </button>
  )
}

/** Entry into the atlas from AI vocabulary: each concept and the brain mechanisms it is compared with. */
export function ConceptIndex() {
  const t = useT()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  // Latin queries match from the start of a word, so “rag” finds RAG but not “storage”
  const word = new RegExp(`(^|[^a-z])${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i')
  const hit = (s: string) => (/[a-z]/.test(q) ? word.test(s) : s.toLowerCase().includes(q))
  const matches = (c: AiConcept) => !q || [c.term.zh, c.term.en, ...c.aka, ...c.links.flatMap((l) => [l.brain.zh, l.brain.en])].some(hit)
  const groups = CONCEPT_GROUPS.map((g) => ({ ...g, concepts: g.concepts.filter(matches) })).filter((g) => g.concepts.length)

  return (
    <article className="ai-page concept-index">
      <h1>{t(UI.conceptIndex)}</h1>
      <p className="lead">{t(UI.conceptIntro)}</p>
      <label className="concept-search">
        <Icon name="search" />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t(UI.conceptSearch)} aria-label={t(UI.conceptSearch)} />
      </label>
      {groups.length === 0 && <p className="section-note">{t(UI.conceptNone)}</p>}
      {groups.map((g) => (
        <section key={g.id} className="concept-group">
          <h3>{t(g.name)}</h3>
          {g.concepts.map((c) => (
            <div key={c.id} className="concept-row">
              <div className="concept-term">{t(c.term)}</div>
              <div className="rung-cards">{c.links.map((l) => <ConceptTarget key={l.to} link={l} />)}</div>
            </div>
          ))}
        </section>
      ))}
    </article>
  )
}
