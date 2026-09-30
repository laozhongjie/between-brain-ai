import { SYSTEMS } from '../data/regions'
import { TOURS } from '../data/tours'
import { UI, useT } from '../i18n'
import { enterFocus, exitFocus } from '../sim/focus'
import { useStore } from '../store'

/** List of functional systems; clicking one isolates it (focus mode). */
export function SystemPicker({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const focus = useStore((s) => s.focus)
  return (
    <div className={`panel systems ${compact ? 'compact' : ''}`}>
      {compact ? <h3 title={t(UI.systemsHint)}>{t(UI.systems)}</h3> : (
        <>
          <h3>{t(UI.systems)}</h3>
          <p className="systems-hint">{t(UI.systemsHint)}</p>
        </>
      )}
      <div className="system-grid">
        {TOURS.map((tour) => (
          <button
            key={tour.id}
            className={`system-btn ${focus === tour.id ? 'on' : ''}`}
            style={{ '--c': SYSTEMS[tour.system].color } as React.CSSProperties}
            onClick={() => (focus === tour.id ? exitFocus() : enterFocus(tour.id))}
          >
            <span className="system-icon">{tour.icon}</span>
            {t(tour.name)}
          </button>
        ))}
      </div>
    </div>
  )
}
