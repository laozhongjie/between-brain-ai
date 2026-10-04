import type { CSSProperties, ReactNode } from 'react'
import { Rich, splitComparison } from '../../rich'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARD_BY_ID, CROSS_TOPICS, DOMAINS, INTRO_REFS, MECH_GROUPS, MECH_ORDER, TOPIC_CONTENT, mechCode, WRITTEN_TOPICS, crossHref, topicHref, topicsOfDomain } from '../content'
import { REFS } from '../content/refs'
import { LABS } from '../labs/registry'
import { Legend, RefList } from './common'
import { Icon } from '../../ui/Icon'

const pad = (n: number) => String(n).padStart(2, '0')
/** The element id of an overview section, the target of a directory title (see AiSection). */
export const sectionId = (anchor: string) => `ai-sec-${anchor}`

/** A directory card: a title, then the brain and / or AI system it pairs (a coloured dot each) or a line of
 * description. Opens its page, or shows that it is still being written. */
function DirCard({ title, kicker, brain, ai, desc, status, href }: {
  title: ReactNode; kicker?: ReactNode; brain?: string; ai?: string; desc?: string; status?: string; href: string | null
}) {
  return (
    <button className={`dir-card ${href ? '' : 'pending'}`} disabled={!href} onClick={() => href && go(href)}>
      {kicker && <span className="dir-card-kicker">{kicker}</span>}
      <span className="dir-card-title">{title}</span>
      {(brain || ai) && (
        <span className="dir-card-pair">
          {brain && <span className="bio"><Rich text={brain} /></span>}
          {ai && <span className="comp"><Rich text={ai} /></span>}
        </span>
      )}
      {desc && <span className="dir-card-desc"><Rich text={desc} /></span>}
      {status && <span className="dir-card-status">{status}</span>}
      <Icon name="chevron" size={15} className="dir-card-go" />
    </button>
  )
}

/** One row of a directory: its name on the left, its cards filling the rest of the width (or `cols` equal columns). */
function DirRow({ id, no, kicker, name, desc, cols, children }: { id?: string; no?: string; kicker?: string; name: string; desc?: string; cols?: number; children: ReactNode }) {
  return (
    <section className="dir-row" id={id && sectionId(id)}>
      <header className="dir-head">
        {(no || kicker) && <span className="dir-no">{no ?? kicker}</span>}
        <h2>{name}</h2>
        {desc && <p><Rich text={desc} /></p>}
      </header>
      <div className={`dir-cards ${cols ? `cols-${cols}` : ''}`} style={cols ? ({ '--cols': cols } as CSSProperties) : undefined}>{children}</div>
    </section>
  )
}

export function AiHome() {
  const t = useT()
  // each figure opens what it counts: a section of this page, or the reference list
  const stats: [number, string, string][] = [
    [DOMAINS.length, t(UI.statDomains), '/ai/at/domains'], [WRITTEN_TOPICS().length, t(UI.statTopics), '/ai/at/domains'],
    [MECH_ORDER.length, t(UI.statMechanisms), '/ai/at/mechanisms'], [Object.keys(LABS).length, t(UI.statLabs), '/ai/at/labs'], [REFS.length, t(UI.statRefs), '/ai/refs'],
  ]
  const open = (href: string) => {
    const anchor = href.match(/^\/ai\/at\/(.+)$/)?.[1]
    // already there: the hash would not change, so scroll directly
    if (anchor && window.location.hash === `#${href}`) document.getElementById(sectionId(anchor))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else go(href)
  }
  return (
    <article className="ai-page ai-home">
      <header className="ai-hero">
        <div>
          <h1>{t(UI.aiTitle)}</h1>
          <p className="lead">{t(UI.aiIntro)}</p>
          <button className="btn-sm concept-entry" onClick={() => go('/ai/concepts')}><Icon name="search" size={14} />{t(UI.conceptIndex)}</button>
        </div>
        <nav className="ai-stats">
          {stats.map(([n, label, href]) => (
            <button key={label} onClick={() => open(href)}><span className="ai-stat-n">{pad(n)}</span><span className="ai-stat-label">{label}</span></button>
          ))}
        </nav>
      </header>

      <h3>{t(UI.howToRead)}</h3>
      <Legend />

      <h3 className="dir-title" id={sectionId('domains')}>{t(UI.functionalDomains)}</h3>
      <div className="dir">
        {DOMAINS.map((domain, i) => (
          <DirRow key={domain.id} id={domain.id} no={pad(i + 1)} name={t(domain.name)} desc={t(domain.desc)}>
            {topicsOfDomain(domain).map((topic) => {
              const href = topicHref(topic)
              return (
                <DirCard key={topic.id} href={href} title={t(topic.name)} brain={t(topic.systems.biological)} ai={t(topic.systems.computational)}
                  status={TOPIC_CONTENT[topic.id] ? undefined : t(href ? UI.statusLegacy : UI.statusDrafting)} />
              )
            })}
          </DirRow>
        ))}
      </div>

      <h3 className="dir-title" id={sectionId('mechanisms')}>{t(UI.scaleIndex)}</h3>
      <p className="section-note">{t(UI.scaleIndexIntro)}</p>
      <div className="dir">
        {MECH_GROUPS.map((g) => (
          // one row per group, one column per entry, so every row is filled
          <DirRow key={g.id} id={g.id} name={t(g.name)} desc={t(g.desc)} cols={g.cards.length}>
            {g.cards.map((id) => {
              const [brain, ai] = splitComparison(t(CARD_BY_ID[id].title))
              return <DirCard key={id} href={`/ai/card/${id}`} kicker={mechCode(id)} title={<Rich text={brain} />} ai={ai} />
            })}
          </DirRow>
        ))}
      </div>

      <h3 className="dir-title" id={sectionId('cross')}>{t(UI.crossCuttingTopics)}</h3>
      <div className="dir-cards wide">
        {CROSS_TOPICS.map((x) => {
          const href = crossHref(x)
          return <DirCard key={x.id} href={href} title={t(x.name)} desc={t(x.desc)} status={TOPIC_CONTENT[x.id] ? undefined : t(href ? UI.statusLegacy : UI.statusDrafting)} />
        })}
      </div>

      <h3 className="dir-title" id={sectionId('labs')}>{t(UI.labs)}</h3>
      <div className="dir-cards wide">
        {Object.entries(LABS).map(([id, lab]) => (
          <DirCard key={id} href={`/ai/lab/${id}`} kicker={<Icon name="flask" size={14} />} title={<Rich text={t(lab.title).replace(/^(实验：|Lab: )/, '')} />} />
        ))}
      </div>

      <h3 className="dir-title">{t(UI.furtherReading)}</h3>
      <RefList ids={INTRO_REFS} />
    </article>
  )
}
