import { Rich } from '../../rich'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARDS } from '../content'
import { LABS } from '../labs/registry'
import { KindTags } from './common'
import { Icon } from '../../ui/Icon'
import { ComparisonText } from '../../ui/ComparisonText'

export function LabPage({ id }: { id: string }) {
  const t = useT()
  const lab = LABS[id]
  const cards = CARDS.filter((c) => c.lab === id)
  return (
    <article className="ai-page">
      <div className="crumbs"><button className="btn-sm crumb-back" onClick={() => go('/ai')}><Icon name="arrow-left" />{t(UI.backToLadder)}</button></div>
      <h1><Icon name="flask" size={22} /><Rich text={t(lab.title)} /></h1>
      <lab.component />
      <h3>{t(UI.relatedCards)}</h3>
      <div className="rung-cards">
        {cards.map((c) => (
          <button key={c.id} className="chip" onClick={() => go(`/ai/card/${c.id}`)}>
            <ComparisonText text={t(c.title)} />
            <KindTags kinds={c.kinds} />
          </button>
        ))}
      </div>
    </article>
  )
}
