import { UI, useT } from '../i18n'
import { useStore, type ClipAxis, type ViewState } from '../store'

type BoolKey = { [K in keyof ViewState]: ViewState[K] extends boolean ? K : never }[keyof ViewState]

const LAYERS: [BoolKey, keyof typeof UI][] = [
  ['showSubcortex', 'layerSubcortex'],
  ['showNuclei', 'layerNuclei'],
  ['showBody', 'layerBody'],
  ['showLabels', 'layerLabels'],
  ['showPathways', 'layerPathways'],
  ['showPulses', 'layerPulses'],
]
const CLIPS: [ClipAxis, keyof typeof UI][] = [
  ['none', 'clipNone'],
  ['sagittal', 'clipSagittal'],
  ['coronal', 'clipCoronal'],
  ['axial', 'clipAxial'],
]

export function Controls() {
  const t = useT()
  const view = useStore((s) => s.view)
  const setView = useStore((s) => s.setView)
  const resetView = useStore((s) => s.resetView)

  return (
    <div className="panel controls">
      <h3>{t(UI.view)}</h3>
      <label className="row">
        <span>{t(UI.cortexOpacity)}</span>
        <input type="range" min={0} max={1} step={0.01} value={view.cortexOpacity}
          onChange={(e) => setView({ cortexOpacity: +e.target.value })} />
      </label>
      <label className="row">
        <span>{t(UI.explode)}</span>
        <input type="range" min={0} max={0.6} step={0.01} value={view.explode}
          onChange={(e) => setView({ explode: +e.target.value })} />
      </label>
      <div className="row">
        <span>{t(UI.clip)}</span>
        <div className="seg">
          {CLIPS.map(([axis, label]) => (
            <button key={axis} className={view.clipAxis === axis ? 'on' : ''} onClick={() => setView({ clipAxis: axis })}>
              {t(UI[label])}
            </button>
          ))}
        </div>
      </div>
      {view.clipAxis !== 'none' && (
        <label className="row">
          <span />
          <input type="range" min={-1} max={1} step={0.01} value={view.clipOffset}
            onChange={(e) => setView({ clipOffset: +e.target.value })} />
        </label>
      )}
      <div className="row">
        <span>{t(UI.colorMode)}</span>
        <div className="seg">
          <button className={view.colorMode === 'anatomy' ? 'on' : ''} onClick={() => setView({ colorMode: 'anatomy' })}>{t(UI.colorAnatomy)}</button>
          <button className={view.colorMode === 'system' ? 'on' : ''} onClick={() => setView({ colorMode: 'system' })}>{t(UI.colorSystem)}</button>
        </div>
      </div>
      <h3>{t(UI.layers)}</h3>
      <div className="checks">
        {LAYERS.map(([key, label]) => (
          <label key={key}>
            <input type="checkbox" checked={view[key]} onChange={(e) => setView({ [key]: e.target.checked })} />
            {t(UI[label])}
          </label>
        ))}
      </div>
      <button className="btn" onClick={resetView}>{t(UI.resetView)}</button>
    </div>
  )
}
