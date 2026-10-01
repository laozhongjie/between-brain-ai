import { Rich } from '../rich'
import { cardForTour } from '../ai/content'
import { NODE_BY_ID, resolveKey } from '../data/nodes'
import { TOURS } from '../data/tours'
import { go } from '../route'
import { LOBES, REGION_BY_KEY, SYSTEMS } from '../data/regions'
import type { Hemi, Link } from '../data/types'
import { UI, useT } from '../i18n'
import { useStore } from '../store'
import { ActivitySpark } from './ActivitySpark'
import { Icon } from './Icon'
import { DecodeText } from './DecodeText'
import { ComparisonText } from './ComparisonText'

function LinkList({ items, dir, hemi }: { items: Link[]; dir: 'in' | 'out'; hemi?: Hemi }) {
  const t = useT()
  const select = useStore((s) => s.select)
  return (
    <ul className="links">
      {items.map((x, i) => {
        const id = resolveKey(x.key, hemi)
        const other = REGION_BY_KEY[x.key]
        return (
          <li key={i}>
            <button className="link-btn" disabled={!id} onClick={() => id && select(id)}>
              <span className="dot" style={{ background: other ? SYSTEMS[other.system].color : '#888' }} />
              {dir === 'in' ? '← ' : '→ '}
              {other ? t(other.name) : x.key}
            </button>
            <div className="link-what"><Rich text={t(x.what)} /></div>
          </li>
        )
      })}
    </ul>
  )
}

export function RegionPanel() {
  const t = useT()
  const selected = useStore((s) => s.selected)
  const select = useStore((s) => s.select)
  const node = selected ? NODE_BY_ID[selected] : null
  if (!node) return null
  const info = node.info
  const sys = SYSTEMS[info.system]
  const side = node.hemi === 'lh' ? t(UI.left) : node.hemi === 'rh' ? t(UI.right) : null
  // Link to the Brain ↔ AI card of the functional system this region belongs to
  const tour = TOURS.find((x) => x.system === info.system)
  const aiCard = tour ? cardForTour(tour.id) : undefined

  return (
    // keyed by region so switching regions replays the entrance (name decodes, sections fade in)
    <aside className="panel region-panel" key={node.id}>
      <header>
        <div>
          <div className="region-tags">
            <span className="tag" style={{ borderColor: sys.color, color: sys.color }}>{t(sys.name)}</span>
            <span className="tag">{t(LOBES[info.lobe])}</span>
            {side && <span className="tag">{side}</span>}
            {info.abbr && <span className="tag">{info.abbr}</span>}
          </div>
          <h2><DecodeText text={t(info.name)} /></h2>
        </div>
        <button className="icon-btn" aria-label={t(UI.close)} onClick={() => select(null)}>×</button>
      </header>
      <ActivitySpark index={node.index} color={sys.color} />
      {aiCard && (
        <button className="ai-link" onClick={() => go(`/ai/card/${aiCard.id}`)}>
          <Icon name="cpu" size={16} />
          <span className="ai-link-text">
            <small>{t(UI.aiLink)}</small>
            <span><ComparisonText text={t(aiCard.title)} /></span>
          </span>
          <Icon name="chevron" size={16} className="ai-link-go" />
        </button>
      )}
      <section>
        <h3>{t(UI.function)}</h3>
        <p><Rich text={t(info.func)} /></p>
        {info.note && <p className="note"><Rich text={t(info.note)} /></p>}
      </section>
      {info.inputs.length > 0 && (
        <section>
          <h3>{t(UI.inputs)}</h3>
          <LinkList items={info.inputs} dir="in" hemi={node.hemi} />
        </section>
      )}
      {info.outputs.length > 0 && (
        <section>
          <h3>{t(UI.outputs)}</h3>
          <LinkList items={info.outputs} dir="out" hemi={node.hemi} />
        </section>
      )}
    </aside>
  )
}
