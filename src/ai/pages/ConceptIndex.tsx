import { useState } from 'react'
import { UI, useT } from '../../i18n'
import { Rich, splitComparison } from '../../rich'
import { go } from '../../route'
import { useStore } from '../../store'
import { Icon } from '../../ui/Icon'
import { CARD_BY_ID, CONCEPT_GROUPS, CONCEPTS, TOPIC_BY_ID, type AiConcept, type ConceptLink } from '../content'

/** Two names count as the same when they differ only in “&” versus “and” or in case. */
const same = (a: string, b: string) => a.replace(/&/g, 'and').toLowerCase() === b.replace(/&/g, 'and').toLowerCase()

/** Dictionary order: by initial letter (Chinese by the pinyin of its first character, so 对比学习 and Dropout both file
 * under D), then within a letter by pinyin or alphabet. The marks are the first character of each pinyin initial in
 * the pinyin collation; 长 (cháng in 长上下文) is filed by hand, since the collation reads it zhǎng. */
const zhCollator = new Intl.Collator('zh-Hans-u-co-pinyin')
const enCollator = new Intl.Collator('en', { sensitivity: 'base' })
const MARKS = [...'阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥仨他穵夕丫帀'], LETTERS = 'ABCDEFGHJKLMNOPQRSTWXYZ'
const HAND: Record<string, string> = { 长: 'C' }
function initial(s: string) {
  const c = s[0]
  if (/[a-z]/i.test(c)) return c.toUpperCase()
  if (HAND[c]) return HAND[c]
  let k = -1
  MARKS.forEach((m, i) => { if (zhCollator.compare(c, m) >= 0) k = i })
  return LETTERS[k] ?? '#'
}

/** Text with every occurrence of the query marked. */
function Hl({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return <>{parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p))}</>
}

/** One place a concept is compared: the brain side it meets, and the page it is on when that name differs. */
function ConceptTarget({ link, q }: { link: ConceptLink; q: string }) {
  const t = useT()
  const [kind, id] = link.to.split(':')
  const brain = t(link.brain)
  const page = kind === 'topic' ? t(TOPIC_BY_ID[id].name) : splitComparison(t(CARD_BY_ID[id].title))[0]
  return (
    <li>
      <button className="ci-link" onClick={() => go(`/ai/${kind}/${id}`)}>
        <span className="ci-brain"><Hl text={brain} q={q} /></span>
        {/* a mechanism card often carries the same name as the brain side; say it once */}
        {same(page, brain) || <span className="ci-page"><Rich text={page} /></span>}
        <Icon name="chevron" size={14} className="ci-go" />
      </button>
    </li>
  )
}

/** Entry into the atlas from AI vocabulary: search, a directory of areas, and each concept with the brain mechanisms it
 * is compared with. */
export function ConceptIndex() {
  const t = useT()
  const lang = useStore((s) => s.lang)
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  // Latin queries match from the start of a word, so “rag” finds RAG but not “storage”
  const word = new RegExp(`(^|[^a-z])${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i')
  const hit = (s: string) => (/[a-z]/.test(q) ? word.test(s) : s.toLowerCase().includes(q))
  const matches = (c: AiConcept) => !q || [c.term.zh, c.term.en, ...c.aka, ...c.links.flatMap((l) => [l.brain.zh, l.brain.en])].some(hit)

  const collator = lang === 'zh' ? zhCollator : enCollator
  const groups = CONCEPT_GROUPS.map((g) => ({
    ...g,
    concepts: g.concepts.filter(matches).map((c) => ({ c, letter: initial(t(c.term)) }))
      .sort((a, b) => a.letter.localeCompare(b.letter) || collator.compare(t(a.c.term), t(b.c.term))),
  }))
  const found = groups.reduce((n, g) => n + g.concepts.length, 0)
  const jump = (id: string) => document.getElementById(`ci-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <article className="ai-page concept-index">
      <div className="crumbs">
        <button className="btn-sm crumb-back" onClick={() => go('/ai')}><Icon name="arrow-left" />{t(UI.backToLadder)}</button>
      </div>
      <h1>{t(UI.conceptIndex)}</h1>
      <p className="lead">{t(UI.conceptIntro)}</p>
      <label className="ci-search">
        <Icon name="search" size={18} />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t(UI.conceptSearch)} aria-label={t(UI.conceptSearch)} />
        {query && <button className="ci-clear" onClick={() => setQuery('')} aria-label={t({ zh: '清除', en: 'Clear' })}><Icon name="x" size={15} /></button>}
        <span className="ci-count">
          {q ? <><b>{found}</b> / {CONCEPTS.length}</> : <><b>{CONCEPTS.length}</b> {t({ zh: '个概念', en: 'concepts' })}</>}
        </span>
      </label>

      <div className="ci-layout">
        <nav className="ci-nav" aria-label={t({ zh: '概念分组', en: 'Concept areas' })}>
          <p className="ci-nav-note">{t({ zh: '按构建与评估的顺序分组，组内按字母与拼音排序', en: 'Areas in the order a system is built and judged; terms alphabetical within each' })}</p>
          {groups.map((g, i) => (
            <button key={g.id} className="ci-nav-item" disabled={!g.concepts.length} onClick={() => jump(g.id)}>
              <span className="ci-nav-no">{String(i + 1).padStart(2, '0')}</span>
              <span className="ci-nav-name">{t(g.name)}</span>
              <span className="ci-nav-n">{g.concepts.length}</span>
            </button>
          ))}
        </nav>

        <div className="ci-results">
          {found === 0 && <p className="ci-none">{t(UI.conceptNone)}</p>}
          {groups.map((g, i) => g.concepts.length > 0 && (
            <section key={g.id} id={`ci-${g.id}`} className="ci-group">
              <header className="ci-group-head">
                <span className="dir-no">{String(i + 1).padStart(2, '0')}</span>
                <h2>{t(g.name)}</h2>
              </header>
              <div className="ci-grid">
                {g.concepts.map(({ c, letter }) => (
                  <div key={c.id} className="ci-card">
                    <div className="ci-card-head">
                      <span className="ci-letter">{letter}</span>
                      <span className="ci-term"><Hl text={t(c.term)} q={q} /></span>
                    </div>
                    <ul className="ci-links">{c.links.map((l) => <ConceptTarget key={l.to} link={l} q={q} />)}</ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
