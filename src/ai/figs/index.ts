import { LAYER1_FIGS } from './layer1'
import { LAYER2_FIGS } from './layer2'
import { LAYER3_FIGS } from './layer3'
import { LAYER4_FIGS } from './layer4'
import { EPISODIC_FIGS } from './topics/episodic-memory'
import { ATTENTION_FIGS, EMOTION_REG_FIGS, INTEROCEPTION_FIGS, MOTOR_FIGS, REWARD_FIGS, SKILL_FIGS } from './topics/legacy-only'
import { WORLD_MODEL_FIGS } from './topics/world-models'
import { COGNITIVE_MAP_FIGS } from './topics/cognitive-maps'
import { CONSOLIDATION_FIGS } from './topics/consolidation-replay'
import { WORKING_MEMORY_FIGS } from './topics/working-memory'
import { CONTINUAL_FIGS } from './topics/continual-learning'
import { META_FIGS } from './topics/meta-learning'
import { CREDIT_FIGS } from './topics/credit-assignment'
import { MULTISENSORY_FIGS } from './topics/multisensory'
import { AUDITORY_FIGS } from './topics/auditory-scene'
import { VISUAL_FIGS } from './topics/visual-recognition'
import type { FigPair, TopicFigs } from './types'

export const FIGS: Record<string, FigPair> = { ...LAYER1_FIGS, ...LAYER2_FIGS, ...LAYER3_FIGS, ...LAYER4_FIGS }

/** Figures of the topic pages, keyed by topic id. */
export const TOPIC_FIGS: Record<string, TopicFigs> = {
  'visual-recognition': VISUAL_FIGS,
  'auditory-scene': AUDITORY_FIGS,
  'multisensory': MULTISENSORY_FIGS,
  'credit-assignment': CREDIT_FIGS,
  'meta-learning': META_FIGS,
  'continual-learning': CONTINUAL_FIGS,
  'working-memory': WORKING_MEMORY_FIGS,
  'episodic-memory': EPISODIC_FIGS,
  'consolidation-replay': CONSOLIDATION_FIGS,
  'cognitive-maps': COGNITIVE_MAP_FIGS,
  'world-models': WORLD_MODEL_FIGS,
  'attention-gating': ATTENTION_FIGS,
  'motor-control': MOTOR_FIGS,
  'skill-learning': SKILL_FIGS,
  'reward-learning': REWARD_FIGS,
  'emotion-regulation': EMOTION_REG_FIGS,
  'interoception': INTEROCEPTION_FIGS,
}
