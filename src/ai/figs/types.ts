import type { ComponentType } from 'react'
import type { Bi } from '../../data/types'

export interface FigProps {
  t: (bi: Bi) => string
}

/** A brain-structure figure and an AI-architecture figure for one correspondence card. */
export interface FigPair {
  brain: ComponentType<FigProps>
  ai: ComponentType<FigProps>
  brainCap: Bi
  aiCap: Bi
}

/** Figures of a topic page: the two architectures side by side, and, on topics that have dynamicsSteps, one dynamics
 * figure over a shared time axis. Their explanations live in the topic content (archSteps, dynamicsSteps), numbered to match the markers. */
export interface TopicFigs {
  /** left out while a figure is still to be drawn; the page shows an empty frame instead */
  arch?: { brain: ComponentType<FigProps>; ai: ComponentType<FigProps> }
  dynamics?: ComponentType<FigProps>
  /** figures beside equations (keyed by equation index): plots of what the equation computes (plot.tsx), or a figure kept from an old system card */
  math?: { bio?: Record<number, MathFig>; comp?: Record<number, MathFig> }
}

/** A figure shown inside an equation card, with its caption. */
export interface MathFig {
  Fig: ComponentType<FigProps>
  cap: Bi
}
