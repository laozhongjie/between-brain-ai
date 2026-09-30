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
