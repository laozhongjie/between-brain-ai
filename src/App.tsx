import { useProgress } from '@react-three/drei'
import { UI, useT } from './i18n'
import { BrainScene } from './scene/BrainScene'
import { labelLayer } from './scene/Labels'
import { useStore } from './store'
import { Controls } from './ui/Controls'
import { Legend } from './ui/Legend'
import { RegionPanel } from './ui/RegionPanel'

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

  return (
    <div className="app">
      <div className="stage">
        <BrainScene />
        <div className="label-layer" ref={(el) => { labelLayer.el = el }} />
        <Loader />
      </div>
      <header className="topbar">
        <div>
          <h1>{t(UI.title)}</h1>
          <div className="subtitle">{t(UI.subtitle)}</div>
        </div>
        <div className="seg lang">
          <button className={lang === 'zh' ? 'on' : ''} onClick={() => setLang('zh')}>中文</button>
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
      </header>
      <div className="left-col">
        <Controls />
        <Legend />
      </div>
      <div className="right-col">
        <RegionPanel />
      </div>
      <footer className="hint">{t(UI.hint)} · {t(UI.disclaimer)}</footer>
    </div>
  )
}
