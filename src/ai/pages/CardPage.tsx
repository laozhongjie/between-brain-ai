import { TOUR_BY_ID } from '../../data/tours'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { enterFocus } from '../../sim/focus'
import { useStore } from '../../store'
import { LAYERS, READING_ORDER } from '../content'
import { FIGS } from '../figs'
import { LABS } from '../labs/registry'
import { Rich, Tex } from '../Tex'
import type { Card, Formula } from '../types'
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
    <details className="card-math">
      <summary>{t(UI.showMath)}</summary>
      <div className="formulas">
        {list.map((f, i) => (
          <figure key={i} className="formula">
            <Tex tex={f.tex} />
            <figcaption><Rich text={t(f.caption)} /></figcaption>
          </figure>
        ))}
      </div>
    </details>
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
        <span className="card-kicker">{t(UI.cardQuestion)}</span>
        <h2>{t(guide.question)}</h2>
        <p className="lead"><Rich text={t(guide.answer)} /></p>
      </div>
      <div className="card-badges">
        <CorrBadge corr={card.corr} />
        <EvidenceBadge ev={card.evidence} />
        {card.tour && (
          <button className="btn-sm" onClick={openInAtlas}><Icon name="brain" />{t(UI.viewInAtlas)}：{t(TOUR_BY_ID[card.tour].name)}</button>
        )}
      </div>
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
