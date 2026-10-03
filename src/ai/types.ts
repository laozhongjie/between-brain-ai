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

/** One of the functional domains: the main directory. */
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

/** A cross-domain topic: compared like a functional topic, but drawing on several domains. */
export interface CrossTopic extends Topic {
  desc: Bi
  /** functional topics it draws on */
  topics: string[]
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

/** Which side does better on one capability, judged from the row's own evidence. */
export type Lead = 'bio' | 'comp' | 'even' | 'mixed'

export interface TopicCapability extends CapabilityComparison {
  lead: Lead
}

/** One limit of a system: a short headline, the explanation and the architecture steps where it arises. */
export interface TopicLimit {
  title: Bi
  text: Bi
  steps?: number[]
}

/** A claim that actually circulates (in the press, popular science or a paper’s own framing), and what the evidence supports. */
export interface Misreading {
  claim: Bi
  fact: Bi
  /** where the claim comes from, when that can be pinned down */
  source?: Bi
}

/** The full page of a functional topic (docs/atlas-v1-plan.md §5). */
export interface TopicContent {
  /** short names of the two systems for verdict labels, e.g. 海马 / RAG */
  short: { biological: Bi; computational: Bi }
  /** one short paragraph per side, then the key gap */
  thesis: { biological: Bi; computational: Bi; gap: Bi }
  kinds: Kind[]
  evidence: Evidence
  /** which systems the AI column describes, and as of when */
  asOf: Bi
  capabilities: TopicCapability[]
  /** the information flow through each architecture figure, step by step */
  archSteps: { biological: FigStep[]; computational: FigStep[] }
  /** background under each architecture column: definitions, mechanisms, scale, debated points */
  archNotes: { biological: Bi[]; computational: Bi[] }
  /** step-by-step explanations of the dynamics figure, per lane. Only where the gap itself unfolds over time
   * and the architecture steps do not already tell that time course (docs/atlas-v1-plan.md §5). */
  dynamicsSteps?: { biological: FigStep[]; computational: FigStep[] }
  bioMath: TopicFormula[]
  compMath: TopicFormula[]
  limits: {
    biological: TopicLimit[]
    computational: TopicLimit[]
    /** popular claims, each with what the evidence supports; only claims people actually make, so often none */
    misreadings: Misreading[]
  }
  refs: {
    neuro: string[]
    models: string[]
    ai: string[]
  }
}
