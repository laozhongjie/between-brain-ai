import { useProgress } from '@react-three/drei'
import { useState } from 'react'
import { UI, useT } from './i18n'
import { Schematic } from './schematic/Schematic'
import { BrainScene } from './scene/BrainScene'
import { labelLayer } from './scene/Labels'
import { useStore } from './store'
import { Controls } from './ui/Controls'
import { FocusPanel } from './ui/FocusPanel'
import { Narration } from './ui/Narration'
import { OutputPanel } from './ui/OutputPanel'
import { RegionPanel } from './ui/RegionPanel'
import { SystemPicker } from './ui/SystemPicker'
import { Timeline } from './ui/Timeline'

function Loader() {
  const t = useT()
  const { active, progress } = useProgress()
  if (!active) return null
  return <div className="loader">{t(UI.loading)} {progress.toFixed(0)}%</div>
}

export default function App() {
  const t = useT()
  const lang = useStore((s) => s.lang)
  const setLang = useStore((s) => s.setLang)
  const viewMode = useStore((s) => s.viewMode)
  const setViewMode = useStore((s) => s.setViewMode)
  const selected = useStore((s) => s.selected)
  const focus = useStore((s) => s.focus)
  // Small screens: panels are hidden by default and toggled from the top bar
  const [panel, setPanel] = useState<'none' | 'controls' | 'output'>('none')
  const toggle = (p: typeof panel) => setPanel(panel === p ? 'none' : p)

  return (
    <div className={`app show-${panel} view-${viewMode} ${focus ? 'focusing' : ''}`}>
      <div className="stage">
        {viewMode === '3d' ? (
          <>
            <BrainScene />
            <div className="label-layer" ref={(el) => { labelLayer.el = el }} />
            <Loader />
          </>
        ) : (
          <>
            <SystemPicker compact />
            <Schematic />
          </>
        )}
      </div>
      <header className="topbar">
        <div>
          <h1>{t(UI.title)}</h1>
          <div className="subtitle">{t(UI.subtitle)}</div>
        </div>
        <div className="top-actions">
          <div className="seg view-toggle">
            <button className={viewMode === '3d' ? 'on' : ''} onClick={() => setViewMode('3d')}>🧠 <span className="vt-text">{t(UI.view3d)}</span></button>
            <button className={viewMode === 'schematic' ? 'on' : ''} onClick={() => setViewMode('schematic')}>🗺 <span className="vt-text">{t(UI.viewSchematic)}</span></button>
          </div>
          <button className="mobile-toggle" onClick={() => toggle('controls')} aria-label={t(UI.view)}>⚙</button>
          <button className="mobile-toggle" onClick={() => toggle('output')} aria-label={t(UI.output)}>📈</button>
          <div className="seg lang">
            <button className={lang === 'zh' ? 'on' : ''} onClick={() => setLang('zh')}>中文</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </header>
      <div className="left-col">
        {viewMode === '3d' && <Controls />}
        {selected ? <RegionPanel /> : viewMode === '3d' && <SystemPicker />}
      </div>
      <div className="right-col">
        <OutputPanel />
      </div>
      <div className="bottom">
        {focus ? (
          <FocusPanel />
        ) : (
          <>
            <Narration />
            <Timeline />
          </>
        )}
        <footer className="hint">{t(viewMode === '3d' ? UI.hint : UI.hintSchematic)} · {t(UI.disclaimer)}</footer>
      </div>
    </div>
  )
}
