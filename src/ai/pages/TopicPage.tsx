import type { ComponentType } from 'react'
import { TOUR_BY_ID } from '../../data/tours'
import type { Bi } from '../../data/types'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { enterFocus } from '../../sim/focus'
import { useStore } from '../../store'
import { CARD_BY_ID, MECH_BY_ID, TOPIC_CONTENT, WRITTEN_TOPICS, domainOfTopic } from '../content'
import { TOPIC_FIGS } from '../figs'
import { GRAMMAR_LEGEND, LegendMark } from '../figs/grammar'
import type { FigProps } from '../figs/types'
import { Rich, Tex } from '../Tex'
import type { Topic, TopicFormula } from '../types'
import { EvidenceBadge, KindTags, PagerLink, RefList } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'

function Figure({ Fig, cap, wide }: { Fig: ComponentType<FigProps>; cap: Bi; wide?: boolean }) {
  const t = useT()
  return (
    <figure className={`fig ${wide ? 'fig-wide' : ''}`}>
      <Fig t={t} />
      <figcaption><Rich text={t(cap)} /></figcaption>
    </figure>
  )
}

/** One equation with what its symbols stand for, what it explains and what it leaves out. */
function TopicFormulas({ list }: { list: TopicFormula[] }) {
  const t = useT()
  return (
    <div className="formulas">
      {list.map((f, i) => (
        <figure key={i} className="formula topic-formula">
          <Tex tex={f.tex} />
          <figcaption><Rich text={t(f.caption)} /></figcaption>
          <dl>
            <div><dt>{t(UI.mathMaps)}</dt><dd><Rich text={t(f.maps)} /></dd></div>
            <div><dt>{t(UI.mathExplains)}</dt><dd><Rich text={t(f.explains)} /></dd></div>
            <div><dt>{t(UI.mathLimits)}</dt><dd><Rich text={t(f.limits)} /></dd></div>
          </dl>
        </figure>
      ))}
    </div>
  )
}

