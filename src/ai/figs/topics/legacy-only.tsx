import type { Bi } from '../../../data/types'
import { legacyFig } from '../layer4'
import type { TopicFigs } from '../types'

/** Topics whose own figures are still to be drawn: only the old system-card figures, kept next to an equation. */
export const ATTENTION_FIGS: TopicFigs = {
  math: { bio: { 0: legacyFig('sys-attention', 'brain') }, comp: { 0: legacyFig('sys-attention', 'ai') } },
}

const b = (zh: string, en: string): Bi => ({ zh, en })

export const MOTOR_FIGS: TopicFigs = {
  math: {
    bio: {
      0: {
        ...legacyFig('sys-motor', 'brain'),
        cap: b('运动：目标与计划经基底节选择，由 M1 经脊髓驱动肌肉。M1 同时把传出副本发给小脑，小脑预测结果并与本体感觉比较，经丘脑实时校正 M1。', 'Movement: a goal and plan are selected through the basal ganglia, and M1 drives the muscles through the spinal cord. M1 also sends an efference copy to the cerebellum, which predicts the result, compares it with proprioception and corrects M1 through the thalamus.'),
      },
    },
  },
}

export const SKILL_FIGS: TopicFigs = {
  math: { comp: { 1: legacyFig('sys-motor', 'ai') } },
}
