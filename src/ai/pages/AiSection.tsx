import { Rich, splitComparison } from '../../rich'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARD_BY_ID, CROSS_TOPICS, DOMAINS, MECH_GROUPS, TOPIC_BY_ID, TOPIC_CONTENT, crossHref, topicHref, topicsOfDomain } from '../content'
import { LABS } from '../labs/registry'
import { ConceptIndex } from './ConceptIndex'
import { RefIndex } from './RefIndex'
import { Icon } from '../../ui/Icon'
import { CardPage } from './CardPage'
import { AiHome, sectionId } from './AiHome'
import { LabPage } from './LabPage'
import { TopicPage } from './TopicPage'

/** The Brain & AI section: a directory drawer at the left edge (opens on hover, or on tapping its tab) over the routed page. */
export function AiSection({ route }: { route: string[] }) {
  const t = useT()
  const main = useRef<HTMLDivElement>(null)
  const [page, id] = route
  const key = route.join('/')
  // opened by the tab (touch screens have no hover) for the current page only, so navigating closes it
  const [openAt, setOpenAt] = useState<string | null>(null)
  const navOpen = openAt === key

  // #/ai/at/<anchor> is the overview scrolled to one of its sections; any other page starts at the top
  const scrollToSection = (anchor: string) => {
    const box = main.current, el = document.getElementById(sectionId(anchor))
    if (box && el) box.scrollTo({ top: el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 12, behavior: 'smooth' })
  }
  useEffect(() => {
    if (page === 'at' && id) requestAnimationFrame(() => scrollToSection(id))
    else main.current?.scrollTo({ top: 0 })
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps
  /** A directory title: jumps to its section of the overview, or scrolls there again if already on it. */
  const goSection = (anchor: string) => (key === `at/${anchor}` ? scrollToSection(anchor) : go(`/ai/at/${anchor}`))

  let content
  if (page === 'topic' && id && TOPIC_CONTENT[id]) content = <TopicPage topic={TOPIC_BY_ID[id]} />
  else if (page === 'card' && id && CARD_BY_ID[id]) content = <CardPage card={CARD_BY_ID[id]} />
  // the old blueprint page is now the X03 topic page
  else if (page === 'blueprint') content = <TopicPage topic={TOPIC_BY_ID['agent-blueprint']} />
  else if (page === 'concepts') content = <ConceptIndex />
  else if (page === 'refs') content = <RefIndex />
  else if (page === 'lab' && id && LABS[id]) content = <LabPage id={id} />
  else content = <AiHome />

  const current = `/ai/${key}`
  // An old card can stand in for several topics: all of them light up
  const link = (href: string | null, label: ReactNode, k: string) => (
    <button key={k} className={href && (current === href || current.startsWith(`${href}/`)) ? 'on' : ''} disabled={!href} onClick={() => href && go(href)}>{label}</button>
  )

  return (
    <div className="ai-section">
      <aside className={`ai-drawer ${navOpen ? 'open' : ''}`} onMouseLeave={() => setOpenAt(null)}>
      <button className="ai-drawer-tab" aria-label={t(UI.directory)} aria-expanded={navOpen} onClick={() => setOpenAt(navOpen ? null : key)}><Icon name="chevron" size={14} /></button>
      <nav className="ai-nav" aria-label={t(UI.directory)}>
        <button className={`ai-nav-home ${key === '' || page === 'at' ? 'on' : ''}`} onClick={() => go('/ai')}>{t(UI.overview)}</button>
        <button className={`ai-nav-home ai-nav-concepts ${key === 'concepts' ? 'on' : ''}`} onClick={() => go('/ai/concepts')}><Icon name="search" size={13} />{t(UI.conceptIndex)}</button>
        <button className={`ai-nav-home ai-nav-concepts ${key === 'refs' ? 'on' : ''}`} onClick={() => go('/ai/refs')}><Icon name="library" size={13} />{t(UI.refIndex)}</button>
        <div className="ai-nav-layer ai-nav-domains">
          <button className="ai-nav-layer-title" onClick={() => goSection('domains')}>{t(UI.functionalDomains)}</button>
          {DOMAINS.map((domain) => (
            <div key={domain.id} className="ai-nav-domain">
              <button className="ai-nav-domain-title" onClick={() => goSection(domain.id)}>{domain.id.replace(/^D/, '')} · {t(domain.name)}</button>
              {topicsOfDomain(domain).map((topic) => link(topicHref(topic), t(topic.name), topic.id))}
            </div>
          ))}
        </div>
        <div className="ai-nav-layer ai-nav-domains">
          <button className="ai-nav-layer-title" onClick={() => goSection('mechanisms')}>{t(UI.scaleIndex)}</button>
          {MECH_GROUPS.map((g) => (
            <div key={g.id} className="ai-nav-domain">
              <button className="ai-nav-domain-title" onClick={() => goSection(g.id)}>{t(g.name)}</button>
              {g.cards.map((cid) =>
                link(`/ai/card/${cid}`, <Rich text={splitComparison(t(CARD_BY_ID[cid].title))[0]} />, cid))}
            </div>
          ))}
        </div>
        <div className="ai-nav-layer">
          <button className="ai-nav-layer-title" onClick={() => goSection('cross')}>{t(UI.crossCuttingTopics)}</button>
          {CROSS_TOPICS.map((x) => link(crossHref(x), t(x.name), x.id))}
        </div>
        <div className="ai-nav-layer">
          <button className="ai-nav-layer-title" onClick={() => goSection('labs')}>{t(UI.labs)}</button>
          {Object.entries(LABS).map(([lid, lab]) => link(`/ai/lab/${lid}`, <Rich text={t(lab.title).replace(/^(实验：|Lab: )/, '')} />, lid))}
        </div>
      </nav>
      </aside>
      <div className="ai-main" ref={main}>
        {/* keyed so the entrance animation replays on every navigation */}
        <div key={key} className="ai-enter">{content}</div>
      </div>
    </div>
  )
}
