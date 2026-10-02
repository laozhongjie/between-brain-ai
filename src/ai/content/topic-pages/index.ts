import type { TopicContent } from '../../types'
import { EPISODIC_MEMORY } from './episodic-memory'
import { VISUAL_RECOGNITION } from './visual-recognition'

/** Topics that have their own page, keyed by topic id. The rest still open their old card or are in progress. */
export const TOPIC_CONTENT: Record<string, TopicContent> = {
  'visual-recognition': VISUAL_RECOGNITION,
  'episodic-memory': EPISODIC_MEMORY,
}
