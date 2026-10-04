import type { MechEntry } from '../../types'
import { ATTRACTORS } from './attractors'
import { CONSOLIDATION } from './consolidation'
import { DENDRITES } from './dendrites'
import { EI_CELLTYPES } from './ei-celltypes'
import { ENERGY_SPARSITY } from './energy-sparsity'
import { EXPANSION } from './expansion'
import { FEEDBACK_PREDICTIVE } from './feedback-predictive'
import { GLIA } from './glia'
import { NEURON_MODELS } from './neuron-models'
import { NOISE } from './noise'
import { NORMALIZATION } from './normalization'
import { SHORT_TERM_PLASTICITY } from './short-term-plasticity'
import { SPIKES } from './spikes'
import { STDP } from './stdp'
import { STRUCTURAL_PLASTICITY } from './structural-plasticity'
import { SYNAPSE_WEIGHT } from './synapse-weight'
import { THREE_FACTOR } from './three-factor'

/** Mechanism entries in the lean template, keyed by card id. */
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
  'ei-celltypes': EI_CELLTYPES,
  normalization: NORMALIZATION,
  attractors: ATTRACTORS,
  'feedback-predictive': FEEDBACK_PREDICTIVE,
  expansion: EXPANSION,
  'energy-sparsity': ENERGY_SPARSITY,
  'structural-plasticity': STRUCTURAL_PLASTICITY,
  glia: GLIA,
}
