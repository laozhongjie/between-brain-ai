import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARD_BY_ID, LEVEL_COLORS, READING_ORDER } from '../content'
import { DIFFERENCES, MODULES, MODULE_BY_ID } from '../content/blueprint'
import { Rich } from '../Tex'
import { CorrBadge, LevelBar, PagerLink, RefList } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'

const COV = [UI.cov0, UI.cov1, UI.cov2, UI.cov3]
const COLS = [UI.colInput, UI.colModel, UI.colControl, UI.colValue, UI.colOutput]

export function Blueprint({ moduleId }: { moduleId?: string }) {
  const t = useT()
  const sel = moduleId ? MODULE_BY_ID[moduleId] : undefined

  return (
    <article className="ai-page">
      <div className="crumbs"><button onClick={() => go('/ai')}>{t(UI.backToLadder)}</button></div>
      <h1>{t(UI.blueprintTitle)}</h1>
      <p className="lead">{t(UI.blueprintIntro)}</p>
      <div className="cov-legend">
        <strong>{t(UI.coverage)}</strong>
        {[3, 2, 1, 0].map((l) => <LevelBar key={l} level={l} label={t(COV[l])} />)}
        <span className="muted">◎ = {t(MODULE_BY_ID['world-model'].name)}</span>
      </div>

      <div className="bp-wrap">
        <div className="bp-grid">
          {COLS.map((c, i) => <div key={i} className="bp-col-head" style={{ gridColumn: i + 1, gridRow: 1 }}>{t(c)}</div>)}
          <div className="bp-row-band" style={{ gridColumn: '1 / -1', gridRow: 5 }}>{t(UI.rowLifetime)}</div>
          {MODULES.map((m) => (
            <button
              key={m.id}
              className={`bp-module cov-${m.coverage} ${sel?.id === m.id ? 'on' : ''} ${m.id === 'world-model' ? 'wm' : ''}`}
              style={{ gridColumn: m.pos[0] + 1, gridRow: m.pos[1] + 2 + (m.pos[1] === 3 ? 1 : 0), borderColor: m.coverage ? LEVEL_COLORS[m.coverage] : undefined }}
              onClick={() => go(`/ai/blueprint/${m.id}`)}
            >
              <span className="bp-name">{t(m.name)}</span>
              <LevelBar level={m.coverage} label={t(COV[m.coverage])} />
            </button>
          ))}
        </div>

        <aside className="bp-detail">
          {sel ? (
            <>
              <h2>{t(sel.name)} <LevelBar level={sel.coverage} label={t(COV[sel.coverage])} /></h2>
              <h3><Icon name="brain" />{t(UI.brainCol)}</h3>
              <p><Rich text={t(sel.brain)} /></p>
              <h3><Icon name="cpu" />{t(UI.aiCol)}</h3>
              <p><Rich text={t(sel.ai)} /></p>
              <h3>≠ {t(UI.gaps)}</h3>
              <p><Rich text={t(sel.gaps)} /></p>
              <h3><Icon name="lightbulb" />{t(UI.directions)}</h3>
              <p><Rich text={t(sel.directions)} /></p>
              <h3>{t(UI.relatedCards)}</h3>
              <div className="rung-cards">
                {sel.cards.map((id) => (
                  <button key={id} className="chip" onClick={() => go(`/ai/card/${id}`)}>
                    <ComparisonText text={t(CARD_BY_ID[id].title)} />
                    <CorrBadge corr={CARD_BY_ID[id].corr} />
                  </button>
                ))}
              </div>
              <h3><Icon name="library" />{t(UI.secRefs)}</h3>
              <RefList ids={sel.refs} />
            </>
          ) : (
            <p className="muted">{t(UI.pickModule)}</p>
          )}
        </aside>
      </div>

      <h2>{t(UI.crossDiffs)}</h2>
      <table className="diff-table">
        <thead><tr><th>{t(UI.dimension)}</th><th>{t(UI.brainCol)}</th><th>{t(UI.aiCol)}</th></tr></thead>
        <tbody>
          {DIFFERENCES.map((d, i) => (
            <tr key={i} className={i === DIFFERENCES.length - 1 ? 'ai-ahead' : ''}>
              <th>{t(d.dim)}</th><td><Rich text={t(d.brain)} /></td><td><Rich text={t(d.ai)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="pager">
        <span />
        <PagerLink dir="next" layer={READING_ORDER[0].layer} title={t(READING_ORDER[0].title)} onClick={() => go(`/ai/card/${READING_ORDER[0].id}`)} />
      </nav>
    </article>
  )
}
