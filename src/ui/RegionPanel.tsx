import { NODE_BY_ID, resolveKey } from '../data/nodes'
import { LOBES, REGION_BY_KEY, SYSTEMS } from '../data/regions'
import type { Link } from '../data/types'
import { UI, useT } from '../i18n'
import { useStore } from '../store'
import { ActivitySpark } from './ActivitySpark'

export function RegionPanel() {
  const t = useT()
  const selected = useStore((s) => s.selected)
  const select = useStore((s) => s.select)
  const node = selected ? NODE_BY_ID[selected] : null
  if (!node) return null
  const info = node.info
  const sys = SYSTEMS[info.system]
  const side = node.hemi === 'lh' ? t(UI.left) : node.hemi === 'rh' ? t(UI.right) : null

  const LinkList = ({ items, dir }: { items: Link[]; dir: 'in' | 'out' }) => (
    <ul className="links">
      {items.map((x, i) => {
        const id = resolveKey(x.key, node.hemi)
        const other = REGION_BY_KEY[x.key]
        return (
          <li key={i}>
            <button className="link-btn" disabled={!id} onClick={() => id && select(id)}>
              <span className="dot" style={{ background: other ? SYSTEMS[other.system].color : '#888' }} />
              {dir === 'in' ? '← ' : '→ '}
              {other ? t(other.name) : x.key}
            </button>
            <div className="link-what">{t(x.what)}</div>
          </li>
        )
      })}
    </ul>
  )

  return (
    <aside className="panel region-panel">
      <header>
        <div>
          <div className="region-tags">
            <span className="tag" style={{ borderColor: sys.color, color: sys.color }}>{t(sys.name)}</span>
            <span className="tag">{t(LOBES[info.lobe])}</span>
            {side && <span className="tag">{side}</span>}
            {info.abbr && <span className="tag mono">{info.abbr}</span>}
          </div>
          <h2>{t(info.name)}</h2>
        </div>
        <button className="icon-btn" aria-label={t(UI.close)} onClick={() => select(null)}>×</button>
      </header>
      <ActivitySpark index={node.index} color={sys.color} />
      <section>
        <h3>{t(UI.function)}</h3>
        <p>{t(info.func)}</p>
        {info.note && <p className="note">{t(info.note)}</p>}
      </section>
      {info.inputs.length > 0 && (
        <section>
          <h3>{t(UI.inputs)}</h3>
          <LinkList items={info.inputs} dir="in" />
        </section>
      )}
      {info.outputs.length > 0 && (
        <section>
          <h3>{t(UI.outputs)}</h3>
          <LinkList items={info.outputs} dir="out" />
        </section>
      )}
    </aside>
  )
}
