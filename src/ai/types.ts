import type { Bi } from '../data/types'

/**
 * How closely today's AI matches the brain mechanism.
 *  iso     – same principle (e.g. dopamine ≈ TD error)
 *  similar – same function, different mechanism
 *  crude   – only a rough substitute exists
 *  absent  – no counterpart in mainstream AI
 */
export type Corr = 'iso' | 'similar' | 'crude' | 'absent'

/** How settled the neuroscience is. */
export type Evidence = 'established' | 'debated' | 'speculative'

export type Layer = 1 | 2 | 3 | 4 | 5

export interface AtlasDomain {
  id: string
  name: Bi
  desc: Bi
  cards: string[]
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
  corr: Corr
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
