import { director } from './director'
import { engine } from './engine'
import { signals } from './signals'

/** Frames closer together than this are skipped: caps everything at ~60 fps on 120 Hz displays. */
const MIN_FRAME_MS = 1000 / 60 - 2

type FrameFn = (now: number) => void
const subscribers = new Set<FrameFn>()
let started = false

/**
 * Draw on the shared frame clock, right after the simulation has advanced. Returns the unsubscribe.
 * Every animated canvas uses this instead of its own requestAnimationFrame, so all of them share one
 * capped tick.
 */
export function onFrame(fn: FrameFn): () => void {
  subscribers.add(fn)
  return () => { subscribers.delete(fn) }
}

/**
 * Advance the simulation every frame, independent of which view (3D or schematic) is shown.
 * The Brain ↔ AI pages never show it, so it pauses there.
 */
export function startSimulation() {
  if (started) return
  started = true
  let last = performance.now()
  const frame = (now: number) => {
    requestAnimationFrame(frame)
    const ms = now - last
    if (ms < MIN_FRAME_MS) return
    last = now
    if (!location.hash.startsWith('#/ai')) {
      director.tick(ms)
      engine.tick(ms)
      signals.tick(ms)
    }
    for (const fn of subscribers) fn(now)
  }
  requestAnimationFrame(frame)
}
