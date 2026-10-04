import type { Bi } from '../../data/types'
import type { AtlasDomain, Card, CrossTopic, Evidence, Kind, Topic } from '../types'
import { LAYER1 } from './layer1'
import { LAYER2 } from './layer2'
import { LAYER3 } from './layer3'
import { LAYER4 } from './layer4'
import { CARD_GUIDES } from './guides'
import { CROSS_TOPICS, MECH_GROUPS, TOPICS, TOPIC_BY_ID } from './topics'
import { TOPIC_CONTENT } from './topic-pages'
import { MECH_CONTENT } from './mech-pages'

export * from './topics'
export * from './concepts'
export { TOPIC_CONTENT, MECH_CONTENT }

const b = (zh: string, en: string): Bi => ({ zh, en })

export const CARDS: Card[] = [...LAYER1, ...LAYER2, ...LAYER3, ...LAYER4].map((card) => ({ ...card, guide: CARD_GUIDES[card.id] }))
export const CARD_BY_ID: Record<string, Card> = Object.fromEntries(CARDS.map((c) => [c.id, c]))

export const DOMAINS: AtlasDomain[] = [
  { id: 'D1', name: b('感知与表征', 'Perception & representation'), desc: b('从输入形成可用表征，并在变化与冲突中保持稳健。', 'Build usable representations from input and remain robust under change and conflict.'), topics: ['visual-recognition', 'auditory-scene', 'multisensory'] },
  { id: 'D2', name: b('学习与适应', 'Learning & adaptation'), desc: b('经验如何改变系统、行为和对新任务的适应速度。', 'How experience changes a system, behavior and adaptation to new tasks.'), topics: ['credit-assignment', 'meta-learning', 'continual-learning'] },
  { id: 'D3', name: b('记忆与知识', 'Memory & knowledge'), desc: b('信息如何保持、组织、检索、巩固与遗忘。', 'How information is retained, organized, retrieved, consolidated and forgotten.'), topics: ['working-memory', 'episodic-memory', 'consolidation-replay', 'cognitive-maps'] },
  { id: 'D4', name: b('预测、推理与规划', 'Prediction, reasoning & planning'), desc: b('如何推断未知、预测后果，并形成多步方案。', 'How systems infer the unknown, predict consequences and form multi-step plans.'), topics: ['world-models', 'compositional-reasoning', 'planning'] },
  { id: 'D5', name: b('注意与认知控制', 'Attention & cognitive control'), desc: b('如何选择信息、维持目标、抑制干扰并调节计算。', 'How systems select information, maintain goals, suppress interference and regulate computation.'), topics: ['attention-gating', 'metacognitive-monitoring', 'metacognitive-control'] },
  { id: 'D6', name: b('行动与具身交互', 'Action & embodied interaction'), desc: b('身体、动作和环境反馈如何形成闭环。', 'How bodies, actions and environmental feedback form a closed loop.'), topics: ['motor-control', 'skill-learning'] },
  { id: 'D7', name: b('价值、动机与调节', 'Value, motivation & regulation'), desc: b('价值、风险、情绪和内部状态如何改变行为优先级。', 'How value, risk, emotion and internal state change behavioral priorities.'), topics: ['reward-learning', 'emotion-understanding', 'emotion-regulation', 'interoception'] },
  { id: 'D8', name: b('语言与社会认知', 'Language & social cognition'), desc: b('符号交流、情境理解、他人模型与协作。', 'Symbolic communication, contextual understanding, models of others and cooperation.'), topics: ['language', 'social-inference'] },
  { id: 'D9', name: b('发育与长期组织', 'Development & long-term organization'), desc: b('学习起点、阶段变化、结构重塑与长期能力轨迹。', 'Learning starting points, developmental change, structural remodeling and long-term ability trajectories.'), topics: ['innate-constraints', 'developmental-stages'] },
]

export const DOMAIN_BY_ID: Record<string, AtlasDomain> = Object.fromEntries(DOMAINS.map((d) => [d.id, d]))
export const topicsOfDomain = (domain: AtlasDomain) => domain.topics.map((id) => TOPIC_BY_ID[id])
/** The domain of a functional topic; cross-domain topics have none. */
export const domainOfTopic = (topicId: string) => DOMAINS.find((d) => d.topics.includes(topicId))

/** Mechanism entries in index order, for prev / next paging. */
export const MECH_ORDER: Card[] = MECH_GROUPS.flatMap((g) => g.cards.map((id) => CARD_BY_ID[id]))

/** Where a topic opens today: its own page once written, else its old card, else nowhere yet. */
export const topicHref = (topic: Topic) => (TOPIC_CONTENT[topic.id] ? `/ai/topic/${topic.id}` : topic.legacy ? `/ai/card/${topic.legacy}` : null)
/** Topics with a page of their own, in directory order, cross-domain topics last (for prev / next paging). */
export const WRITTEN_TOPICS = (): Topic[] => [...DOMAINS.flatMap((d) => d.topics), ...CROSS_TOPICS.map((x) => x.id)].filter((id) => TOPIC_CONTENT[id]).map((id) => TOPIC_BY_ID[id])
export const crossHref = (x: CrossTopic) => topicHref(x)
/** Topics this old card still stands in for (an old system card can stand in for several). */
export const topicsOfLegacy = (cardId: string) => TOPICS.filter((t) => t.legacy === cardId && !TOPIC_CONTENT[t.id])

/** The AI comparison an atlas tour links to: the topic for that brain system, or the old card. */
export function aiLinkForTour(tour: string): { href: string; title: Bi } | undefined {
  const topic = [...TOPICS, ...CROSS_TOPICS].find((t) => t.tour === tour)
  const href = topic && topicHref(topic)
  if (topic && href) return { href, title: topic.name }
  const card = CARDS.find((c) => c.tour === tour)
  return card && { href: `/ai/card/${card.id}`, title: card.title }
}

/** Overview / further-reading references shown on the section home page. */
export const INTRO_REFS = ['hassabis2017', 'richards2019', 'lake2017', 'zador2019', 'lillicrap2020']

export const KIND_INFO: Record<Kind, { name: Bi; desc: Bi }> = {
  behavior: { name: b('行为', 'Behavior'), desc: b('任务表现可以直接比较', 'Task performance can be compared directly') },
  representation: { name: b('表征', 'Representation'), desc: b('内部表征可以比较', 'Internal representations can be compared') },
  algorithm: { name: b('算法', 'Algorithm'), desc: b('计算步骤相近', 'The computational steps are similar') },
  math: { name: b('数学', 'Math'), desc: b('数学形式相同或相近', 'The mathematical form is the same or similar') },
  implementation: { name: b('实现', 'Implementation'), desc: b('物理实现或资源可以比较', 'Physical implementation or resources can be compared') },
}
export const NO_KIND: { name: Bi; desc: Bi } = { name: b('暂无直接对应', 'No direct counterpart'), desc: b('主流 AI 中还没有可以比较的对象', 'Mainstream AI has nothing to compare yet') }

export const EVIDENCE_INFO: Record<Evidence, { name: Bi; icon: string }> = {
  established: { name: b('证据确立', 'Established'), icon: '●' },
  debated: { name: b('有争议', 'Debated'), icon: '◐' },
  speculative: { name: b('推测', 'Speculative'), icon: '○' },
}

