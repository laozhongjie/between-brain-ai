import { Rich } from '../rich'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SYSTEMS } from '../data/regions'
import { ink } from '../theme'
import { aiLinkForTour } from '../ai/content'
import { TOUR_BY_ID } from '../data/tours'
import { go } from '../route'
import { UI, useT } from '../i18n'
import { exitFocus, replayFocusStep, setFocusStep } from '../sim/focus'
import { useStore } from '../store'
import { Icon } from './Icon'
import { DecodeText } from './DecodeText'

const AUTO_MS = 6500

/** Step-by-step walkthrough of the focused system (replaces narration + timeline). */
export function FocusPanel() {
  const t = useT()
  const focus = useStore((s) => s.focus)
  const step = useStore((s) => s.focusStep)
  const lang = useStore((s) => s.lang)
  const [auto, setAuto] = useState(false)
  const tour = focus ? TOUR_BY_ID[focus] : null
  const n = tour?.steps.length ?? 0

  // On one line (the atlas bar), steps that do not all fit with their titles collapse to their numbers, the
  // current one and a hovered one showing the title. The full width is measured once per tour and language,
  // before paint.
  const stepsRef = useRef<HTMLOListElement>(null)
  const [full, setFull] = useState<{ key: string; width: number } | null>(null)
  const [room, setRoom] = useState(Infinity)
  const fitKey = `${focus}:${lang}`
  const measured = full?.key === fitKey
  useLayoutEffect(() => {
    const ol = stepsRef.current
    if (!ol || measured) return
    setFull({ key: fitKey, width: getComputedStyle(ol).flexWrap === 'nowrap' ? ol.scrollWidth : 0 })
  }, [fitKey, measured])
  useLayoutEffect(() => {
    const ol = stepsRef.current
    if (!ol) return
    let oneLine = getComputedStyle(ol).flexWrap === 'nowrap'
    const ro = new ResizeObserver(() => {
      setRoom(ol.clientWidth)
      // a breakpoint switched between wrapping and one line: measure again
      const now = getComputedStyle(ol).flexWrap === 'nowrap'
      if (now !== oneLine) { oneLine = now; setFull(null) }
    })
    ro.observe(ol)
    return () => ro.disconnect()
  }, [tour])
  const compact = measured && full.width > room + 1

  useEffect(() => {
    if (!auto || !tour) return
    const id = setTimeout(() => (step + 1 < n ? setFocusStep(step + 1) : setAuto(false)), AUTO_MS)
    return () => clearTimeout(id)
  }, [auto, step, n, tour])

  if (!tour) return null
  const color = SYSTEMS[tour.system].color
  const cur = tour.steps[step]

  return (
    <div className="panel focus-panel" style={{ '--c': color, '--ci': ink(color, 0.35) } as React.CSSProperties}>
      <header className="focus-head">
        <div className="focus-name">
          <span className="system-icon"><Icon name={tour.icon} size={17} /></span>
          <strong>{t(tour.name)}</strong>
          <span className="focus-summary"><Rich text={t(tour.summary)} /></span>
        </div>
        <div className="focus-actions">
          <button className="btn-sm" onClick={replayFocusStep}>{t(UI.replay)}</button>
          <button className={`btn-sm ${auto ? 'on' : ''}`} onClick={() => setAuto(!auto)}><Icon name={auto ? 'pause' : 'play'} />{t(UI.autoPlay)}</button>
          {aiLinkForTour(tour.id) && <button className="btn-sm" onClick={() => go(aiLinkForTour(tour.id)!.href)}><Icon name="cpu" />{t(UI.aiLink)}</button>}
          <button className="btn-sm" onClick={exitFocus}><Icon name="x" />{t(UI.exitFocus)}</button>
        </div>
      </header>
      <ol ref={stepsRef} className={`focus-steps ${compact ? 'compact' : ''}`}>
        {tour.steps.map((s, i) => (
          <li key={i}>
            <button className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => setFocusStep(i)}>
              <span className="step-no">{i + 1}</span>
              <span className="step-title"><Rich text={t(s.title)} /></span>
            </button>
          </li>
        ))}
      </ol>
      <div className="focus-body">
        <button className="step-nav" disabled={step === 0} onClick={() => setFocusStep(step - 1)} aria-label="previous">◀</button>
        <div className="focus-text" key={step}>
          <DecodeText className="focus-line" trail={4} text={`${t(UI.step)} ${step + 1} / ${n} · ${t(cur.title)}  ${t(cur.text)}`} />
        </div>
        <button className="step-nav" disabled={step === n - 1} onClick={() => setFocusStep(step + 1)} aria-label="next">▶</button>
      </div>
    </div>
  )
}
