import { useProgress } from '@react-three/drei'
import { Suspense, lazy, useEffect, useState, useSyncExternalStore } from 'react'
import { TAGLINES, UI, useT } from './i18n'
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
import { DecodeText } from './ui/DecodeText'
import { Icon } from './ui/Icon'

// The Brain ↔ AI section (with KaTeX) loads on demand so the atlas starts faster
const AiSection = lazy(() => import('./ai/pages/AiSection').then((m) => ({ default: m.AiSection })))
const Home = lazy(() => import('./home/Home').then((m) => ({ default: m.Home })))

/** Brand mark: a disc split by a thin gap into two halves (brain | AI). White, no background. */
function Logo() {
  return (
    <svg className="logo" viewBox="0 0 32 32" aria-hidden>
      <path d="M14.35 1.091026A15 15 0 0 0 14.35 30.908974Z" fill="#f5f5f5" />
      <path d="M17.65 1.091026A15 15 0 0 1 17.65 30.908974Z" fill="#f5f5f5" />
    </svg>
  )
}

/** Rotating brand taglines, each decoding in. */
function Tagline() {
  const t = useT()
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % TAGLINES.length), 4200)
    return () => clearInterval(id)
  }, [])
  return <DecodeText className="tagline" text={t(TAGLINES[i])} />
}

/** Desktop layout breakpoint, the same as the `min-width: 1101px` rules in index.css. */
const WIDE = '(min-width: 1101px)'
const subscribeWide = (cb: () => void) => {
  const mq = matchMedia(WIDE)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useWide = () => useSyncExternalStore(subscribeWide, () => matchMedia(WIDE).matches)

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
  // Desktop 3D: body & outputs join the narration on the left, the view controls take the right column
  const swap = useWide() && viewMode === '3d'
  // #/ → landing page, #/atlas → the atlas, #/ai/… → the Brain ↔ AI section
  const section = route[0] === 'ai' ? 'ai' : route[0] === 'atlas' ? 'atlas' : 'home'

  const topbar = (
    <header className="topbar">
      <div className="brand">
        <h1 onClick={() => go('/')} title="BETWEEN"><Logo /><span className="wordmark">{t(UI.title)}</span></h1>
        <nav className="nav-tabs" aria-label={t({ zh: '主导航', en: 'Main navigation' })}>
          <button className={section === 'atlas' ? 'on' : ''} aria-current={section === 'atlas' ? 'page' : undefined} onClick={() => go('/atlas')}>{t(UI.navAtlas)}</button>
          <button className={section === 'ai' ? 'on' : ''} aria-current={section === 'ai' ? 'page' : undefined} onClick={() => go('/ai')}>{t(UI.navAi)}</button>
        </nav>
        {/* after the nav so its changing length never moves the tabs */}
        <Tagline />
      </div>
      <div className="top-actions">
        {section === 'atlas' && (
          <>
            <div className="seg view-toggle">
              <button className={viewMode === '3d' ? 'on' : ''} onClick={() => setViewMode('3d')}>{t(UI.view3d)}</button>
              <button className={viewMode === 'schematic' ? 'on' : ''} onClick={() => setViewMode('schematic')}>{t(UI.viewSchematic)}</button>
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

  if (section === 'home') {
    return (
      <Suspense fallback={<div className="loader">…</div>}>
        <Home />
      </Suspense>
    )
  }

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
    <div className={`app atlas show-${panel} view-${viewMode} ${focus ? 'focusing' : ''} ${selected ? 'selecting' : ''}`}>
      <div className="stage">
        {viewMode === '3d' ? (
          <>
            <BrainScene />
            <div className="label-layer" ref={(el) => { labelLayer.el = el }} />
            <Loader />
            <SystemPicker compact />
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
        {/* the narration takes the left column, mirroring the output panel; in 3D it shares it with the
            output panel (desktop) or the view controls (small screens, toggled from the top bar) */}
        {swap ? <OutputPanel /> : viewMode === '3d' && <Controls />}
        {selected ? <RegionPanel /> : <Narration />}
      </div>
      <div className="right-col">
        {swap ? <Controls /> : <OutputPanel />}
      </div>
      <div className="bottom">
        {focus ? <FocusPanel /> : <Timeline />}
        <footer className="hint">{t(viewMode === '3d' ? UI.hint : UI.hintSchematic)} · {t(UI.disclaimer)}</footer>
      </div>
    </div>
  )
}
