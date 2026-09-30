import { TOUR_BY_ID } from '../../data/tours'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { enterFocus } from '../../sim/focus'
import { useStore } from '../../store'
import { LAYERS, cardsOfLayer } from '../content'
import { LABS } from '../labs/registry'
import { Tex } from '../Tex'
import type { Card, Formula } from '../types'
import { CorrBadge, EvidenceBadge, RefList } from './common'

function Formulas({ list }: { list?: Formula[] }) {
  const t = useT()
  if (!list?.length) return null
  return (
    <div className="formulas">
      {list.map((f, i) => (
        <figure key={i} className="formula">
          <Tex tex={f.tex} />
          <figcaption>{t(f.caption)}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function CardPage({ card }: { card: Card }) {
  const t = useT()
  const layer = LAYERS.find((l) => l.id === card.layer)!
  const siblings = cardsOfLayer(card.layer)
  const idx = siblings.findIndex((c) => c.id === card.id)
  const prev = siblings[idx - 1]
  const next = siblings[idx + 1]
  const Lab = card.lab ? LABS[card.lab] : null

  const openInAtlas = () => {
    useStore.getState().setViewMode('3d')
    go('/')
    enterFocus(card.tour!)
  }

  return (
    <article className="ai-page card-page">
      <div className="crumbs">
        <button onClick={() => go('/ai')}>{t(UI.backToLadder)}</button>
        <span>{t(UI.layer).replace('{n}', String(layer.id))} · {t(layer.name)}</span>
      </div>
      <h1>{t(card.title)}</h1>
      <div className="card-badges">
        <CorrBadge corr={card.corr} />
        <EvidenceBadge ev={card.evidence} />
        {card.tour && (
          <button className="btn-sm" onClick={openInAtlas}>🧠 {t(UI.viewInAtlas)}：{t(TOUR_BY_ID[card.tour].name)}</button>
        )}
      </div>
      <p className="lead">{t(card.summary)}</p>

      <div className="two-col">
        <section className="col brain-col">
          <h2>🧠 {t(UI.secBrain)}</h2>
          <p>{t(card.brain)}</p>
          <Formulas list={card.brainMath} />
        </section>
        <section className="col ai-col">
          <h2>🤖 {t(UI.secAi)}</h2>
          <p>{t(card.ai)}</p>
          <Formulas list={card.aiMath} />
        </section>
      </div>

      <section>
        <h2>≠ {t(UI.secDiffs)}</h2>
        <ul className="diffs">{card.diffs.map((d, i) => <li key={i}>{t(d)}</li>)}</ul>
      </section>

      <section className="principle">
        <h2>⚖ {t(UI.secPrinciple)}</h2>
        <p>{t(card.principle)}</p>
      </section>

      <section>
        <h2>💡 {t(UI.secIdeas)}</h2>
        <ul className="ideas">{card.ideas.map((d, i) => <li key={i}>{t(d)}</li>)}</ul>
      </section>

      {Lab && (
        <section className="lab-section">
          <h2>🧪 {t(UI.secLab)} · {t(Lab.title)}</h2>
          <Lab.component />
        </section>
      )}

      <section>
        <h2>📚 {t(UI.secRefs)}</h2>
        <RefList ids={card.refs} />
      </section>

      <nav className="pager">
        {prev ? <button onClick={() => go(`/ai/card/${prev.id}`)}>← {t(prev.title)}</button> : <span />}
        {next ? <button onClick={() => go(`/ai/card/${next.id}`)}>{t(next.title)} →</button> : <span />}
      </nav>
    </article>
  )
}
