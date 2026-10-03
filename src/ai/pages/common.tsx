import { EVIDENCE_INFO, KIND_INFO, NO_KIND } from '../content'
import { REF_BY_ID } from '../content/refs'
import { UI, useT } from '../../i18n'
import { ComparisonText } from '../../ui/ComparisonText'
import { Icon } from '../../ui/Icon'
import type { Evidence, Kind } from '../types'

/** Ordinal level bar (0–3) with a text label, so meaning never relies on colour alone. */
/** Correspondence types of a card: in which sense the two sides are comparable. */
export function KindTags({ kinds }: { kinds: Kind[] }) {
  const t = useT()
  if (!kinds.length) return <span className="badge kind none" title={t(NO_KIND.desc)}>{t(NO_KIND.name)}</span>
  return (
    <>
      {kinds.map((k) => <span key={k} className="badge kind" title={t(KIND_INFO[k].desc)}>{t(KIND_INFO[k].name)}</span>)}
    </>
  )
}

export function EvidenceBadge({ ev }: { ev: Evidence }) {
  const t = useT()
  const e = EVIDENCE_INFO[ev]
  return <span className="badge ev">{e.icon} {t(e.name)}</span>
}

export function RefList({ ids }: { ids: string[] }) {
  return (
    <ol className="refs">
      {ids.map((id) => {
        const r = REF_BY_ID[id]
        return (
          <li key={id}>
            {r.authors} ({r.year}). <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>. <em>{r.venue}</em>.
          </li>
        )
      })}
    </ol>
  )
}

export function Legend() {
  const t = useT()
  return (
    <div className="ai-legend">
      <div>
        <strong>{t(UI.correspondence)}</strong>
        {(Object.keys(KIND_INFO) as Kind[]).map((k) => (
          <span key={k} className="legend-item"><KindTags kinds={[k]} /> <small>{t(KIND_INFO[k].desc)}</small></span>
        ))}
      </div>
      <div>
        <strong>{t(UI.evidence)}</strong>
        {(Object.keys(EVIDENCE_INFO) as Evidence[]).map((k) => (
          <span key={k} className="legend-item"><EvidenceBadge ev={k} /></span>
        ))}
      </div>
    </div>
  )
}

/**
 * Previous / next link at the foot of a page. Every one has the same shape (a small label over a one-line
 * title, a chevron on the outer side), so the pair is always equally tall.
 */
export function PagerLink({ dir, label, title, onClick }: { dir: 'prev' | 'next'; label: string; title: string; onClick: () => void }) {
  const t = useT()
  return (
    <button className={`pager-link ${dir}`} onClick={onClick} title={title} aria-label={`${t(dir === 'prev' ? UI.previousCard : UI.nextCard)}: ${title}`}>
      <Icon name="chevron" size={18} className="pager-chev" />
      <span className="pager-text">
        <small className="pager-layer">{label}</small>
        <span className="pager-title"><ComparisonText text={title} /></span>
      </span>
    </button>
  )
}