/** A functional topic: one capability compared between two named systems (docs/atlas-v1-plan.md §5). */
export function TopicPage({ topic }: { topic: Topic }) {
  const t = useT()
  const c = TOPIC_CONTENT[topic.id]
  const figs = TOPIC_FIGS[topic.id]
  const domain = domainOfTopic(topic.id)
  const bio = t(topic.systems.biological)
  const comp = t(topic.systems.computational)
  const written = WRITTEN_TOPICS()
  const idx = written.findIndex((x) => x.id === topic.id)
  const prev = written[idx - 1]
  const next = written[idx + 1]
  const label = (x: Topic) => { const d = domainOfTopic(x.id); return `${d.id} · ${t(d.name)}` }

  const openInAtlas = () => {
    useStore.getState().setViewMode('3d')
    go('/atlas')
    enterFocus(topic.tour!)
  }

  return (
    <article className="ai-page card-page topic-page">
      <div className="crumbs">
        <button onClick={() => go('/ai')}>{t(UI.backToLadder)}</button>
        <span>{t(UI.functionalDomains)} · {domain.id} {t(domain.name)} · {topic.code}</span>
      </div>
      <span className="card-kicker">{t(topic.name)}</span>
      <h1><ComparisonText text={`${bio} ↔ ${comp}`} /></h1>
      <div className="card-intro">
        <span className="card-kicker">{t(UI.secThesis)}</span>
        <h2><Rich text={t(c.thesis)} /></h2>
      </div>
      <div className="card-badges">
        <KindTags kinds={c.kinds} />
        <EvidenceBadge ev={c.evidence} />
        {topic.tour && (
          <button className="btn-sm" onClick={openInAtlas}><Icon name="brain" />{t(UI.viewInAtlas)}{t({ zh: '：', en: ': ' })}{t(TOUR_BY_ID[topic.tour].name)}</button>
        )}
      </div>

      <section aria-labelledby="topic-capabilities">
        <h2 id="topic-capabilities">{t(UI.secCapabilities)}</h2>
        <p className="card-scope">{t(c.asOf)}</p>
        <table className="card-comparison review-table review-table-gap">
          <thead><tr><th scope="col">{t(UI.dimension)}</th><th scope="col">{bio}</th><th scope="col">{comp}</th><th scope="col">{t(UI.gapColumn)}</th></tr></thead>
          <tbody>
            {c.capabilities.map((row, i) => (
              <tr key={i}>
                <th scope="row">{t(row.dimension)}</th>
                <td><span className="comparison-mobile-label" aria-hidden>{bio}</span><Rich text={t(row.brain)} /></td>
                <td><span className="comparison-mobile-label" aria-hidden>{comp}</span><Rich text={t(row.ai)} /></td>
                <td><span className="comparison-mobile-label" aria-hidden>{t(UI.gapColumn)}</span><Rich text={t(row.gap)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="topic-architecture" className="review-architecture">
        <h2 id="topic-architecture">{t(UI.secArchitecture)}</h2>
        <div className="review-architecture-grid">
          <section className="review-system biological-system">
            <h3>{bio}</h3>
            <Figure Fig={figs.arch.brain} cap={figs.arch.brainCap} />
          </section>
          <section className="review-system computational-system">
            <h3>{comp}</h3>
            <Figure Fig={figs.arch.ai} cap={figs.arch.aiCap} />
          </section>
        </div>
        <ul className="grammar-legend">
          {GRAMMAR_LEGEND.map((g) => <li key={g.key}><LegendMark k={g.key} />{t(g.label)}</li>)}
        </ul>
      </section>

      <section aria-labelledby="topic-dynamics">
        <h2 id="topic-dynamics">{t(UI.secDynamics)}</h2>
        <Figure Fig={figs.dynamics.Fig} cap={figs.dynamics.cap} wide />
      </section>

      <section aria-labelledby="topic-math">
        <h2 id="topic-math">{t(UI.secMath)}</h2>
        <div className="two-col review-mechanisms">
          <section className="col brain-col">
            <h3>{bio}</h3>
            <TopicFormulas list={c.bioMath} />
          </section>
          <section className="col ai-col">
            <h3>{comp}</h3>
            <TopicFormulas list={c.compMath} />
          </section>
        </div>
      </section>

      <section aria-labelledby="topic-limits">
        <h2 id="topic-limits">{t(UI.secLimits)}</h2>
        <div className="review-limits">
          <div><h3>{bio}</h3><p><Rich text={t(c.limits.biological)} /></p></div>
          <div><h3>{comp}</h3><p><Rich text={t(c.limits.computational)} /></p></div>
          <div><h3>{t(UI.limitsUnsupported)}</h3><p><Rich text={t(c.limits.unsupported)} /></p></div>
        </div>
      </section>

      <section aria-labelledby="topic-evidence">
        <h2 id="topic-evidence"><Icon name="library" />{t(UI.secEvidence)}</h2>
        <div className="ref-groups">
          <div><h3>{t(UI.refNeuro)}</h3><RefList ids={c.refs.neuro} /></div>
          <div><h3>{t(UI.refModels)}</h3><RefList ids={c.refs.models} /></div>
          <div><h3>{t(UI.refAi)}</h3><RefList ids={c.refs.ai} /></div>
        </div>
      </section>

      {topic.mechanisms.length > 0 && (
        <section aria-labelledby="topic-related">
          <h2 id="topic-related">{t(UI.relatedMechanisms)}</h2>
          {topic.mechanisms.map((m) => MECH_BY_ID[m]).map((g) => (
            <div key={g.id} className="mech-group">
              <div className="mech-group-title"><span className="rung-no">{g.id}</span>{t(g.name)}</div>
              <div className="rung-cards">
                {g.cards.map((id) => CARD_BY_ID[id]).map((card) => (
                  <button key={card.id} className="chip" onClick={() => go(`/ai/card/${card.id}`)}>
                    <ComparisonText text={t(card.title)} />
                    <KindTags kinds={card.kinds} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <nav className="pager">
        {prev ? <PagerLink dir="prev" label={label(prev)} title={t(prev.name)} onClick={() => go(`/ai/topic/${prev.id}`)} /> : <span />}
        {next ? <PagerLink dir="next" label={label(next)} title={t(next.name)} onClick={() => go(`/ai/topic/${next.id}`)} /> : <span />}
      </nav>
    </article>
  )
}
