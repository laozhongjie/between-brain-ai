import type { Bi } from '../../data/types'
import type { CardMechanism } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Layer 2: neurons. The text of each mechanism entry lives in mech-pages/, keyed by the same id. */
export const LAYER2: CardMechanism[] = [
  {
    id: 'neuron-models', layer: 2,
    title: b('神经元模型 ↔ 人工神经元与状态空间模型', 'Neuron models ↔ artificial neurons and state-space models'),
    kinds: ['math'], evidence: 'established', lab: 'neuron',
  },
  {
    id: 'dendrites', layer: 2,
    title: b('树突计算 ↔ 门控单元与主动树突', 'Dendritic computation ↔ gated units and active dendrites'),
    kinds: ['algorithm'], evidence: 'established', lab: 'dendrite',
  },
  {
    id: 'spikes', layer: 2,
    title: b('脉冲与时间编码 ↔ 脉冲神经网络', 'Spikes and temporal coding ↔ spiking neural networks'),
    kinds: ['implementation'], evidence: 'debated',
  },
  {
    id: 'ei-celltypes', layer: 2,
    title: b('兴奋、抑制与细胞类型 ↔ 同质单元与归一化', 'Excitation, inhibition and cell types ↔ uniform units and normalization'),
    kinds: ['algorithm'], evidence: 'established',
  },
  {
    id: 'noise', layer: 2,
    title: b('神经噪声 ↔ Dropout 与采样', 'Neural noise ↔ Dropout and sampling'),
    kinds: ['algorithm'], evidence: 'debated',
  },
  {
    id: 'energy-sparsity', layer: 2,
    title: b('稀疏编码 ↔ L1 正则化与稀疏激活', 'Sparse coding ↔ L1 regularization and sparse activations'),
    kinds: ['implementation'], evidence: 'established',
  },
]
