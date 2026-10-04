import type { MechEntry } from '../../types'
import { ATTRACTORS } from './attractors'

/** Mechanism entries rewritten in the lean template, keyed by card id. The rest still show their old card. */
export const MECH_CONTENT: Record<string, MechEntry> = {
  attractors: ATTRACTORS,
}
