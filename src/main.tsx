import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts (bundled): Geist for Latin text, Noto Sans SC for Chinese, Geist Mono for numbers / tags / code
import '@fontsource-variable/geist'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource-variable/geist-mono'
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
