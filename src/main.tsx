import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts (bundled): Inter for Latin text, MiSans for Chinese, JetBrains Mono for numbers / tags / code
import '@fontsource-variable/inter'
import 'misans-vf-4web/dist/result.css'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App.tsx'
import { startSimulation } from './sim/loop'

startSimulation()

// Glass surfaces light up around the cursor: publish its position relative to the hovered surface
const GLASS = '.panel, .rung, .col, .lab-section, .system-btn'
document.addEventListener('pointermove', (e) => {
  const el = (e.target as Element | null)?.closest?.(GLASS) as HTMLElement | null
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}, { passive: true })

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
