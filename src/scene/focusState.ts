import { TOUR_BY_ID, stepSets, tourSets, type TourSets } from '../data/tours'
import { useStore } from '../store'

export interface FocusSets {
  all: TourSets
  step: TourSets
}

let key = ''
let cached: FocusSets | null = null

/** Node/pathway sets of the focused system and its current step (cached). */
export function currentFocus(): FocusSets | null {
  const { focus, focusStep } = useStore.getState()
  if (!focus) return null
  const k = `${focus}:${focusStep}`
  if (k !== key) {
    const t = TOUR_BY_ID[focus]
    cached = { all: tourSets(t), step: stepSets(t.steps[focusStep]) }
    key = k
  }
  return cached
}
