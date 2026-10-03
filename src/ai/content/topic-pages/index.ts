import type { TopicContent } from '../../types'
import { EPISODIC_MEMORY } from './episodic-memory'
import { INNATE_CONSTRAINTS } from './innate-constraints'
import { DEVELOPMENTAL_STAGES } from './developmental-stages'
import { SOCIAL_INFERENCE } from './social-inference'
import { LANGUAGE } from './language'
import { INTEROCEPTION } from './interoception'
import { EMOTION_REGULATION } from './emotion-regulation'
import { EMOTION_UNDERSTANDING } from './emotion-understanding'
import { REWARD_LEARNING } from './reward-learning'
import { SKILL_LEARNING } from './skill-learning'
import { MOTOR_CONTROL } from './motor-control'
import { METACOGNITIVE_CONTROL } from './metacognitive-control'
import { METACOGNITIVE_MONITORING } from './metacognitive-monitoring'
import { ATTENTION_GATING } from './attention-gating'
import { PLANNING } from './planning'
import { COMPOSITIONAL_REASONING } from './compositional-reasoning'
import { WORLD_MODELS } from './world-models'
import { COGNITIVE_MAPS } from './cognitive-maps'
import { CONSOLIDATION_REPLAY } from './consolidation-replay'
import { WORKING_MEMORY } from './working-memory'
import { CONTINUAL_LEARNING } from './continual-learning'
import { META_LEARNING } from './meta-learning'
import { CREDIT_ASSIGNMENT } from './credit-assignment'
import { MULTISENSORY } from './multisensory'
import { AUDITORY_SCENE } from './auditory-scene'
import { VISUAL_RECOGNITION } from './visual-recognition'
import { SLEEP_OFFLINE } from './sleep-offline'

/** Topics (functional and cross-domain) that have their own page, keyed by topic id. The rest still open their old card or are in progress. */
export const TOPIC_CONTENT: Record<string, TopicContent> = {
  'visual-recognition': VISUAL_RECOGNITION,
  'auditory-scene': AUDITORY_SCENE,
  'multisensory': MULTISENSORY,
  'credit-assignment': CREDIT_ASSIGNMENT,
  'meta-learning': META_LEARNING,
  'continual-learning': CONTINUAL_LEARNING,
  'working-memory': WORKING_MEMORY,
  'episodic-memory': EPISODIC_MEMORY,
  'consolidation-replay': CONSOLIDATION_REPLAY,
  'cognitive-maps': COGNITIVE_MAPS,
  'world-models': WORLD_MODELS,
  'compositional-reasoning': COMPOSITIONAL_REASONING,
  'planning': PLANNING,
  'attention-gating': ATTENTION_GATING,
  'metacognitive-monitoring': METACOGNITIVE_MONITORING,
  'metacognitive-control': METACOGNITIVE_CONTROL,
  'motor-control': MOTOR_CONTROL,
  'skill-learning': SKILL_LEARNING,
  'reward-learning': REWARD_LEARNING,
  'emotion-understanding': EMOTION_UNDERSTANDING,
  'emotion-regulation': EMOTION_REGULATION,
  'interoception': INTEROCEPTION,
  'language': LANGUAGE,
  'social-inference': SOCIAL_INFERENCE,
  'innate-constraints': INNATE_CONSTRAINTS,
  'developmental-stages': DEVELOPMENTAL_STAGES,
  'sleep-offline': SLEEP_OFFLINE,
}
