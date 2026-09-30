import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

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
