import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** A fast thalamic and a slow cortical route reach the amygdala, which drives body and a lasting state; prefrontal cortex regulates it and the insula feeds the body back. */
function FearBrainArch({ t }: FigProps) {
  const id = 'f33b'
  return (
    <Svg id={id} w={380} h={304} label={t(b('杏仁核与前额叶调节的结构与信息流：丘脑的快速通路与皮层的慢速通路、杏仁核、下丘脑与脑干、持续的情绪状态、前额叶调节、岛叶的身体反馈', 'Amygdala and prefrontal regulation: fast thalamic and slow cortical routes, amygdala, hypothalamus and brainstem, lasting state, prefrontal regulation, bodily feedback through the insula'))}>
      <Mod x={14} y={14} w={150} h={40} side="bio" label={t(b('丘脑', 'Thalamus'))} sub={t(b('粗略的感觉信号', 'a coarse signal'))} size={10.5} />
      <Mod x={214} y={14} w={152} h={40} side="bio" label={t(b('感觉皮层', 'Sensory cortex'))} sub={t(b('细节：到底是什么', 'detail: what it is'))} size={10.5} />
      <Mod x={14} y={96} w={170} h={40} side="bio" label={t(b('杏仁核', 'Amygdala'))} sub={t(b('外侧核学习关联，中央核输出', 'lateral learns, central outputs'))} size={10.5} />
      <Mod x={196} y={96} w={170} h={40} side="bio" label={t(b('外侧与腹内侧前额叶', 'Lateral and vm prefrontal'))} sub={t(b('重新评价，消退中抑制', 'reappraisal, extinction'))} size={10.5} />
      <Mod x={14} y={180} w={170} h={40} side="bio" label={t(b('下丘脑与脑干', 'Hypothalamus, brainstem'))} sub={t(b('应激激素、心率、僵住', 'stress hormones, heart, freezing'))} size={10.5} />
      <Mod x={196} y={180} w={170} h={40} side="bio" label={t(b('持续的情绪状态', 'Lasting emotional state'))} sub={t(b('影响注意、记忆和决策', 'shapes attention, memory, choice'))} size={10.5} />
      <Mod x={14} y={252} w={352} h={40} side="bio" label={t(b('岛叶', 'Insula'))} sub={t(b('心跳、呼吸和内脏的变化回到大脑，成为感受', 'heart, breath and gut changes return as feeling'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[164, 34], [214, 34]]} />
      <Flow id={id} side="bio" fast pts={[[70, 54], [70, 96]]} label={t(b('快速，十几毫秒', 'fast, ~15 ms'))} lx={40} ly={-8} />
      <Flow id={id} side="bio" pts={[[290, 54], [290, 74], [150, 74], [150, 96]]} label={t(b('慢速通路', 'slow route'))} at={1} ly={-7} />
      <Flow id={id} side="bio" kind="fb" pts={[[196, 116], [184, 116]]} />
      <Flow id={id} side="bio" pts={[[99, 136], [99, 180]]} />
      <Flow id={id} side="bio" pts={[[150, 136], [150, 158], [281, 158], [281, 180]]} />
      <Flow id={id} side="bio" pts={[[99, 220], [99, 252]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 252], [281, 220]]} label={t(b('影响决策', 'shapes choices'))} lx={30} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={96} n={2} side="bio" />
      <Num x={14} y={180} n={3} side="bio" />
      <Num x={196} y={180} n={4} side="bio" />
      <Num x={196} y={96} n={5} side="bio" />
      <Num x={14} y={252} n={6} side="bio" />
    </Svg>
  )
}

/** An agent computes emotion-like signals from value changes that tune its parameters; a safety module blocks actions; language models only change style. */
function FunctionalEmotionArch({ t }: FigProps) {
  const id = 'f33c'
  return (
    <Svg id={id} w={380} h={256} label={t(b('功能性情绪模型的结构与信息流：环境与奖励、情绪信号、调节参数、安全约束、语言模型中的情绪', 'Functional emotion models: environment and reward, emotion signals, parameter tuning, safety constraints, emotion in language models'))}>
      <Mod x={14} y={14} w={352} h={34} side="comp" label={t(b('环境与奖励', 'Environment and reward'))} sub={t(b('观察与奖励', 'observations and rewards'))} size={10.5} />
      <Mod x={14} y={70} w={170} h={40} side="comp" label={t(b('计算情绪信号', 'Emotion signals'))} sub={t(b('价值下降为恐惧，上升为希望', 'value falls: fear; rises: hope'))} size={10.5} />
      <Mod x={196} y={70} w={170} h={40} side="comp" label={t(b('策略', 'Policy'))} sub={t(b('选择动作', 'chooses actions'))} size={10.5} />
      <Mod x={14} y={134} w={170} h={40} side="comp" label={t(b('调节参数', 'Tuned parameters'))} sub={t(b('探索率、学习率、风险态度', 'exploration, learning rate, risk'))} size={10.5} />
      <Mod x={196} y={134} w={170} h={40} side="comp" label={t(b('安全模块', 'Safety module'))} sub={t(b('预测到危险时阻止动作', 'blocks actions predicted unsafe'))} size={10.5} />
      <Mod x={14} y={200} w={170} h={40} side="comp" label={t(b('语言模型中的「情绪」', 'Emotion in an LLM'))} sub={t(b('提示改变风格，没有持续状态', 'prompts shift style, no lasting state'))} size={10.5} />
      <Gap x={196} y={200} w={170} h={40} label={t(b('影响多个系统、可被\n调节的全局状态', 'A global state that moves\nmany systems, regulated'))} />

      <Flow id={id} side="comp" pts={[[99, 48], [99, 70]]} />
      <Flow id={id} side="comp" pts={[[281, 48], [281, 70]]} />
      <Flow id={id} side="comp" pts={[[99, 110], [99, 134]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[184, 154], [190, 154], [190, 90], [196, 90]]} />
      <Flow id={id} side="comp" pts={[[300, 110], [300, 134]]} label={t(b('动作', 'action'))} lx={18} ly={0} />
      <Flow id={id} side="comp" pts={[[366, 154], [374, 154], [374, 31], [366, 31]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={70} n={2} side="comp" />
      <Num x={14} y={134} n={3} side="comp" />
      <Num x={196} y={134} n={4} side="comp" />
      <Num x={14} y={200} n={5} side="comp" />
      <Num x={196} y={200} n={6} side="comp" />
    </Svg>
  )
}

export const EMOTION_REG_FIGS: TopicFigs = {
  arch: { brain: FearBrainArch, ai: FunctionalEmotionArch },
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
