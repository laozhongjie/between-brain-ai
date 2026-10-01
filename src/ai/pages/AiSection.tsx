import { Rich, splitComparison } from '../../rich'
import { useEffect, useRef } from 'react'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARD_BY_ID, CROSS_CUTTING, DOMAINS, cardsOfDomain } from '../content'
import { LABS } from '../labs/registry'
import { Blueprint } from './Blueprint'
import { CardPage } from './CardPage'
import { AiHome } from './AiHome'
import { LabPage } from './LabPage'

/** The Brain ↔ AI section: sidebar ladder navigation + routed page. */
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

  const active = (p: string) => (key === p ? 'on' : '')

  return (
    <div className="ai-section">
      <nav className="ai-nav">
        <button className={`ai-nav-home ${active('')}`} onClick={() => go('/ai')}>{t(UI.overview)}</button>
        <div className="ai-nav-layer ai-nav-domains">
          <div className="ai-nav-layer-title">{t(UI.functionalDomains)}</div>
          {DOMAINS.map((domain) => (
            <div key={domain.id} className="ai-nav-domain">
              <div className="ai-nav-domain-title">{domain.id} · {t(domain.name)}</div>
              {cardsOfDomain(domain).map((c) => (
                <button key={c.id} className={active(`card/${c.id}`)} onClick={() => go(`/ai/card/${c.id}`)}><Rich text={splitComparison(t(c.title))[0]} /></button>
              ))}
            </div>
          ))}
        </div>
        <div className="ai-nav-layer">
          <div className="ai-nav-layer-title">{t(UI.crossCuttingTopics)}</div>
          {CROSS_CUTTING.flatMap((domain) => cardsOfDomain(domain)).map((c) => (
            <button key={c.id} className={active(`card/${c.id}`)} onClick={() => go(`/ai/card/${c.id}`)}><Rich text={splitComparison(t(c.title))[0]} /></button>
          ))}
        </div>
        <div className="ai-nav-layer">
          <div className="ai-nav-layer-title">{t(UI.blueprintTitle).split('·')[0].trim()}</div>
          <button className={active('blueprint')} onClick={() => go('/ai/blueprint')}>{t(UI.blueprintTitle).split('·')[1]?.trim()}</button>
        </div>
        <div className="ai-nav-layer">
          <div className="ai-nav-layer-title">{t(UI.labs)}</div>
          {Object.entries(LABS).map(([lid, lab]) => (
            <button key={lid} className={active(`lab/${lid}`)} onClick={() => go(`/ai/lab/${lid}`)}><Rich text={t(lab.title).replace(/^(实验：|Lab: )/, '')} /></button>
          ))}
        </div>
      </nav>
      <div className="ai-main" ref={main}>
        {/* keyed so the entrance animation replays on every navigation */}
        <div key={key} className="ai-enter">{content}</div>
      </div>
    </div>
  )
}
