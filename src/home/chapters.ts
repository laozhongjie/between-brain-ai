import type { Bi } from '../data/types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/**
 * Shared between the scroll handler and the render loops: which chapter is on screen (−1 before the first)
 * how far the split disc has opened, and how far the hero has scrolled away (both 0..1).
 */
export const homeState = { chapter: -1, open: 0, hero: 0, reveal: 0 }

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
    brain: b('在 STDP 中，相对放电时序影响突触强度的变化。', 'In STDP, relative spike timing shapes changes in synaptic strength.'),
    ai: b('训练时，权重通过梯度优化来减小损失。', 'During training, gradient-based updates adjust weights to reduce loss.'),
    dist: 5.0,
  },
  {
    tag: 'NEURON ↔ UNIT',
    title: b('在神经元与单元之间', 'between neurons and units'),
    brain: b('神经元整合来自树突的输入，并通过电脉冲传递信号。', 'Neurons integrate dendritic inputs and communicate through spikes.'),
    ai: b('人工神经元对输入加权求和，再应用非线性激活函数。', 'An artificial neuron applies a nonlinear activation to a weighted sum of inputs.'),
    dist: 5.3,
  },
  {
    tag: 'MICROCIRCUIT ↔ MODULE',
    title: b('在微环路与模块之间', 'between microcircuits and modules'),
    brain: b('微环路可参与归一化、预测和记忆维持。', 'Microcircuits can support normalisation, prediction, and memory maintenance.'),
    ai: b('归一化与注意力调节信息处理，权重编码学习到的模式。', 'Normalisation and attention shape processing; weights encode learned patterns.'),
    dist: 5.6,
  },
  {
    tag: 'BRAIN SYSTEM ↔ ARCHITECTURE',
    title: b('在脑功能系统与 AI 架构之间', 'between brain systems and AI architectures'),
    brain: b('视觉、记忆、奖赏等系统通过相互连接的回路协同工作。', 'Visual, memory, and reward systems work together through interconnected circuits.'),
    ai: b('编码器、记忆模块与策略模块协同支持感知和决策。', 'Encoders, memory modules, and policies work together to support perception and decisions.'),
    dist: 6.0,
    systems: true,
  },
  {
    tag: 'ORGANISM ↔ AGENT',
    title: b('在生命体与智能体之间', 'between an organism and an agent'),
    brain: b('大脑与身体共同参与感知、行动和睡眠，并支持终身学习。', 'Brain and body work together in perception, action, sleep, and lifelong learning.'),
    ai: b('智能体感知环境并采取行动，可通过奖赏反馈学习。', 'Agents perceive and act in an environment, and can learn from reward.'),
    dist: 6.8,
  },
]
