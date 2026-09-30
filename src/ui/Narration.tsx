import { Rich } from '../rich'
import { useEffect, useRef } from 'react'
import { fmtClock } from '../data/scenario'
import { UI, useT } from '../i18n'
import { DAY_START, useScenario } from '../sim/director'
import { DecodeText } from './DecodeText'

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
        {log.slice(-40).map((l, i, arr) => (
          <p key={l.id} className={`${l.event ? 'narr-event' : ''} ${i === arr.length - 1 ? 'latest' : ''}`}>
            {l.event && <span className="narr-time">{fmtClock(DAY_START + l.tl)}</span>}
            {/* event titles decode in; plain lines rise in (CSS) */}
            {l.event && !t(l.text).includes('$') ? <DecodeText text={t(l.text)} /> : <Rich text={t(l.text)} />}
          </p>
        ))}
      </div>
    </div>
  )
}
