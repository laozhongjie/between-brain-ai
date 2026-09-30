import { useEffect, useState } from 'react'
import { SYSTEMS } from '../data/regions'
import { ink } from '../theme'
import { cardForTour } from '../ai/content'
import { TOUR_BY_ID } from '../data/tours'
import { go } from '../route'
import { UI, useT } from '../i18n'
import { exitFocus, replayFocusStep, setFocusStep } from '../sim/focus'
import { useStore } from '../store'

const AUTO_MS = 6500

/** Step-by-step walkthrough of the focused system (replaces narration + timeline). */
export function FocusPanel() {
  const t = useT()
  const focus = useStore((s) => s.focus)
  const step = useStore((s) => s.focusStep)
  const [auto, setAuto] = useState(false)
  const tour = focus ? TOUR_BY_ID[focus] : null
  const n = tour?.steps.length ?? 0

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
          <span className="system-icon">{tour.icon}</span>
          <strong>{t(tour.name)}</strong>
          <span className="focus-summary">{t(tour.summary)}</span>
        </div>
        <div className="focus-actions">
          <button className="btn-sm" onClick={replayFocusStep}>⟳ {t(UI.replay)}</button>
          <button className={`btn-sm ${auto ? 'on' : ''}`} onClick={() => setAuto(!auto)}>{auto ? '❚❚' : '▶'} {t(UI.autoPlay)}</button>
          {cardForTour(tour.id) && <button className="btn-sm" onClick={() => go(`/ai/card/${cardForTour(tour.id)!.id}`)}>🤖 {t(UI.aiLink)}</button>}
          <button className="btn-sm" onClick={exitFocus}>✕ {t(UI.exitFocus)}</button>
        </div>
      </header>
      <ol className="focus-steps">
        {tour.steps.map((s, i) => (
          <li key={i}>
            <button className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => setFocusStep(i)}>
              <span className="step-no">{i + 1}</span>
              {t(s.title)}
            </button>
          </li>
        ))}
      </ol>
      <div className="focus-body">
        <button className="step-nav" disabled={step === 0} onClick={() => setFocusStep(step - 1)} aria-label="previous">◀</button>
        <div className="focus-text">
          <div className="focus-step-title">
            {t(UI.step)} {step + 1} / {n} · {t(cur.title)}
          </div>
          <p>{t(cur.text)}</p>
        </div>
        <button className="step-nav" disabled={step === n - 1} onClick={() => setFocusStep(step + 1)} aria-label="next">▶</button>
      </div>
    </div>
  )
}
