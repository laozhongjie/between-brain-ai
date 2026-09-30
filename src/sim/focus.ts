import { TOUR_BY_ID, idsFor, tourSets } from '../data/tours'
import { useStore } from '../store'
import type { Stage } from './brainState'
import { director, useScenario } from './director'
import { engine } from './engine'
import { signals } from './signals'

let resumePlaying = false

/** View one functional system on its own: pause the day, silence background activity, run step 0. */
export function enterFocus(id: string) {
  const tour = TOUR_BY_ID[id]
  if (!tour) return
  const s = useStore.getState()
  if (!s.focus) resumePlaying = useScenario.getState().playing
  useScenario.setState({ playing: false })
  signals.spontaneousInterval = Infinity
  signals.ambientFilter = tourSets(tour).paths
  useStore.setState({ focus: id, focusStep: 0, selected: null })
  runStep(0)
}

export function setFocusStep(i: number) {
  const { focus } = useStore.getState()
  if (!focus) return
  const n = TOUR_BY_ID[focus].steps.length
  const step = Math.max(0, Math.min(n - 1, i))
  useStore.setState({ focusStep: step })
  runStep(step)
}

export function replayFocusStep() {
  setFocusStep(useStore.getState().focusStep)
}

export function exitFocus() {
  if (!useStore.getState().focus) return
  signals.clear()
  signals.spontaneousInterval = 1300
  signals.ambientFilter = null
  useStore.setState({ focus: null, focusStep: 0 })
  director.seek(director.tl) // restore the day's brain state
  useScenario.setState({ playing: resumePlaying })
}

function runStep(i: number) {
  const { focus } = useStore.getState()
  if (!focus) return
  const steps = TOUR_BY_ID[focus].steps
  const step = steps[i]
  // Stage persists across steps until changed, so stepping backwards restores it too
  let stage: Stage = 'wake'
  for (const s of steps.slice(0, i + 1)) if (s.stage) stage = s.stage
  signals.clear()
  Object.assign(engine.state.targets, { stage, focus: 0.3, exertion: 0, light: 1 })
  for (const f of step.fire ?? []) {
    const [pid, opts] = typeof f === 'string' ? [f, {}] : f
    signals.fire(pid, { strength: 1.2, hopMs: 650, ...opts })
  }
  for (const id of (step.stim ?? []).flatMap(idsFor)) signals.stimulate(id, 3)
}
