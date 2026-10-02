import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Mod, Num, Region, Var } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Cortex gives the state, the ventral striatum its value, taste and hypothalamus the reward; VTA dopamine computes actual minus expected and broadcasts it. */
function RewardBrainArch({ t }: FigProps) {
  const id = 'f30b'
  return (
    <Svg id={id} w={380} h={270} label={t(b('多巴胺奖赏预测误差的结构与信息流：皮层的状态、腹侧纹状体与眶额皮层的价值、实际奖赏、腹侧被盖区的多巴胺误差、广播与更新、分布式编码', 'Dopamine reward prediction error: cortical state, value in ventral striatum and orbitofrontal cortex, actual reward, dopamine error in the VTA, broadcast and update, distributional coding'))}>
      <Mod x={14} y={14} w={170} h={40} side="bio" label={t(b('皮层', 'Cortex'))} sub={t(b('线索与情境：当前状态', 'cues and context: the state'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('腹侧纹状体与眶额皮层', 'Ventral striatum, OFC'))} sub={t(b('估计当前状态的价值', 'value of the state'))} size={10} />
      <Mod x={14} y={98} w={170} h={40} side="bio" label={t(b('味觉与下丘脑通路', 'Taste, hypothalamus'))} sub={t(b('报告实际得到的奖赏', 'report the actual reward'))} size={10.5} />
      <Region x={196} y={78} w={170} h={122} side="bio" label={t(b('中脑腹侧被盖区', 'Ventral tegmental area'))} />
      <Mod x={206} y={100} w={150} h={38} side="bio" label={t(b('多巴胺神经元', 'Dopamine neurons'))} sub={t(b('实际减去预期', 'actual minus expected'))} size={10.5} />
      <Var cx={236} cy={170} side="bio" label={t(b('乐观', 'opt.'))} r={14} />
      <Var cx={281} cy={170} side="bio" label={t(b('中', 'mid'))} r={14} />
      <Var cx={326} cy={170} side="bio" label={t(b('悲观', 'pess.'))} r={14} />
      <Mod x={14} y={216} w={170} h={40} side="bio" label={t(b('背侧纹状体', 'Dorsal striatum'))} sub={t(b('动作选择', 'action selection'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[184, 118], [206, 118]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[260, 54], [260, 100]]} label={t(b('按预期减去', 'minus the expectation'))} lx={-36} ly={-12} />
      <Flow id={id} side="bio" kind="fb" pts={[[340, 100], [340, 54]]} label={t(b('更新价值', 'update value'))} lx={-32} ly={-12} />
      <Flow id={id} side="bio" kind="fb" pts={[[230, 200], [230, 236], [184, 236]]} label={t(b('更新动作', 'update action'))} at={1} ly={-7} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={196} y={14} n={2} side="bio" />
      <Num x={14} y={98} n={3} side="bio" />
      <Num x={206} y={100} n={4} side="bio" />
      <Num x={252} y={216} n={5} side="bio" />
      <Num x={354} y={188} n={6} side="bio" />
    </Svg>
  )
}

/** An encoder gives the state; a critic (with a distributional head) values it, an actor chooses; the environment's reward drives one TD error that updates both. */
function ActorCriticArch({ t }: FigProps) {
  const id = 'f30c'
  return (
    <Svg id={id} w={380} h={264} label={t(b('时序差分与分布式强化学习的结构与信息流：状态编码、评论家、行动者、环境的奖励、时序差分误差、分布式价值头', 'Temporal-difference and distributional RL: state encoding, critic, actor, reward from the environment, TD error, distributional value head'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('状态编码', 'State encoding'))} sub={t(b('画面变成状态向量', 'the observation becomes a state vector'))} size={10.5} />
      <Region x={6} y={64} w={186} h={110} side="comp" label={t(b('评论家', 'Critic'))} />
      <Mod x={16} y={86} w={166} h={34} side="comp" label={t(b('价值', 'Value'))} sub={t(b('估计状态价值', 'estimates state value'))} size={10.5} />
      <Mod x={16} y={130} w={166} h={34} side="comp" label={t(b('分布式价值头', 'Distributional head'))} sub={t(b('一组分位数', 'a set of quantiles'))} size={10.5} />
      <Mod x={204} y={86} w={162} h={40} side="comp" label={t(b('行动者', 'Actor'))} sub={t(b('动作概率，选择动作', 'action probabilities, a choice'))} size={10.5} />
      <Mod x={204} y={150} w={162} h={40} side="comp" label={t(b('环境', 'Environment'))} sub={t(b('奖励规则由设计者规定', 'reward rules set by a designer'))} size={10.5} />
      <Mod x={14} y={212} w={352} h={40} side="comp" label={t(b('时序差分误差', 'TD error'))} sub={t(b('奖励加下一状态的价值，减当前价值', 'reward plus next value, minus current value'))} size={10.5} />

      <Flow id={id} side="comp" pts={[[99, 50], [99, 86]]} />
      <Flow id={id} side="comp" pts={[[285, 50], [285, 86]]} />
      <Flow id={id} side="comp" pts={[[285, 126], [285, 150]]} label={t(b('动作', 'action'))} lx={18} ly={0} />
      <Flow id={id} side="comp" pts={[[285, 190], [285, 212]]} label={t(b('奖励', 'reward'))} lx={18} ly={0} />
      <Flow id={id} side="comp" pts={[[70, 174], [70, 212]]} label={t(b('价值', 'value'))} lx={18} ly={0} />
      <Flow id={id} side="comp" kind="fb" pts={[[150, 212], [150, 174]]} label={t(b('更新', 'update'))} lx={20} ly={0} />
      <Flow id={id} side="comp" kind="fb" pts={[[366, 232], [374, 232], [374, 106], [366, 106]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={16} y={86} n={2} side="comp" />
      <Num x={204} y={86} n={3} side="comp" />
      <Num x={204} y={150} n={4} side="comp" />
      <Num x={14} y={212} n={5} side="comp" />
      <Num x={16} y={130} n={6} side="comp" />
    </Svg>
  )
}

export const REWARD_FIGS: TopicFigs = {
  arch: { brain: RewardBrainArch, ai: ActorCriticArch },
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
