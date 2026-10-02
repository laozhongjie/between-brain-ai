import type { Bi } from '../data/types'

/**
 * In which sense the two sides can be compared (a card may have several, or none):
 *  behavior       – task performance
 *  representation – internal representations
 *  algorithm      – computational steps
 *  math           – the same or a similar mathematical form
 *  implementation – physical implementation or resources
 */
export type Kind = 'behavior' | 'representation' | 'algorithm' | 'math' | 'implementation'

/** How settled the neuroscience is. */
export type Evidence = 'established' | 'debated' | 'speculative'

export type Layer = 1 | 2 | 3 | 4 | 5

/** One of the nine functional domains: the main directory. */
export interface AtlasDomain {
  id: string
  name: Bi
  desc: Bi
  /** topic ids */
  topics: string[]
}

/** A functional topic: one capability compared between a specific biological and computational system. */
export interface Topic {
  /** url slug */
  id: string
  /** editorial code from the plan, e.g. F12 */
  code: string
  name: Bi
  systems: {
    biological: Bi
    computational: Bi
  }
  /** old card shown until the topic has its own page */
  legacy?: string
  /** atlas tour of the matching brain system */
  tour?: string
  /** related mechanism groups */
  mechanisms: string[]
}

/** Spatial scale of a mechanism group. */
export type Scale = 'synapse' | 'neuron' | 'circuit' | 'cross'

/** A group of mechanism entries (the old layer 1 to 3 cards) in the scale index. */
export interface MechGroup {
  id: string
  name: Bi
  scale: Scale
  cards: string[]
}

/** A cross-domain topic page. */
export interface CrossTopic {
  id: string
  name: Bi
  desc: Bi
  /** where it opens: an old card for now, a route of its own, or nothing yet */
  legacy?: string
  route?: string
}

export interface Formula {
  tex: string
  caption: Bi
}

export interface Ref {
  id: string
  authors: string
  year: number
  title: string
  venue: string
  /** DOI or arXiv link (checked by scripts/check-refs.mjs) */
  url: string
}

export interface ComparisonRow {
  dimension: Bi
  brain: Bi
  ai: Bi
}

export interface CapabilityComparison extends ComparisonRow {
  gap: Bi
}

export interface ReviewCard {
  systems: {
    biological: Bi
    computational: Bi
  }
  thesis: Bi
  capabilities: CapabilityComparison[]
  state: ComparisonRow[]
  timescale: ComparisonRow[]
  limits: {
    biological: Bi
    computational: Bi
    evidence: Bi
  }
}

export interface DesignExperiment {
  title: Bi
  change: Bi
  test: Bi
  tradeoff: Bi
}

export interface ArchitectureStep {
  label: Bi
  detail: Bi
}

export interface ArchitectureTrack {
  summary: Bi
  steps: ArchitectureStep[]
}

export interface ArchitectureSection {
  brain: ArchitectureTrack
  ai: ArchitectureTrack
  state?: Bi
  timescale?: Bi
  caveat?: Bi
}

export interface CardGuide {
  question: Bi
  answer: Bi
  scope: Bi
  comparisons: ComparisonRow[]
  borrow: Bi
  boundary: Bi
  experiments: DesignExperiment[]
  architecture?: ArchitectureSection
  review?: ReviewCard
}

export interface CardMechanism {
  id: string
  layer: Layer
  title: Bi
  /** what the brain does */
  brain: Bi
  brainMath?: Formula[]
  /** the closest AI counterpart(s) */
  ai: Bi
  aiMath?: Formula[]
  kinds: Kind[]
  evidence: Evidence
  refs: string[]
  /** interactive lab id */
  lab?: string
  /** atlas functional-system tour id (layer 4) */
  tour?: string
}

export interface Card extends CardMechanism {
  guide: CardGuide
}

/** Layer-5 robot-brain module. */
export interface Module {
  id: string
  name: Bi
  /** 0 absent … 3 strong */
  coverage: 0 | 1 | 2 | 3
  brain: Bi
  ai: Bi
  gaps: Bi
  directions: Bi
  /** related cards */
  cards: string[]
  refs: string[]
  /** grid placement in the blueprint (column, row) */
  pos: [number, number]
}

/** An equation on a topic page, taught step by step. */
export interface TopicFormula {
  /** the process the equation describes */
  title: Bi
  tex: string
  /** every symbol and what it stands for (symbol in TeX) */
  symbols: { tex: string; meaning: Bi }[]
  /** how the computation runs, in order */
  steps: Bi[]
  /** a small worked example */
  example?: Bi
  /** what follows from the equation */
  consequences: Bi[]
  limitations: Bi[]
}

/** One numbered step of a figure explanation; its number matches a marker in the figure. */
export interface FigStep {
  title: Bi
  points: Bi[]
}

/** The full page of a functional topic (docs/atlas-v1-plan.md §5). */
export interface TopicContent {
  /** one short paragraph per side, then the key gap */
  thesis: { biological: Bi; computational: Bi; gap: Bi }
  kinds: Kind[]
  evidence: Evidence
  /** which systems the computational column describes, and as of when */
  asOf: Bi
  capabilities: CapabilityComparison[]
  /** step-by-step explanations of the architecture figures */
  archSteps: { biological: FigStep[]; computational: FigStep[] }
  /** step-by-step explanations of the dynamics figure, per lane */
  dynamicsSteps: { biological: FigStep[]; computational: FigStep[] }
  bioMath: TopicFormula[]
  compMath: TopicFormula[]
  limits: {
    biological: Bi[]
    computational: Bi[]
    /** conclusions the evidence does not support */
    unsupported: Bi[]
  }
  refs: {
    neuro: string[]
    models: string[]
    ai: string[]
  }
}
