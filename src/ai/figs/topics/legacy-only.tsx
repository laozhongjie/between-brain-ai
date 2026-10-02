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

export const REWARD_FIGS: TopicFigs = {
  math: {
    bio: {
      0: {
        ...legacyFig('sys-reward', 'brain'),
        cap: b('奖赏：皮层提供状态，腹侧纹状体估计价值，背侧纹状体选择动作；中脑腹侧被盖区的多巴胺编码预测误差，广播回纹状体和皮层来更新两者。', 'Reward: cortex supplies the state, the ventral striatum estimates value and the dorsal striatum picks actions. Dopamine from the ventral tegmental area encodes the prediction error and is broadcast back to update both.'),
      },
    },
    comp: {
      0: {
        ...legacyFig('sys-reward', 'ai'),
        cap: b('行动者与评论家：评论家估计状态价值，行动者给出动作概率，环境返回奖励和新状态，时序差分误差同时更新两者。结构与基底节加多巴胺的分工相近。', 'Actor-critic: the critic estimates state value, the actor gives action probabilities, the environment returns reward and the next state, and the TD error updates both. The structure is close to the division of labor in the basal ganglia with dopamine.'),
      },
    },
  },
}

export const EMOTION_REG_FIGS: TopicFigs = {
  math: {
    bio: {
      0: {
        ...legacyFig('sys-fear', 'brain'),
        cap: b('恐惧：丘脑经快速的「低通路」约十几毫秒直达杏仁核，皮层的「高通路」随后看清是什么。杏仁核迅速切换全身状态（应激、心跳、僵住），腹内侧前额叶负责抑制。', 'Fear: the thalamus reaches the amygdala by the fast low road in about a dozen milliseconds, and the cortical high road identifies the object later. The amygdala quickly switches the whole-body state, stress, heart rate and freezing, and ventromedial prefrontal cortex applies the brake.'),
      },
    },
    comp: {
      0: {
        ...legacyFig('sys-fear', 'ai'),
        cap: b('强化学习智能体：状态进入策略，经安全过滤后执行动作，环境返回一个标量奖励。没有一个能同时改变注意、学习率、风险偏好和记忆写入的「情绪状态」。', 'A reinforcement learning agent: the state goes into the policy, actions pass a safety filter and the environment returns one scalar reward. There is no emotional state that jointly changes attention, learning rate, risk taking and memory storage.'),
      },
    },
  },
}

export const INTEROCEPTION_FIGS: TopicFigs = {
  math: {
    bio: { 0: legacyFig('sys-homeostasis', 'brain') },
    comp: { 0: legacyFig('sys-homeostasis', 'ai') },
  },
}

export const LANGUAGE_FIGS: TopicFigs = {
  math: { bio: { 0: legacyFig('sys-language', 'brain') }, comp: { 0: legacyFig('sys-language', 'ai') } },
}
