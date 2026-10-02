import { Rich, splitComparison } from '../../rich'
import { useEffect, useRef, type ReactNode } from 'react'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARD_BY_ID, CROSS_TOPICS, DOMAINS, MECH_GROUPS, SCALES, crossHref, topicHref, topicsOfDomain } from '../content'
import { LABS } from '../labs/registry'
import { Blueprint } from './Blueprint'
import { CardPage } from './CardPage'
import { AiHome } from './AiHome'
import { LabPage } from './LabPage'

/** The Brain & AI section: sidebar directory + routed page. */
export function AiSection({ route }: { route: string[] }) {
  const t = useT()
  const main = useRef<HTMLDivElement>(null)
  const [page, id] = route
  const key = route.join('/')

  useEffect(() => {
    main.current?.scrollTo({ top: 0 })
  }, [key])

  let content
  if (page === 'card' && id && CARD_BY_ID[id]) content = <CardPage card={CARD_BY_ID[id]} />
  else if (page === 'blueprint') content = <Blueprint moduleId={id} />
  else if (page === 'lab' && id && LABS[id]) content = <LabPage id={id} />
  else content = <AiHome />

  const current = `/ai/${key}`
  // An old card can stand in for several topics: all of them light up
  const link = (href: string | null, label: ReactNode, k: string) => (
    <button key={k} className={href && (current === href || current.startsWith(`${href}/`)) ? 'on' : ''} disabled={!href} onClick={() => href && go(href)}>{label}</button>
  )

  return (
    <div className="ai-section">
      <nav className="ai-nav">
        <button className={`ai-nav-home ${key === '' ? 'on' : ''}`} onClick={() => go('/ai')}>{t(UI.overview)}</button>
        <div className="ai-nav-layer ai-nav-domains">
          <div className="ai-nav-layer-title">{t(UI.functionalDomains)}</div>
          {DOMAINS.map((domain) => (
            <div key={domain.id} className="ai-nav-domain">
              <div className="ai-nav-domain-title">{domain.id} · {t(domain.name)}</div>
              {topicsOfDomain(domain).map((topic) => link(topicHref(topic), t(topic.name), topic.id))}
            </div>
          ))}
        </div>
        <div className="ai-nav-layer ai-nav-domains">
          <div className="ai-nav-layer-title">{t(UI.scaleIndex)}</div>
          {SCALES.map((scale) => (
            <div key={scale.id} className="ai-nav-domain">
              <div className="ai-nav-domain-title">{t(scale.name)}</div>
              {MECH_GROUPS.filter((g) => g.scale === scale.id).flatMap((g) => g.cards).map((cid) =>
                link(`/ai/card/${cid}`, <Rich text={splitComparison(t(CARD_BY_ID[cid].title))[0]} />, cid))}
            </div>
          ))}
        </div>
        <div className="ai-nav-layer">
          <div className="ai-nav-layer-title">{t(UI.crossCuttingTopics)}</div>
          {CROSS_TOPICS.map((x) => link(crossHref(x), t(x.name), x.id))}
        </div>
        <div className="ai-nav-layer">
          <div className="ai-nav-layer-title">{t(UI.labs)}</div>
          {Object.entries(LABS).map(([lid, lab]) => link(`/ai/lab/${lid}`, <Rich text={t(lab.title).replace(/^(实验：|Lab: )/, '')} />, lid))}
        </div>
      </nav>
      <div className="ai-main" ref={main}>
        {/* keyed so the entrance animation replays on every navigation */}
        <div key={key} className="ai-enter">{content}</div>
      </div>
    </div>
  )
}
