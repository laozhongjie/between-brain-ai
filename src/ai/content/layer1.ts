import type { Bi } from '../../data/types'
import type { CardMechanism } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Layer 1: synapses. The text of each mechanism entry lives in mech-pages/, keyed by the same id. */
export const LAYER1: CardMechanism[] = [
  {
    id: 'synapse-weight', layer: 1,
    title: b('突触传递 ↔ 连接权重', 'Synaptic transmission ↔ connection weights'),
    kinds: ['math'], evidence: 'established',
  },
  {
    id: 'short-term-plasticity', layer: 1,
    title: b('短时可塑性 ↔ 快权重与线性注意力', 'Short-term plasticity ↔ fast weights and linear attention'),
    kinds: ['math', 'algorithm'], evidence: 'established', lab: 'stp',
  },
  {
    id: 'stdp', layer: 1,
    title: b('Hebb 学习与 STDP ↔ 局部无监督学习', 'Hebbian learning and STDP ↔ local unsupervised learning'),
    kinds: ['algorithm'], evidence: 'debated', lab: 'stdp',
  },
  {
    id: 'three-factor', layer: 1,
    title: b('三因子学习 ↔ 反向传播与反馈对齐', 'Three-factor learning ↔ backpropagation and feedback alignment'),
    kinds: ['algorithm', 'math'], evidence: 'debated', lab: 'three-factor',
  },
  {
    id: 'consolidation', layer: 1,
    title: b('突触巩固 ↔ EWC 与快慢权重', 'Synaptic consolidation ↔ EWC and fast and slow weights'),
    kinds: ['algorithm'], evidence: 'debated',
  },
  {
    id: 'structural-plasticity', layer: 1,
    title: b('结构可塑性 ↔ 剪枝与动态稀疏训练', 'Structural plasticity ↔ pruning and dynamic sparse training'),
    kinds: ['algorithm'], evidence: 'established',
  },
  {
    id: 'glia', layer: 1,
    title: b('胶质细胞与三方突触 ↔ 暂无直接对应', 'Glia and the tripartite synapse ↔ no direct counterpart'),
    kinds: [], evidence: 'debated',
  },
]
