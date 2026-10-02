import { Rich } from '../../rich'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARD_BY_ID, CROSS_TOPICS, DOMAINS, INTRO_REFS, MECH_GROUPS, SCALES, TOPIC_CONTENT, crossHref, topicHref, topicsOfDomain } from '../content'
import { LABS } from '../labs/registry'
import type { Topic } from '../types'
import { KindTags, Legend, RefList } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'

/** A directory entry: opens its page, or shows that it is still being written. */
function TopicChip({ topic }: { topic: Topic }) {
  const t = useT()
  const href = topicHref(topic)
  return (
    <button className={`chip topic-chip ${href ? '' : 'pending'}`} disabled={!href} onClick={() => href && go(href)}>
      <span>{t(topic.name)}</span>
      {!TOPIC_CONTENT[topic.id] && <span className="chip-status">{t(href ? UI.statusLegacy : UI.statusDrafting)}</span>}
    </button>
  )
}

export function AiHome() {
  const t = useT()
  return (
    <article className="ai-page">
      <h1>{t(UI.aiTitle)}</h1>
      <p className="lead">{t(UI.aiIntro)}</p>
      <button className="chip concept-entry" onClick={() => go('/ai/concepts')}><Icon name="search" size={14} />{t(UI.conceptIndex)}</button>
      <h3>{t(UI.howToRead)}</h3>
      <Legend />

      <h3>{t(UI.functionalDomains)}</h3>
      <div className="ladder domain-directory">
        {DOMAINS.map((domain) => (
          <section key={domain.id} className="rung domain-rung">
            <header>
              <span className="rung-no">{domain.id.replace(/^D/, '')}</span>
              <div>
                <h2>{t(domain.name)}</h2>
                <p><Rich text={t(domain.desc)} /></p>
              </div>
            </header>
            <div className="rung-cards">
              {topicsOfDomain(domain).map((topic) => <TopicChip key={topic.id} topic={topic} />)}
            </div>
          </section>
        ))}
      </div>

      <h3>{t(UI.scaleIndex)}</h3>
      <p className="section-note">{t(UI.scaleIndexIntro)}</p>
      <div className="ladder domain-directory">
        {SCALES.map((scale) => (
          <section key={scale.id} className="rung domain-rung">
            <header>
              <div><h2>{t(scale.name)}</h2></div>
            </header>
            {MECH_GROUPS.filter((g) => g.scale === scale.id).map((group) => (
              <div key={group.id} className="mech-group">
                <div className="mech-group-title"><span className="rung-no">{group.id}</span>{t(group.name)}</div>
                <div className="rung-cards">
                  {group.cards.map((id) => CARD_BY_ID[id]).map((c) => (
                    <button key={c.id} className="chip" onClick={() => go(`/ai/card/${c.id}`)}>
                      <ComparisonText text={t(c.title)} />
                      <KindTags kinds={c.kinds} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <h3>{t(UI.crossCuttingTopics)}</h3>
      <div className="ladder domain-directory">
        {CROSS_TOPICS.map((x) => {
          const href = crossHref(x)
          return (
            <section key={x.id} className="rung domain-rung">
              <header>
                <span className="rung-no">{x.id}</span>
                <div><h2>{t(x.name)}</h2><p><Rich text={t(x.desc)} /></p></div>
              </header>
              <div className="rung-cards">
                <button className={`chip topic-chip ${href ? '' : 'pending'}`} disabled={!href} onClick={() => href && go(href)}>
                  <span>{t(UI.openTopic)}</span>
                  {!x.route && <span className="chip-status">{t(href ? UI.statusLegacy : UI.statusDrafting)}</span>}
                </button>
              </div>
            </section>
          )
        })}
      </div>

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
