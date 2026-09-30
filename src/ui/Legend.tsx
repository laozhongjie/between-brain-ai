import { SYSTEMS } from '../data/regions'
import { UI, useT } from '../i18n'

export function Legend() {
  const t = useT()
  return (
    <div className="panel legend">
      <h3>{t(UI.legend)}</h3>
      <ul>
        {Object.entries(SYSTEMS)
          .filter(([id]) => id !== 'structure')
          .map(([id, s]) => (
            <li key={id}>
              <span className="dot" style={{ background: s.color }} />
              {t(s.name)}
            </li>
          ))}
      </ul>
    </div>
  )
}
