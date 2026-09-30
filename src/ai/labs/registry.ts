import type { ComponentType } from 'react'
import type { Bi } from '../../data/types'
import { DendriteLab, NeuronLab, StdpLab, StpLab, ThreeFactorLab } from './Labs'

const b = (zh: string, en: string): Bi => ({ zh, en })

export const LABS: Record<string, { title: Bi; component: ComponentType }> = {
  neuron: { title: b('实验：三种神经元模型', 'Lab: Three neuron models'), component: NeuronLab },
  dendrite: { title: b('实验：树突让单个神经元算出异或', 'Lab: Dendrites let one neuron compute XOR'), component: DendriteLab },
  stdp: { title: b('实验：STDP 时间窗与权重演化', 'Lab: STDP window and weight evolution'), component: StdpLab },
  stp: { title: b('实验：短时抑制与易化', 'Lab: Short-term depression and facilitation'), component: StpLab },
  'three-factor': { title: b('实验：资格迹与延迟奖赏', 'Lab: Eligibility traces and delayed reward'), component: ThreeFactorLab },
}
