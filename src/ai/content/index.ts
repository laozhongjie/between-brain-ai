import type { Bi } from '../../data/types'
import type { AtlasDomain, Card, Corr, Evidence, Layer } from '../types'
import { LAYER1 } from './layer1'
import { LAYER2 } from './layer2'
import { LAYER3 } from './layer3'
import { LAYER4 } from './layer4'
import { CARD_GUIDES } from './guides'

const b = (zh: string, en: string): Bi => ({ zh, en })

export const CARDS: Card[] = [...LAYER1, ...LAYER2, ...LAYER3, ...LAYER4].map((card) => ({ ...card, guide: CARD_GUIDES[card.id] }))
export const CARD_BY_ID: Record<string, Card> = Object.fromEntries(CARDS.map((c) => [c.id, c]))
export const cardsOfLayer = (l: Layer) => CARDS.filter((c) => c.layer === l)
export const cardForTour = (tour: string) => CARDS.find((c) => c.tour === tour)

export const DOMAINS: AtlasDomain[] = [
  { id: 'D1', name: b('感知与表征', 'Perception & representation'), desc: b('从输入形成可用表征，并在变化与冲突中保持稳健。', 'Build usable representations from input and remain robust under change and conflict.'), cards: ['sys-vision', 'sys-hearing', 'sys-touch', 'normalization', 'expansion'] },
  { id: 'D2', name: b('学习与适应', 'Learning & adaptation'), desc: b('经验如何改变系统、行为和对新任务的适应速度。', 'How experience changes a system, behaviour and adaptation to new tasks.'), cards: ['short-term-plasticity', 'stdp', 'three-factor', 'noise'] },
  { id: 'D3', name: b('记忆与知识', 'Memory & knowledge'), desc: b('信息如何保持、组织、检索、巩固与遗忘。', 'How information is retained, organised, retrieved, consolidated and forgotten.'), cards: ['sys-memory', 'consolidation', 'attractors'] },
  { id: 'D4', name: b('预测、推理与规划', 'Prediction, reasoning & planning'), desc: b('如何推断未知、预测后果，并形成多步方案。', 'How systems infer the unknown, predict consequences and form multi-step plans.'), cards: ['feedback-predictive', 'neuron-models'] },
  { id: 'D5', name: b('注意与认知控制', 'Attention & cognitive control'), desc: b('如何选择信息、维持目标、抑制干扰并调节计算。', 'How systems select information, maintain goals, suppress interference and regulate computation.'), cards: ['sys-attention', 'ei-celltypes'] },
  { id: 'D6', name: b('行动与具身交互', 'Action & embodied interaction'), desc: b('身体、动作和环境反馈如何形成闭环。', 'How bodies, actions and environmental feedback form a closed loop.'), cards: ['sys-motor', 'dendrites', 'spikes'] },
  { id: 'D7', name: b('价值、动机与调节', 'Value, motivation & regulation'), desc: b('价值、风险、情绪和内部状态如何改变行为优先级。', 'How value, risk, emotion and internal state change behavioural priorities.'), cards: ['sys-fear', 'sys-reward', 'sys-homeostasis'] },
  { id: 'D8', name: b('语言与社会认知', 'Language & social cognition'), desc: b('符号交流、情境理解、他人模型与协作。', 'Symbolic communication, contextual understanding, models of others and cooperation.'), cards: ['sys-language'] },
  { id: 'D9', name: b('发育与长期组织', 'Development & long-term organisation'), desc: b('学习起点、阶段变化、结构重塑与长期能力轨迹。', 'Learning starting points, developmental change, structural remodelling and long-term ability trajectories.'), cards: ['synapse-weight', 'structural-plasticity', 'glia', 'energy-sparsity'] },
]

export const CROSS_CUTTING: AtlasDomain[] = [
  { id: 'X1', name: b('睡眠、觉醒与离线处理', 'Sleep, arousal & offline processing'), desc: b('连接记忆巩固、资源调节和离线学习的综合专题。', 'A cross-domain topic linking consolidation, resource regulation and offline learning.'), cards: ['sys-sleep'] },
]

