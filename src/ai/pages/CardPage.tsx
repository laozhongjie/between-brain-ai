import { TOUR_BY_ID } from '../../data/tours'
import type { Bi } from '../../data/types'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { enterFocus } from '../../sim/focus'
import { useStore } from '../../store'
import { LAYERS, READING_ORDER } from '../content'
import { FIGS } from '../figs'
import { LABS } from '../labs/registry'
import { Rich, Tex } from '../Tex'
import type { ArchitectureTrack, Card, Formula } from '../types'
import { CorrBadge, EvidenceBadge, PagerLink, RefList } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'

function Figure({ Fig, cap }: { Fig: import('../figs/types').FigPair['brain']; cap: import('../../data/types').Bi }) {
  const t = useT()
  return (
    <figure className="fig">
      <Fig t={t} />
      <figcaption><Rich text={t(cap)} /></figcaption>
    </figure>
  )
}

function Formulas({ list }: { list?: Formula[] }) {
  const t = useT()
  if (!list?.length) return null
  return (
    <div className="card-math">
      <h4>{t(UI.showMath)}</h4>
      <div className="formulas">
        {list.map((f, i) => (
          <figure key={i} className="formula">
            <Tex tex={f.tex} />
            <figcaption><Rich text={t(f.caption)} /></figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function ArchitectureTrackView({ track, className }: { track: ArchitectureTrack; className: string }) {
  const t = useT()
  return (
    <section className={`architecture-col ${className}`}>
      <p className="architecture-summary"><Rich text={t(track.summary)} /></p>
      <ol className="architecture-flow">
        {track.steps.map((step, index) => (
          <li key={index} className="architecture-step">
            <span className="architecture-step-no" aria-hidden>{String(index + 1).padStart(2, '0')}</span>
            <div><strong>{t(step.label)}</strong><Rich text={t(step.detail)} /></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ReviewTable({ rows, systems, gap }: { rows: { dimension: Bi; brain: Bi; ai: Bi; gap?: Bi }[]; systems: { biological: Bi; computational: Bi }; gap?: boolean }) {
  const t = useT()
  return (
    <table className={`card-comparison review-table ${gap ? 'review-table-gap' : ''}`}>
      <thead><tr><th scope="col">{t(UI.dimension)}</th><th scope="col">{t(systems.biological)}</th><th scope="col">{t(systems.computational)}</th>{gap && <th scope="col">{t(UI.gapColumn)}</th>}</tr></thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row">{t(row.dimension)}</th>
            <td><span className="comparison-mobile-label" aria-hidden>{t(systems.biological)}</span><Rich text={t(row.brain)} /></td>
            <td><span className="comparison-mobile-label" aria-hidden>{t(systems.computational)}</span><Rich text={t(row.ai)} /></td>
            {gap && row.gap && <td><span className="comparison-mobile-label" aria-hidden>{t(UI.gapColumn)}</span><Rich text={t(row.gap)} /></td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ReviewCardContent({ card, figs }: { card: Card; figs?: import('../figs/types').FigPair }) {
  const t = useT()
  const review = card.guide.review!
  return (
    <>
      <section aria-labelledby="card-capabilities-title">
        <h2 id="card-capabilities-title">{t(UI.secDiffs)}</h2>
        <ReviewTable rows={review.capabilities} systems={review.systems} gap />
      </section>

      <section aria-labelledby="card-architecture-title" className="review-architecture">
        <h2 id="card-architecture-title">{t(UI.secArchitecture)}</h2>
        <div className="review-architecture-grid">
          <section className="review-system biological-system">
            <h3>{t(review.systems.biological)}</h3>
            {figs && <Figure Fig={figs.brain} cap={figs.brainCap} />}
          </section>
          <section className="review-system computational-system">
            <h3>{t(review.systems.computational)}</h3>
            {figs && <Figure Fig={figs.ai} cap={figs.aiCap} />}
          </section>
        </div>
      </section>

      <section aria-labelledby="card-state-title">
        <h2 id="card-state-title">{t(UI.secState)}</h2>
        <ReviewTable rows={review.state} systems={review.systems} />
      </section>

      <section aria-labelledby="card-timescales-title">
        <h2 id="card-timescales-title">{t(UI.secTimescales)}</h2>
        <ReviewTable rows={review.timescale} systems={review.systems} />
      </section>

      <section aria-labelledby="card-mechanisms-title">
        <h2 id="card-mechanisms-title">{t(UI.secMechanisms)}</h2>
        <div className="two-col review-mechanisms">
          <section className="col brain-col">
            <h3>{t(review.systems.biological)}</h3>
            <p><Rich text={t(card.brain)} /></p>
            <Formulas list={card.brainMath} />
          </section>
          <section className="col ai-col">
            <h3>{t(review.systems.computational)}</h3>
            <p><Rich text={t(card.ai)} /></p>
            <Formulas list={card.aiMath} />
          </section>
        </div>
      </section>

      <section aria-labelledby="card-limits-title">
        <h2 id="card-limits-title">{t(UI.secLimits)}</h2>
        <div className="review-limits">
          <div><h3>{t(review.systems.biological)}</h3><p><Rich text={t(review.limits.biological)} /></p></div>
          <div><h3>{t(review.systems.computational)}</h3><p><Rich text={t(review.limits.computational)} /></p></div>
          <div><h3>{t(UI.reviewEvidence)}</h3><p><Rich text={t(review.limits.evidence)} /></p></div>
        </div>
      </section>
    </>
  )
}

function LegacyCardContent({ card, figs }: { card: Card; figs?: import('../figs/types').FigPair }) {
  const t = useT()
  const guide = card.guide
  return (
    <>
      <section aria-labelledby="card-comparison-title">
        <h2 id="card-comparison-title">{t(UI.secDiffs)}</h2>
        <p className="card-scope"><strong>{t(UI.comparisonScope)}</strong> · {t(guide.scope)}</p>
        <table className="card-comparison">
          <thead><tr><th scope="col">{t(UI.dimension)}</th><th scope="col">{t(UI.brainCol)}</th><th scope="col">{t(UI.comparedAi)}</th></tr></thead>
          <tbody>
            {guide.comparisons.map((row, index) => (
              <tr key={index}>
                <th scope="row">{t(row.dimension)}</th>
                <td><span className="comparison-mobile-label" aria-hidden>{t(UI.brainCol)}</span><Rich text={t(row.brain)} /></td>
                <td><span className="comparison-mobile-label" aria-hidden>{t(UI.comparedAi)}</span><Rich text={t(row.ai)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {guide.architecture && (
        <section aria-labelledby="card-architecture-title" className="card-architecture">
          <h2 id="card-architecture-title">{t(UI.secArchitecture)}</h2>
          <div className="architecture-grid">
            <ArchitectureTrackView track={guide.architecture.brain} className="brain-col" />
            <ArchitectureTrackView track={guide.architecture.ai} className="ai-col" />
          </div>
          <dl className="architecture-meta">
            {guide.architecture.state && <div><dt>{t(UI.architectureState)}</dt><dd><Rich text={t(guide.architecture.state)} /></dd></div>}
            {guide.architecture.timescale && <div><dt>{t(UI.architectureTimescale)}</dt><dd><Rich text={t(guide.architecture.timescale)} /></dd></div>}
            {guide.architecture.caveat && <div><dt>{t(UI.architectureCaveat)}</dt><dd><Rich text={t(guide.architecture.caveat)} /></dd></div>}
          </dl>
        </section>
      )}

      <section aria-labelledby="card-mechanisms-title">
        <h2 id="card-mechanisms-title">{t(UI.secMechanisms)}</h2>
        <div className="two-col">
          <section className="col brain-col">
            <h3><Icon name="brain" />{t(UI.secBrain)}</h3>
            {figs && <Figure Fig={figs.brain} cap={figs.brainCap} />}
            <p><Rich text={t(card.brain)} /></p>
            <Formulas list={card.brainMath} />
          </section>
          <section className="col ai-col">
            <h3><Icon name="cpu" />{t(UI.secAi)}</h3>
            {figs && <Figure Fig={figs.ai} cap={figs.aiCap} />}
            <p><Rich text={t(card.ai)} /></p>
            <Formulas list={card.aiMath} />
          </section>
        </div>
      </section>

      <section aria-labelledby="card-lessons-title">
        <h2 id="card-lessons-title">{t(UI.secPrinciple)}</h2>
        <div className="card-lessons">
          <div><h3>{t(UI.borrowLesson)}</h3><p><Rich text={t(guide.borrow)} /></p></div>
          <div><h3>{t(UI.analogyBoundary)}</h3><p><Rich text={t(guide.boundary)} /></p></div>
        </div>
      </section>

      <section aria-labelledby="card-designs-title">
        <h2 id="card-designs-title">{t(UI.secIdeas)}</h2>
        <p className="card-note">{t(UI.designStatus)}</p>
        <ol className="card-experiments">
          {guide.experiments.map((experiment, index) => (
            <li key={index}>
              <h3><span className="experiment-number" aria-hidden>{String(index + 1).padStart(2, '0')}</span>{t(experiment.title)}</h3>
              <dl>
                <div><dt>{t(UI.designChange)}</dt><dd><Rich text={t(experiment.change)} /></dd></div>
                <div><dt>{t(UI.designTest)}</dt><dd><Rich text={t(experiment.test)} /></dd></div>
                <div><dt>{t(UI.designTradeoff)}</dt><dd><Rich text={t(experiment.tradeoff)} /></dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

export function CardPage({ card }: { card: Card }) {
  const t = useT()
  const layer = LAYERS.find((l) => l.id === card.layer)!
  // Paging runs across layers: the first card of a layer goes back to the previous layer's last one,
  // and the first card overall goes back to the layer-5 blueprint
  const idx = READING_ORDER.findIndex((c) => c.id === card.id)
  const prev = READING_ORDER[idx - 1]
  const next = READING_ORDER[idx + 1]
  const Lab = card.lab ? LABS[card.lab] : null
  const figs = FIGS[card.id]
  const guide = card.guide

  const openInAtlas = () => {
    useStore.getState().setViewMode('3d')
    go('/atlas')
    enterFocus(card.tour!)
  }

  return (
    <article className="ai-page card-page">
      <div className="crumbs">
        <button onClick={() => go('/ai')}>{t(UI.backToLadder)}</button>
        <span>{t(UI.layer).replace('{n}', String(layer.id))} · {t(layer.name)}</span>
      </div>
      <h1><ComparisonText text={t(card.title)} /></h1>
      <div className="card-intro">
        <span className="card-kicker">{t(guide.review ? UI.secThesis : UI.cardQuestion)}</span>
        <h2>{t(guide.review ? guide.review.thesis : guide.question)}</h2>
        {!guide.review && <p className="lead"><Rich text={t(guide.answer)} /></p>}
      </div>
      <div className="card-badges">
        <CorrBadge corr={card.corr} />
        <EvidenceBadge ev={card.evidence} />
        {card.tour && (
          <button className="btn-sm" onClick={openInAtlas}><Icon name="brain" />{t(UI.viewInAtlas)}：{t(TOUR_BY_ID[card.tour].name)}</button>
        )}
      </div>
      {guide.review ? <ReviewCardContent card={card} figs={figs} /> : <LegacyCardContent card={card} figs={figs} />}

      {Lab && (
        <section className="lab-section">
          <h2><Icon name="flask" /><span>{t(UI.secLab)} · <Rich text={t(Lab.title)} /></span></h2>
          <Lab.component />
        </section>
      )}

      <section>
        <h2><Icon name="library" />{t(UI.secRefs)}</h2>
        <p className="card-note">{t(UI.referenceScope)}</p>
        <RefList ids={card.refs} />
      </section>

      <nav className="pager">
        {prev ? (
          <PagerLink dir="prev" layer={prev.layer} title={t(prev.title)} onClick={() => go(`/ai/card/${prev.id}`)} />
        ) : (
          <PagerLink dir="prev" layer={5} title={t(UI.blueprintTitle).split('·')[1]?.trim() ?? ''} onClick={() => go('/ai/blueprint')} />
        )}
        {next ? <PagerLink dir="next" layer={next.layer} title={t(next.title)} onClick={() => go(`/ai/card/${next.id}`)} /> : <span />}
      </nav>
    </article>
  )
}
