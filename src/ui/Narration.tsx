import { useEffect, useRef } from 'react'
import { fmtClock } from '../data/scenario'
import { UI, useT } from '../i18n'
import { DAY_START, useScenario } from '../sim/director'

export function Narration() {
  const t = useT()
  const log = useScenario((s) => s.log)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [log])

  return (
    <div className="panel narration">
      <h3>{t(UI.narration)}</h3>
      <div className="narr-list" ref={ref}>
        {log.slice(-12).map((l, i, arr) => (
          <p key={l.id} className={`${l.event ? 'narr-event' : ''} ${i === arr.length - 1 ? 'latest' : ''}`}>
            {l.event && <span className="narr-time">{fmtClock(DAY_START + l.tl)}</span>}
            {t(l.text)}
          </p>
        ))}
      </div>
    </div>
  )
}
