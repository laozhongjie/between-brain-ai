import type { MechEntry } from '../../types'
import { ATTRACTORS } from './attractors'
import { CONSOLIDATION } from './consolidation'
import { DENDRITES } from './dendrites'
import { NEURON_MODELS } from './neuron-models'
import { NOISE } from './noise'
import { SHORT_TERM_PLASTICITY } from './short-term-plasticity'
import { SPIKES } from './spikes'
import { STDP } from './stdp'
import { SYNAPSE_WEIGHT } from './synapse-weight'
import { THREE_FACTOR } from './three-factor'

/** Mechanism entries rewritten in the lean template, keyed by card id. The rest still show their old card. */
export const MECH_CONTENT: Record<string, MechEntry> = {
  'synapse-weight': SYNAPSE_WEIGHT,
  'short-term-plasticity': SHORT_TERM_PLASTICITY,
  stdp: STDP,
  'three-factor': THREE_FACTOR,
  consolidation: CONSOLIDATION,
  'neuron-models': NEURON_MODELS,
  dendrites: DENDRITES,
  spikes: SPIKES,
  noise: NOISE,
  attractors: ATTRACTORS,
}
