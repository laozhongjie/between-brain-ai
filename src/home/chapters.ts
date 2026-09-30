import type { Bi } from '../data/types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/**
 * Shared between the scroll handler and the render loops: which chapter is on screen (−1 before the first)
 * how far the split disc has opened, and how far the hero has scrolled away (both 0..1).
 */
export const homeState = { chapter: -1, open: 0, hero: 0 }

export interface Chapter {
  /** layer tag, e.g. "SYNAPSE ↔ WEIGHT" */
  tag: string
  title: Bi
  brain: Bi
  ai: Bi
  /** camera distance for the brain panel */
  dist: number
  /** colour the brain by functional system in this chapter */
  systems?: boolean
}

/** The five layers of the Brain ↔ AI ladder, told as one scroll from the synapse to the whole agent. */
export const CHAPTERS: Chapter[] = [
  {
    tag: 'SYNAPSE ↔ WEIGHT',
    title: b('在突触与权重之间', 'between synapses and weights'),
    brain: b('突触随使用增强或减弱，放电的先后决定方向（STDP）。', 'Synapses strengthen or weaken with use; spike timing decides which way (STDP).'),
    ai: b('权重按一个全局误差做梯度下降。', 'Weights follow gradient descent on one global error.'),
    dist: 5.0,
  },
  {
    tag: 'NEURON ↔ UNIT',
    title: b('在神经元与单元之间', 'between neurons and units'),
    brain: b('神经元在树突上整合成千上万个输入，按时间发放脉冲。', 'A neuron integrates thousands of inputs across its dendrites and fires spikes in time.'),
    ai: b('人工单元把输入加权求和，再过一个非线性。', 'A unit takes a weighted sum and applies one nonlinearity.'),
    dist: 5.3,
  },
  {
    tag: 'MICROCIRCUIT ↔ MODULE',
    title: b('在环路与模块之间', 'between circuits and modules'),
    brain: b('微环路做归一化、预测，并以吸引子保存记忆。', 'Microcircuits normalise, predict, and hold memories as attractors.'),
    ai: b('网络层做归一化与注意力，把模式存进权重。', 'Layers normalise and attend, and store patterns in their weights.'),
    dist: 5.6,
  },
  {
    tag: 'BRAIN SYSTEM ↔ ARCHITECTURE',
    title: b('在脑系统与架构之间', 'between brain systems and architectures'),
    brain: b('视觉、记忆、奖赏等专门系统在回路中协作。', 'Specialised systems (vision, memory, reward) cooperate in loops.'),
    ai: b('编码器、记忆和策略被接成一个模型。', 'Encoders, memory and policies are wired into one model.'),
    dist: 6.0,
    systems: true,
  },
  {
    tag: 'ORGANISM ↔ AGENT',
    title: b('在生命体与智能体之间', 'between an organism and an agent'),
    brain: b('有身体、在世界中：感知、行动、睡眠，终身学习。', 'A body in a world: sensing, acting, sleeping, learning for life.'),
    ai: b('在环境中的智能体：感知、行动、从奖励中学习。', 'An agent in an environment: perceive, act, learn from reward.'),
    dist: 6.8,
  },
]
