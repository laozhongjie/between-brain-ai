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
import type { FigStep, FlowStep, Topic, TopicFormula } from '../types'
import { EvidenceBadge, KindTags, PagerLink, RefList } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'

function Figure({ Fig }: { Fig: ComponentType<FigProps> }) {
  const t = useT()
  return <figure className="fig"><Fig t={t} /></figure>
}

/** The numbered explanation under a figure; each number matches a marker in the figure. */
function Steps({ steps, side }: { steps: FigStep[]; side: 'bio' | 'comp' }) {
  const t = useT()
  return (
    <ol className={`fig-steps ${side}`}>
      {steps.map((s, i) => (
        <li key={i}>
          <span className="step-num" aria-hidden>{i + 1}</span>
          <div>
            <h4>{t(s.title)}</h4>
            <ul>{s.points.map((p, j) => <li key={j}><Rich text={t(p)} /></li>)}</ul>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** The information flow through an architecture figure: per numbered step, what arrives, what it does, where it goes. */
function FlowSteps({ steps, side }: { steps: FlowStep[]; side: 'bio' | 'comp' }) {
  const t = useT()
  return (
    <ol className={`fig-steps ${side}`}>
      {steps.map((s, i) => {
        const rows: [Bi, Bi | undefined][] = [[UI.flowSignal, s.signal], [UI.flowEffect, s.effect], [UI.flowNext, s.next]]
        return (
          <li key={i}>
            <span className="step-num" aria-hidden>{i + 1}</span>
            <div>
              <h4>{t(s.title)}</h4>
              <dl className="flow">
                {rows.filter(([, v]) => v).map(([k, v], j) => <div key={j}><dt>{t(k)}</dt><dd><Rich text={t(v!)} /></dd></div>)}
              </dl>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/** One equation, taught: what it describes, its symbols, how it computes, an example, what follows and its limits. */
function FormulaCard({ f, side }: { f: TopicFormula; side: 'bio' | 'comp' }) {
  const t = useT()
  return (
    <article className={`formula-card ${side}`}>
      <h4><Rich text={t(f.title)} /></h4>
      <div className="formula"><Tex tex={f.tex} /></div>
      <table className="symbols">
        <thead><tr><th scope="col">{t(UI.mathSymbols)}</th><th scope="col">{t(UI.mathMeaning)}</th></tr></thead>
        <tbody>
          {f.symbols.map((s, i) => <tr key={i}><td><Rich text={`$${s.tex}$`} /></td><td><Rich text={t(s.meaning)} /></td></tr>)}
        </tbody>
      </table>
      <h5>{t(UI.mathSteps)}</h5>
      <ol>{f.steps.map((s, i) => <li key={i}><Rich text={t(s)} /></li>)}</ol>
      {f.example && (
        <>
          <h5>{t(UI.mathExample)}</h5>
          <p className="example"><Rich text={t(f.example)} /></p>
        </>
      )}
      <div className="formula-outcomes">
        <div>
          <h5>{t(UI.mathConsequences)}</h5>
          <ul>{f.consequences.map((s, i) => <li key={i}><Rich text={t(s)} /></li>)}</ul>
        </div>
        <div>
          <h5>{t(UI.mathLimitations)}</h5>
          <ul>{f.limitations.map((s, i) => <li key={i}><Rich text={t(s)} /></li>)}</ul>
        </div>
      </div>
    </article>
  )
}

const Bullets = ({ items }: { items: Bi[] }) => {
  const t = useT()
  return <ul className="bullets">{items.map((x, i) => <li key={i}><Rich text={t(x)} /></li>)}</ul>
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
      <span className="topic-kicker">{t(topic.name)}</span>
      <h1><ComparisonText text={`${bio} ↔ ${comp}`} /></h1>
      <div className="thesis">
        <span className="card-kicker">{t(UI.secThesis)}</span>
        <div className="thesis-sides">
          <section className="bio"><h3>{bio}</h3><p><Rich text={t(c.thesis.biological)} /></p></section>
          <section className="comp"><h3>{comp}</h3><p><Rich text={t(c.thesis.computational)} /></p></section>
        </div>
        <p className="thesis-gap"><strong>{t(UI.thesisGap)}</strong><Rich text={t(c.thesis.gap)} /></p>
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
        <ul className="grammar-legend">
          {GRAMMAR_LEGEND.map((g) => <li key={g.key}><LegendMark k={g.key} />{t(g.label)}</li>)}
        </ul>
        <div className="arch-grid">
          {([['bio', bio, figs.arch.brain, c.archSteps.biological, c.archNotes.biological], ['comp', comp, figs.arch.ai, c.archSteps.computational, c.archNotes.computational]] as const).map(([side, name, Fig, steps, notes]) => (
            <section key={side} className={`arch-col ${side}`}>
              <h3>{name}</h3>
              <Figure Fig={Fig} />
              <FlowSteps steps={steps} side={side} />
              <aside className="arch-notes">
                <h5>{t(UI.archNotes)}</h5>
                <ul>{notes.map((n, i) => <li key={i}><Rich text={t(n)} /></li>)}</ul>
              </aside>
            </section>
          ))}
        </div>
      </section>

      <section aria-labelledby="topic-dynamics">
        <h2 id="topic-dynamics">{t(UI.secDynamics)}</h2>
        <Figure Fig={figs.dynamics} />
        <div className="two-col-steps">
          <section><h3 className="bio">{bio}</h3><Steps steps={c.dynamicsSteps.biological} side="bio" /></section>
          <section><h3 className="comp">{comp}</h3><Steps steps={c.dynamicsSteps.computational} side="comp" /></section>
        </div>
      </section>

      <section aria-labelledby="topic-math">
        <h2 id="topic-math">{t(UI.secMath)}</h2>
        <h3 className="math-side bio">{bio}</h3>
        {c.bioMath.map((f, i) => <FormulaCard key={i} f={f} side="bio" />)}
        <h3 className="math-side comp">{comp}</h3>
        {c.compMath.map((f, i) => <FormulaCard key={i} f={f} side="comp" />)}
      </section>

      <section aria-labelledby="topic-limits">
        <h2 id="topic-limits">{t(UI.secLimits)}</h2>
        <div className="review-limits">
          <div><h3>{bio}</h3><Bullets items={c.limits.biological} /></div>
          <div><h3>{comp}</h3><Bullets items={c.limits.computational} /></div>
          <div><h3>{t(UI.limitsUnsupported)}</h3><Bullets items={c.limits.unsupported} /></div>
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
