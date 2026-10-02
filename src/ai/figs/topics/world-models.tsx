import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Efference copy to a cerebellar forward model, comparison with real feedback, and prediction between cortical levels. */
function ForwardModelArch({ t }: FigProps) {
  const id = 'f17b'
  return (
    <Svg id={id} w={380} h={296} label={t(b('大脑预测的结构与信息流：运动皮层、小脑前向模型、比较、皮层层级与心理模拟', 'Prediction in the brain: motor cortex, cerebellar forward model, comparison, cortical hierarchy and mental simulation'))}>
      <Mod x={14} y={14} w={150} h={36} side="bio" label={t(b('运动皮层', 'Motor cortex'))} sub={t(b('发出运动指令', 'issues the command'))} />
      <Mod x={216} y={14} w={150} h={36} side="bio" label={t(b('身体', 'Body'))} sub={t(b('动作产生真实感觉', 'movement makes real sensation'))} />
      <Mod x={14} y={86} w={150} h={44} side="bio" label={t(b('小脑前向模型', 'Cerebellar model'))} sub={t(b('预测感觉结果', 'predicts the sensation'))} />
      <Var cx={291} cy={108} side="bio" label={t(b('比较', 'Compare'))} r={20} />
      <Region x={6} y={172} w={368} h={64} side="bio" label={t(b('皮层层级', 'Cortical hierarchy'))} />
      <Mod x={18} y={190} w={150} h={34} side="bio" label={t(b('高级皮层', 'Higher cortex'))} sub={t(b('发送预测', 'sends predictions'))} size={10.5} />
      <Mod x={212} y={190} w={150} h={34} side="bio" label={t(b('低级皮层', 'Lower cortex'))} sub={t(b('上传误差', 'sends errors up'))} size={10.5} />
      <Mod x={110} y={252} w={160} h={34} side="bio" label={t(b('心理模拟', 'Mental simulation'))} sub={t(b('前额叶与海马', 'prefrontal, hippocampus'))} size={10.5} />

      <Flow id={id} side="bio" fast pts={[[164, 32], [216, 32]]} />
      <Flow id={id} side="bio" fast pts={[[89, 50], [89, 86]]} label={t(b('传出副本', 'efference copy'))} lx={34} ly={0} />
      <Flow id={id} side="bio" fast pts={[[164, 108], [271, 108]]} label={t(b('预测', 'prediction'))} ly={-7} />
      <Flow id={id} side="bio" pts={[[291, 50], [291, 88]]} label={t(b('真实感觉', 'real sensation'))} lx={34} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[291, 128], [291, 152], [40, 152], [40, 130]]} label={t(b('误差修正模型', 'error corrects the model'))} at={1} ly={-6} />
      <Flow id={id} side="bio" kind="fb" pts={[[168, 200], [212, 200]]} />
      <Flow id={id} side="bio" pts={[[212, 216], [168, 216]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[60, 224], [60, 269], [110, 269]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={86} n={2} side="bio" />
      <Num x={318} y={92} n={3} side="bio" />
      <Num x={110} y={152} n={4} side="bio" />
      <Num x={190} y={172} n={5} side="bio" />
      <Num x={110} y={252} n={6} side="bio" />
    </Svg>
  )
}

/** A Dreamer-style world model: encoder, latent dynamics, prediction heads, imagined rollouts and actor-critic learning. */
function DreamerArch({ t }: FigProps) {
  const id = 'f17c'
  return (
    <Svg id={id} w={380} h={322} label={t(b('学习型世界模型的结构与信息流', 'Structure and information flow of a learned world model'))}>
      <Mod x={14} y={14} w={110} h={32} side="comp" label={t(b('观测', 'Observation'))} size={10.5} />
      <Mod x={150} y={14} w={216} h={32} side="comp" label={t(b('预测头', 'Prediction heads'))} sub={t(b('重建观测、预测奖赏', 'reconstruct, predict reward'))} size={10.5} />
      <Mod x={14} y={70} w={110} h={40} side="comp" label={t(b('编码器', 'Encoder'))} sub={t(b('压缩为潜在状态', 'to a latent state'))} size={10.5} />
      <Mod x={150} y={70} w={216} h={40} side="comp" label={t(b('动态模型', 'Dynamics model'))} sub={t(b('由状态和动作预测下一步', 'next state from state and action'))} />
      <Region x={6} y={134} w={368} h={136} side="comp" label={t(b('在想象中学习', 'Learning in imagination'))} />
      <Mod x={18} y={158} w={344} h={40} side="comp" label={t(b('想象轨迹', 'Imagined trajectory'))} sub={t(b('在潜在空间中展开约 15 步', 'about 15 steps in latent space'))} />
      <Mod x={18} y={222} w={166} h={36} side="comp" label={t(b('行动者', 'Actor'))} sub={t(b('选择动作', 'chooses actions'))} size={10.5} />
      <Mod x={196} y={222} w={166} h={36} side="comp" label={t(b('评论家', 'Critic'))} sub={t(b('估计价值', 'estimates value'))} size={10.5} />
      <Gap x={110} y={282} w={160} h={32} label={t(b('可外推的物理规律', 'Extrapolating physical laws'))} />

      <Flow id={id} side="comp" pts={[[69, 46], [69, 70]]} />
      <Flow id={id} side="comp" pts={[[124, 90], [150, 90]]} />
      <Flow id={id} side="comp" pts={[[258, 70], [258, 46]]} />
      <Flow id={id} side="comp" pts={[[258, 110], [258, 158]]} />
      <Flow id={id} side="comp" pts={[[120, 198], [120, 222]]} />
      <Flow id={id} side="comp" pts={[[279, 198], [279, 222]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[60, 222], [60, 198]]} label={t(b('动作', 'actions'))} lx={-18} ly={0} />
      <Num x={14} y={70} n={1} side="comp" />
      <Num x={150} y={70} n={2} side="comp" />
      <Num x={150} y={14} n={3} side="comp" />
      <Num x={18} y={158} n={4} side="comp" />
      <Num x={18} y={222} n={5} side="comp" />
      <Num x={110} y={282} n={6} side="comp" />
    </Svg>
  )
}

export const WORLD_MODEL_FIGS: TopicFigs = {
  arch: { brain: ForwardModelArch, ai: DreamerArch },
}
