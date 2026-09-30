import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts (bundled, OFL): Nunito for Latin/digits, LXGW WenKai Screen (GB glyphs) for Chinese
import '@fontsource-variable/nunito'
import 'lxgw-wenkai-screen-webfont/lxgwwenkaigbscreen.css'
import './index.css'
import App from './App.tsx'
import { startSimulation } from './sim/loop'

startSimulation()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (import.meta.env.DEV) {
  // Debug handle for manual testing in the console / headless checks
  Promise.all([import('./sim/engine'), import('./sim/signals')]).then(([e, s]) => {
    Object.assign(window, { __brain: { engine: e.engine, signals: s.signals } })
  })
}
