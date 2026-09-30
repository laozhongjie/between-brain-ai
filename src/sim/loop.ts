import { director } from './director'
import { engine } from './engine'
import { signals } from './signals'

let started = false

/** Advance the simulation every animation frame, independent of which view (3D or schematic) is shown. */
export function startSimulation() {
  if (started) return
  started = true
  let last = performance.now()
  const frame = (now: number) => {
    const ms = now - last
    last = now
    director.tick(ms)
    engine.tick(ms)
    signals.tick(ms)
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
