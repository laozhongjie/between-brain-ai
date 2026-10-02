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

/** Figures of a topic page: the two architectures side by side, and one dynamics figure over a shared time axis.
 * Their explanations live in the topic content (archSteps, dynamicsSteps), numbered to match the markers. */
export interface TopicFigs {
  arch: { brain: ComponentType<FigProps>; ai: ComponentType<FigProps> }
  dynamics: ComponentType<FigProps>
}
