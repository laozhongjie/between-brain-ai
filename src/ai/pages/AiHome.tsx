import { Rich } from '../../rich'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { INTRO_REFS, LAYERS, cardsOfLayer } from '../content'
import { MODULES } from '../content/blueprint'
import { LABS } from '../labs/registry'
import { CorrBadge, Legend, LevelBar, RefList } from './common'

const COV = [UI.cov0, UI.cov1, UI.cov2, UI.cov3]

export function AiHome() {
  const t = useT()
  return (
    <article className="ai-page">
      <h1>{t(UI.aiTitle)}</h1>
      <p className="lead">{t(UI.aiIntro)}</p>
      <h3>{t(UI.howToRead)}</h3>
      <Legend />

      <div className="ladder">
        {[...LAYERS].reverse().map((l) => (
          <section key={l.id} className={`rung rung-${l.id}`}>
            <header>
              <span className="rung-no">{l.id}</span>
              <div>
                <h2>{t(l.name)} <small>{t(l.scale)}</small></h2>
                <p><Rich text={t(l.desc)} /></p>
              </div>
            </header>
            {l.id === 5 ? (
              <div className="rung-cards">
                {MODULES.map((m) => (
                  <button key={m.id} className="chip" onClick={() => go(`/ai/blueprint/${m.id}`)}>
                    <span>{t(m.name)}</span>
                    <LevelBar level={m.coverage} label={t(COV[m.coverage])} />
                  </button>
                ))}
                <button className="chip more" onClick={() => go('/ai/blueprint')}>{t(UI.openBlueprint)}</button>
              </div>
            ) : (
              <div className="rung-cards">
                {cardsOfLayer(l.id).map((c) => (
                  <button key={c.id} className="chip" onClick={() => go(`/ai/card/${c.id}`)}>
                    <span><Rich text={t(c.title)} /></span>
                    <CorrBadge corr={c.corr} />
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <h3>{t(UI.labs)}</h3>
      <div className="rung-cards">
        {Object.entries(LABS).map(([id, lab]) => (
          <button key={id} className="chip" onClick={() => go(`/ai/lab/${id}`)}>🧪 <Rich text={t(lab.title)} /></button>
        ))}
      </div>

      <h3>{t(UI.furtherReading)}</h3>
      <RefList ids={INTRO_REFS} />
    </article>
  )
}
