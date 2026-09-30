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

export interface Card {
  id: string
  layer: Layer
  title: Bi
  /** one-line summary shown in lists */
  summary: Bi
  /** what the brain does */
  brain: Bi
  brainMath?: Formula[]
  /** the closest AI counterpart(s) */
  ai: Bi
  aiMath?: Formula[]
  corr: Corr
  evidence: Evidence
  /** key differences between brain and AI */
  diffs: Bi[]
  /** is the brain feature a computational principle worth borrowing, or a biological constraint? */
  principle: Bi
  /** concrete architecture/experiment ideas */
  ideas: Bi[]
  refs: string[]
  /** interactive lab id */
  lab?: string
  /** atlas functional-system tour id (layer 4) */
  tour?: string
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
