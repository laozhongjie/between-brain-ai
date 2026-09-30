import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts (bundled): Geist for Latin/digits, HarmonyOS Sans SC for Chinese body text, Noto Serif SC for headings
import '@fontsource-variable/geist'
import '../node_modules/harmonyos-sans-sc-webfont-splitted/dist/Regular.css'
import '../node_modules/harmonyos-sans-sc-webfont-splitted/dist/Medium.css'
import '../node_modules/harmonyos-sans-sc-webfont-splitted/dist/Bold.css'
import '@fontsource/noto-serif-sc/600.css'
import '@fontsource/noto-serif-sc/700.css'
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
