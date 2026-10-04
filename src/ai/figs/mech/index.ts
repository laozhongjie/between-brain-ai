import type { MechFigs } from '../types'
import { ATTRACTOR_FIGS } from './attractors'
import { CONSOLIDATION_FIGS, STDP_FIGS, STP_FIGS, SYNAPSE_WEIGHT_FIGS, THREE_FACTOR_FIGS } from './synapses'

/** Figures of the mechanism entries, keyed by card id. */
export const MECH_FIGS: Record<string, MechFigs> = {
  'synapse-weight': SYNAPSE_WEIGHT_FIGS,
  'short-term-plasticity': STP_FIGS,
  stdp: STDP_FIGS,
  'three-factor': THREE_FACTOR_FIGS,
  consolidation: CONSOLIDATION_FIGS,
  attractors: ATTRACTOR_FIGS,
}
