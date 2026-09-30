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
import { CorrBadge, EvidenceBadge, RefList } from './common'
import { Icon } from '../../ui/Icon'

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
    <div className="formulas">
      {list.map((f, i) => (
        <figure key={i} className="formula">
          <Tex tex={f.tex} />
          <figcaption><Rich text={t(f.caption)} /></figcaption>
        </figure>
      ))}
    </div>
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
  const layerTag = (c: Card) => c.layer !== card.layer && <small className="pager-layer">{t(UI.layer).replace('{n}', String(c.layer))}</small>
  const Lab = card.lab ? LABS[card.lab] : null
  const figs = FIGS[card.id]

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
      <h1><Rich text={t(card.title)} /></h1>
      <div className="card-badges">
        <CorrBadge corr={card.corr} />
        <EvidenceBadge ev={card.evidence} />
        {card.tour && (
          <button className="btn-sm" onClick={openInAtlas}><Icon name="brain" />{t(UI.viewInAtlas)}：{t(TOUR_BY_ID[card.tour].name)}</button>
        )}
      </div>
      <p className="lead"><Rich text={t(card.summary)} /></p>

      <div className="two-col">
        <section className="col brain-col">
          <h2><Icon name="brain" />{t(UI.secBrain)}</h2>
          {figs && <Figure Fig={figs.brain} cap={figs.brainCap} />}
          <p><Rich text={t(card.brain)} /></p>
          <Formulas list={card.brainMath} />
        </section>
        <section className="col ai-col">
          <h2><Icon name="cpu" />{t(UI.secAi)}</h2>
          {figs && <Figure Fig={figs.ai} cap={figs.aiCap} />}
          <p><Rich text={t(card.ai)} /></p>
          <Formulas list={card.aiMath} />
        </section>
      </div>

      <section>
        <h2>≠ {t(UI.secDiffs)}</h2>
        <ul className="diffs">{card.diffs.map((d, i) => <li key={i}><Rich text={t(d)} /></li>)}</ul>
      </section>

      <section className="principle">
        <h2><Icon name="scale" />{t(UI.secPrinciple)}</h2>
        <p><Rich text={t(card.principle)} /></p>
      </section>

      <section>
        <h2><Icon name="lightbulb" />{t(UI.secIdeas)}</h2>
        <ul className="ideas">{card.ideas.map((d, i) => <li key={i}><Rich text={t(d)} /></li>)}</ul>
      </section>

      {Lab && (
        <section className="lab-section">
          <h2><Icon name="flask" /><span>{t(UI.secLab)} · <Rich text={t(Lab.title)} /></span></h2>
          <Lab.component />
        </section>
      )}

      <section>
        <h2><Icon name="library" />{t(UI.secRefs)}</h2>
        <RefList ids={card.refs} />
      </section>

      <nav className="pager">
        {prev ? (
          <button onClick={() => go(`/ai/card/${prev.id}`)}>{layerTag(prev)}<span>← <Rich text={t(prev.title)} /></span></button>
        ) : (
          <button onClick={() => go('/ai/blueprint')}><small className="pager-layer">{t(UI.layer).replace('{n}', '5')}</small><span>← {t(UI.blueprintTitle).split('·')[1]?.trim()}</span></button>
        )}
        {next ? <button className="next" onClick={() => go(`/ai/card/${next.id}`)}>{layerTag(next)}<span><Rich text={t(next.title)} /> →</span></button> : <span />}
      </nav>
    </article>
  )
}
