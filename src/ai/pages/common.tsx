import { CORR_INFO, EVIDENCE_INFO, LEVEL_COLORS } from '../content'
import { REF_BY_ID } from '../content/refs'
import { UI, useT } from '../../i18n'
import type { Corr, Evidence } from '../types'

/** Ordinal level bar (0–3) with a text label, so meaning never relies on colour alone. */
export function LevelBar({ level, label }: { level: number; label: string }) {
  return (
    <span className="level">
      <span className="level-bar" aria-hidden>
        {[1, 2, 3].map((i) => (
          <i key={i} style={{ background: i <= level ? LEVEL_COLORS[level] : 'transparent' }} className={i <= level ? 'on' : ''} />
        ))}
      </span>
      {label}
    </span>
  )
}

export function CorrBadge({ corr }: { corr: Corr }) {
  const t = useT()
  const c = CORR_INFO[corr]
  return <span className="badge" title={t(c.desc)}><LevelBar level={c.level} label={t(c.name)} /></span>
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
        {(Object.keys(CORR_INFO) as Corr[]).map((k) => (
          <span key={k} className="legend-item"><CorrBadge corr={k} /> <small>{t(CORR_INFO[k].desc)}</small></span>
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
