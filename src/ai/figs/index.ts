import { LAYER1_FIGS } from './layer1'
import { LAYER2_FIGS } from './layer2'
import { LAYER3_FIGS } from './layer3'
import { LAYER4_FIGS } from './layer4'
import { EPISODIC_FIGS } from './topics/episodic-memory'
import { VISUAL_FIGS } from './topics/visual-recognition'
import type { FigPair, TopicFigs } from './types'

export const FIGS: Record<string, FigPair> = { ...LAYER1_FIGS, ...LAYER2_FIGS, ...LAYER3_FIGS, ...LAYER4_FIGS }

/** Figures of the topic pages, keyed by topic id. */
export const TOPIC_FIGS: Record<string, TopicFigs> = {
  'visual-recognition': VISUAL_FIGS,
  'episodic-memory': EPISODIC_FIGS,
}
