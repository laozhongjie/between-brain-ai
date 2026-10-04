import type { MechFigs } from '../types'
import { ATTRACTOR_FIGS } from './attractors'

/** Figures of the mechanism entries, keyed by card id. */
export const MECH_FIGS: Record<string, MechFigs> = {
  attractors: ATTRACTOR_FIGS,
}
