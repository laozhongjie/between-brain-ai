import { useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { UI, useT } from '../i18n'
import { useScenario } from '../sim/director'
import { engine } from '../sim/engine'
import { Body } from './Body'
import { EEG } from './EEG'
import { useTicker } from './useTicker'
import { Icon } from './Icon'

const LEVELS = [
  ['NE', '#f2b866'],
  ['DA', '#ff8fa8'],
  ['HT', '#5ee0b5'],
  ['ACh', '#8ab4ff'],
  ['cortisol', '#ff9a8b'],
  ['melatonin', '#a9b4f5'],
  ['adenosine', '#9aa6b8'],
] as const

const TIP_W = 260

/**
 * Where a level's explanation goes: beside the panel on the side with room (the panel sits in the left or
 * the right column), or under the row when neither side has room. Fixed to the viewport and portalled to
 * the body, since the panel's blur and scrolling would clip it.
 */
function tipPlace(row: HTMLElement): CSSProperties {
  const r = row.getBoundingClientRect()
  const panel = (row.closest('.panel') ?? row).getBoundingClientRect()
  const gap = 12
  const top = Math.min(Math.max(r.top + r.height / 2, 90), innerHeight - 90)
  if (innerWidth - panel.right >= TIP_W + gap * 2) return { left: panel.right + gap, top, '--dx': '-6px' } as CSSProperties
  if (panel.left >= TIP_W + gap * 2) return { left: panel.left - gap - TIP_W, top, '--dx': '6px' } as CSSProperties
  return { left: Math.max(gap, Math.min(r.left, innerWidth - TIP_W - gap)), top: r.bottom + 6, transform: 'none' }
}

export function OutputPanel({ onClose }: { onClose?: () => void }) {
  const t = useT()
  useTicker(100)
  const [tip, setTip] = useState<{ k: (typeof LEVELS)[number][0]; color: string; style: CSSProperties } | null>(null)
  const { speech, action, body } = useScenario()
  const st = engine.state
  const stage = st.stage
  const stageLabel =
    stage === 'nrem' ? UI.stageNrem : stage === 'rem' ? UI.stageRem : st.focus > 0.6 ? UI.stageWakeFocus : UI.stageWakeRelaxed
  const hr = st.vitals.heartRate

  return (
    <aside className="panel output-panel">
      {onClose && <button className="icon-btn drawer-close" onClick={onClose} aria-label={t(UI.close)}><Icon name="x" /></button>}
      <header className="output-head">
        <h3>{t(UI.output)}</h3>
        <span className={`stage-chip stage-${stage}`}>{t(stageLabel)}</span>
      </header>
      <div className="eeg-wrap">
        <span className="spark-label">{t(UI.eeg)}</span>
        <EEG />
      </div>
      <div className="body-row">
        <div className="body-box">
          <Body cued={body} heartRate={hr} />
          {speech && <div className="speech">{t({ zh: `「${speech.zh}」`, en: `“${speech.en}”` })}</div>}
        </div>
        <div className="vitals">
          <div className="vital">
            <span className="vital-label" style={{ '--beat': `${(60 / Math.max(40, hr)).toFixed(2)}s` } as React.CSSProperties}><Icon name="heart" className="beat" />{t(UI.heartRate)}</span>
            <span className="vital-value">{hr.toFixed(0)}<small> bpm</small></span>
          </div>
          <div className="vital">
            <span className="vital-label"><Icon name="wind" />{t(UI.breath)}</span>
            <span className="vital-value">{st.vitals.breathRate.toFixed(0)}<small> {t(UI.perMin)}</small></span>
          </div>
          {action && <div className="action">{t(action)}</div>}
        </div>
      </div>
      <h3>{t(UI.modulators)}</h3>
      <ul className="levels">
        {LEVELS.map(([k, color]) => (
          <li
            key={k} style={{ '--c': color } as React.CSSProperties} tabIndex={0} aria-describedby={tip?.k === k ? 'level-tip' : undefined}
            onMouseEnter={(e) => setTip({ k, color, style: tipPlace(e.currentTarget) })} onMouseLeave={() => setTip(null)}
            onFocus={(e) => setTip({ k, color, style: tipPlace(e.currentTarget) })} onBlur={() => setTip(null)}
          >
            <span className={k === 'adenosine' ? 'adenosine-label' : undefined}>{t(UI[k])}</span>
            <div className="bar"><div style={{ width: `${(st.levels[k] * 100).toFixed(0)}%` }} /></div>
          </li>
        ))}
      </ul>
      {tip && createPortal(
        <div id="level-tip" role="tooltip" key={tip.k} className="level-tip" style={{ ...tip.style, '--c': tip.color } as CSSProperties}>
          <strong>{t(UI[tip.k]).replace('\n', ' ')}</strong>
          <p>{t(UI[`${tip.k}Info`])}</p>
        </div>,
        document.body,
      )}
    </aside>
  )
}