export const cardsOfDomain = (domain: AtlasDomain) => domain.cards.map((id) => CARD_BY_ID[id]).filter(Boolean)
/** Cards in the order the section nav lists them (layer 4 down to layer 1), for prev/next paging across layers. */
export const READING_ORDER: Card[] = ([4, 3, 2, 1] as Layer[]).flatMap(cardsOfLayer)

export const LAYERS: { id: Layer; name: Bi; scale: Bi; desc: Bi }[] = [
  { id: 1, name: b('分子与突触', 'Molecules & synapses'), scale: b('纳米–微米 · 毫秒到年', 'nm–µm · ms to years'), desc: b('知识储存在哪里、如何被改写：权重、可塑性、学习规则。', 'Where knowledge is stored and how it is rewritten: weights, plasticity, learning rules.') },
  { id: 2, name: b('神经元', 'Neurons'), scale: b('约 10 µm–1 mm · 毫秒', '~10 µm–1 mm · ms'), desc: b('基本计算单元：动力学、树突、脉冲、细胞类型、噪声与能耗。', 'The basic computing unit: dynamics, dendrites, spikes, cell types, noise and energy.') },
  { id: 3, name: b('微环路', 'Microcircuits'), scale: b('约 0.1–1 mm · 毫秒到秒', '~0.1–1 mm · ms to s'), desc: b('反复出现的「计算模板」：归一化、反馈预测、吸引子、扩展编码。', 'Recurring computational motifs: normalisation, feedback prediction, attractors, expansion.') },
  { id: 4, name: b('脑区与系统', 'Brain systems'), scale: b('厘米 · 秒到天', 'cm · s to days'), desc: b('功能系统：感知、运动、语言、记忆、情绪、奖赏、稳态、睡眠、注意。可跳转到 3D 图谱。', 'Functional systems: perception, movement, language, memory, emotion, reward, homeostasis, sleep, attention. Each links to the 3D atlas.') },
  { id: 5, name: b('整个智能体', 'Whole agent'), scale: b('身体 + 环境 · 一生', 'body + environment · a lifetime'), desc: b('「类人机器人大脑」蓝图：世界模型只是其中一块，标出每个模块的覆盖程度与缺口。', 'A humanlike robot-brain blueprint: the world model is one module; each module’s coverage and gaps are marked.') },
]

/** Overview / further-reading references shown on the section home page. */
export const INTRO_REFS = ['hassabis2017', 'richards2019', 'lake2017', 'zador2019', 'lillicrap2020']

export const CORR_INFO: Record<Corr, { name: Bi; desc: Bi; level: number }> = {
  iso: { level: 3, name: b('同构', 'Same principle'), desc: b('原理基本相同', 'Essentially the same principle') },
  similar: { level: 2, name: b('功能相似·机制不同', 'Similar function'), desc: b('做到了同样的事，但方式不同', 'Same function, different mechanism') },
  crude: { level: 1, name: b('粗糙替代', 'Crude substitute'), desc: b('有替代品，但差距很大', 'A substitute exists but falls far short') },
  absent: { level: 0, name: b('缺失', 'Absent'), desc: b('主流 AI 中没有对应物', 'No counterpart in mainstream AI') },
}

export const EVIDENCE_INFO: Record<Evidence, { name: Bi; icon: string }> = {
  established: { name: b('证据确立', 'Established'), icon: '●' },
  debated: { name: b('有争议', 'Debated'), icon: '◐' },
  speculative: { name: b('推测', 'Speculative'), icon: '○' },
}

/** Ordinal lavender ramp for correspondence / coverage (0 = absent … 3 = strong) on the light ground. */
export const LEVEL_COLORS = ['transparent', '#2c4a63', '#4f8db3', '#7dd3fc'] as const
