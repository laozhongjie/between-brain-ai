import type { TopicContent } from '../../types'
import { EPISODIC_MEMORY } from './episodic-memory'
import { META_LEARNING } from './meta-learning'
import { CREDIT_ASSIGNMENT } from './credit-assignment'
import { MULTISENSORY } from './multisensory'
import { AUDITORY_SCENE } from './auditory-scene'
import { VISUAL_RECOGNITION } from './visual-recognition'

/** Topics that have their own page, keyed by topic id. The rest still open their old card or are in progress. */
export const TOPIC_CONTENT: Record<string, TopicContent> = {
  'visual-recognition': VISUAL_RECOGNITION,
  'auditory-scene': AUDITORY_SCENE,
  'multisensory': MULTISENSORY,
  'credit-assignment': CREDIT_ASSIGNMENT,
  'meta-learning': META_LEARNING,
  'episodic-memory': EPISODIC_MEMORY,
}
