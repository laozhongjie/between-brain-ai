import { useProgress } from '@react-three/drei'
import { Suspense, lazy, useState } from 'react'
import { UI, useT } from './i18n'
import { go, useRoute } from './route'
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
import { Icon } from './ui/Icon'

// The Brain ↔ AI section (with KaTeX) loads on demand so the atlas starts faster
const AiSection = lazy(() => import('./ai/pages/AiSection').then((m) => ({ default: m.AiSection })))

/** Brand mark: a ring with an orbit, in the accent gradient. */
function Logo() {
  return (
    <svg className="logo" viewBox="0 0 32 32" fill="none" aria-hidden>
      <defs><linearGradient id="logo-g" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#5eead4" /><stop offset="1" stopColor="#60a5fa" /></linearGradient></defs>
      <circle cx="16" cy="16" r="14.5" stroke="url(#logo-g)" strokeWidth="1.2" />
      <ellipse cx="16" cy="16" rx="14.5" ry="5.5" stroke="rgba(125,211,252,0.45)" transform="rotate(-30 16 16)" />
      <circle cx="16" cy="16" r="3" fill="#7dd3fc" />
    </svg>
  )
}

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
  const route = useRoute()
  const section = route[0] === 'ai' ? 'ai' : 'atlas'

  const topbar = (
    <header className="topbar">
      <div className="brand">
        <h1><Logo />{t(UI.title)}</h1>
        <div className="seg nav-tabs">
          <button className={section === 'atlas' ? 'on' : ''} onClick={() => go('/')}><Icon name="brain" size={14} />{t(UI.navAtlas)}</button>
          <button className={section === 'ai' ? 'on' : ''} onClick={() => go('/ai')}><Icon name="cpu" size={14} />{t(UI.navAi)}</button>
        </div>
      </div>
      <div className="top-actions">
        {section === 'atlas' && (
          <>
            <div className="seg view-toggle">
              <button className={viewMode === '3d' ? 'on' : ''} onClick={() => setViewMode('3d')}><Icon name="box" size={14} /><span className="vt-text">{t(UI.view3d)}</span></button>
              <button className={viewMode === 'schematic' ? 'on' : ''} onClick={() => setViewMode('schematic')}><Icon name="workflow" size={14} /><span className="vt-text">{t(UI.viewSchematic)}</span></button>
            </div>
            <button className="mobile-toggle" onClick={() => toggle('controls')} aria-label={t(UI.view)}><Icon name="sliders" /></button>
            <button className="mobile-toggle" onClick={() => toggle('output')} aria-label={t(UI.output)}><Icon name="activity" /></button>
          </>
        )}
        <div className="seg lang">
          <button className={lang === 'zh' ? 'on' : ''} onClick={() => setLang('zh')}>中文</button>
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
      </div>
    </header>
  )

  if (section === 'ai') {
    return (
      <div className="app ai-mode">
        {topbar}
        <Suspense fallback={<div className="loader">…</div>}>
          <AiSection route={route.slice(1)} />
        </Suspense>
      </div>
    )
  }

  return (
    <div className={`app show-${panel} view-${viewMode} ${focus ? 'focusing' : ''} ${selected ? 'selecting' : ''}`}>
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
      {topbar}
      <div className="left-col">
        {viewMode === '3d' && <Controls />}
        {/* Schematic view: the narration takes the left column, mirroring the output panel */}
        {selected ? <RegionPanel /> : viewMode === '3d' ? <SystemPicker /> : !focus && <Narration />}
      </div>
      <div className="right-col">
        <OutputPanel />
      </div>
      <div className="bottom">
        {focus ? (
          <FocusPanel />
        ) : (
          <>
            {viewMode === '3d' && <Narration />}
            <Timeline />
          </>
        )}
        <footer className="hint">{t(viewMode === '3d' ? UI.hint : UI.hintSchematic)} · {t(UI.disclaimer)}</footer>
      </div>
    </div>
  )
}
