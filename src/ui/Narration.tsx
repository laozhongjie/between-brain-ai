import { Rich } from '../rich'
import { useEffect, useRef, useState } from 'react'
import { fmtClock } from '../data/scenario'
import { UI, useT } from '../i18n'
import { DAY_START, useScenario } from '../sim/director'
import { DecodeText } from './DecodeText'

export function Narration() {
  const t = useT()
  const log = useScenario((s) => s.log)
  const ref = useRef<HTMLDivElement>(null)
  // Lines already in the log when the panel mounts appear at once; only new lines type in
  const [firstNew] = useState(() => (log.at(-1)?.id ?? 0) + 1)
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [log])
  // Keep the newest line in view while it types (it grows after the log changed)
  useEffect(() => {
    const el = ref.current!
    const mo = new MutationObserver(() => {
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 80) el.scrollTop = el.scrollHeight
    })
    mo.observe(el, { childList: true, subtree: true, characterData: true })
    return () => mo.disconnect()
  }, [])

  return (
    <div className="panel narration">
      <h3>{t(UI.narration)}</h3>
      <div className="narr-list" ref={ref}>
        {log.slice(-40).map((l, i, arr) => (
          <p key={l.id} className={`${l.event ? 'narr-event' : ''} ${i === arr.length - 1 ? 'latest' : ''}`}>
            {l.event && <span className="narr-time">{fmtClock(DAY_START + l.tl)}</span>}
            {/* event titles decode in; narration lines type out with a short trail of noise. Lines with
                math keep their KaTeX rendering and only rise in (CSS). */}
            {t(l.text).includes('$') ? (
              <Rich text={t(l.text)} />
            ) : l.event ? (
              <DecodeText text={t(l.text)} animate={l.id >= firstNew} />
            ) : (
              <DecodeText text={t(l.text)} perChar={26} trail={4} animate={l.id >= firstNew} />
            )}
          </p>
        ))}
      </div>
    </div>
  )
}
