import { Rich } from '../../rich'
import { UI, useT } from '../../i18n'
import { go } from '../../route'
import { CARDS } from '../content'
import { LABS } from '../labs/registry'
import { CorrBadge } from './common'

export function LabPage({ id }: { id: string }) {
  const t = useT()
  const lab = LABS[id]
  const cards = CARDS.filter((c) => c.lab === id)
  return (
    <article className="ai-page">
      <div className="crumbs"><button onClick={() => go('/ai')}>{t(UI.backToLadder)}</button></div>
      <h1>🧪 <Rich text={t(lab.title)} /></h1>
      <lab.component />
      <h3>{t(UI.relatedCards)}</h3>
      <div className="rung-cards">
        {cards.map((c) => (
          <button key={c.id} className="chip" onClick={() => go(`/ai/card/${c.id}`)}>
            <span><Rich text={t(c.title)} /></span>
            <CorrBadge corr={c.corr} />
          </button>
        ))}
      </div>
    </article>
  )
}
