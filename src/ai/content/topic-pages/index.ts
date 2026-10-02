import type { TopicContent } from '../../types'
import { EPISODIC_MEMORY } from './episodic-memory'

/** Topics that have their own page, keyed by topic id. The rest still open their old card or are in progress. */
export const TOPIC_CONTENT: Record<string, TopicContent> = {
  'episodic-memory': EPISODIC_MEMORY,
}
