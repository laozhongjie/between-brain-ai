import type { Bi } from '../../data/types'
import type { CardMechanism } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Layer 3: circuits. The text of each mechanism entry lives in mech-pages/, keyed by the same id. */
export const LAYER3: CardMechanism[] = [
  {
    id: 'normalization', layer: 3,
    title: b('除法归一化 ↔ Softmax 与 LayerNorm', 'Divisive normalization ↔ softmax and LayerNorm'),
    kinds: ['math', 'algorithm'], evidence: 'established',
  },
  {
    id: 'feedback-predictive', layer: 3,
    title: b('反馈连接与预测编码 ↔ 前馈网络与 JEPA', 'Feedback and predictive coding ↔ feedforward networks and JEPA'),
    kinds: ['algorithm'], evidence: 'debated',
  },
  {
    id: 'attractors', layer: 3,
    title: b('吸引子网络 ↔ Hopfield 网络与 RNN 吸引子', 'Attractor networks ↔ Hopfield networks and RNN attractors'),
    kinds: ['math'], evidence: 'debated',
  },
  {
    id: 'expansion', layer: 3,
    title: b('扩展编码 ↔ Transformer 前馈层与随机特征', 'Expansion coding ↔ Transformer feedforward layers and random features'),
    kinds: ['math', 'representation'], evidence: 'established',
  },
]
