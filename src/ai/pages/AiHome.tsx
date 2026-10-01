import { Rich } from '../../rich'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CROSS_CUTTING, DOMAINS, cardsOfDomain } from '../content'
import { INTRO_REFS } from '../content'
import { LABS } from '../labs/registry'
import { CorrBadge, Legend, RefList } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'

export function AiHome() {
  const t = useT()
  return (
    <article className="ai-page">
      <h1>{t(UI.aiTitle)}</h1>
      <p className="lead">{t(UI.aiIntro)}</p>
      <h3>{t(UI.howToRead)}</h3>
      <Legend />

      <h3>{t(UI.functionalDomains)}</h3>
      <div className="ladder domain-directory">
        {DOMAINS.map((domain) => (
          <section key={domain.id} className="rung domain-rung">
            <header>
              <span className="rung-no">{domain.id}</span>
              <div>
                <h2>{t(domain.name)}</h2>
                <p><Rich text={t(domain.desc)} /></p>
              </div>
            </header>
            <div className="rung-cards">
              {cardsOfDomain(domain).map((c) => (
                <button key={c.id} className="chip" onClick={() => go(`/ai/card/${c.id}`)}>
                  <ComparisonText text={t(c.title)} />
                  <CorrBadge corr={c.corr} />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <h3>{t(UI.crossCuttingTopics)}</h3>
      <div className="ladder domain-directory">
        {CROSS_CUTTING.map((domain) => (
          <section key={domain.id} className="rung domain-rung">
            <header>
              <span className="rung-no">{domain.id}</span>
              <div><h2>{t(domain.name)}</h2><p><Rich text={t(domain.desc)} /></p></div>
            </header>
            <div className="rung-cards">
              {cardsOfDomain(domain).map((c) => (
                <button key={c.id} className="chip" onClick={() => go(`/ai/card/${c.id}`)}>
                  <ComparisonText text={t(c.title)} />
                  <CorrBadge corr={c.corr} />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="rung blueprint-entry">
        <header>
          <span className="rung-no">A</span>
          <div><h2>{t(UI.blueprintTitle).split('·')[1]?.trim() ?? t(UI.blueprintTitle)}</h2><p><Rich text={t(UI.blueprintIntro)} /></p></div>
        </header>
        <div className="rung-cards">
          <button className="chip more" onClick={() => go('/ai/blueprint')}>{t(UI.openBlueprint)}</button>
        </div>
      </section>

      <h3>{t(UI.labs)}</h3>
      <div className="rung-cards">
        {Object.entries(LABS).map(([id, lab]) => (
          <button key={id} className="chip" onClick={() => go(`/ai/lab/${id}`)}><Icon name="flask" size={14} /><Rich text={t(lab.title)} /></button>
        ))}
      </div>

      <h3>{t(UI.furtherReading)}</h3>
      <RefList ids={INTRO_REFS} />
    </article>
  )
}
