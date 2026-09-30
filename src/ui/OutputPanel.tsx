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

export function OutputPanel() {
  const t = useT()
  useTicker(100)
  const { speech, action, body } = useScenario()
  const st = engine.state
  const stage = st.stage
  const stageLabel =
    stage === 'nrem' ? UI.stageNrem : stage === 'rem' ? UI.stageRem : st.focus > 0.6 ? UI.stageWakeFocus : UI.stageWakeRelaxed
  const hr = st.vitals.heartRate

  return (
    <aside className="panel output-panel">
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
          {speech && <div className="speech">“{t(speech)}”</div>}
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
          <li key={k} style={{ '--c': color } as React.CSSProperties}>
            <span>{t(UI[k])}</span>
            <div className="bar"><div style={{ width: `${(st.levels[k] * 100).toFixed(0)}%` }} /></div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
