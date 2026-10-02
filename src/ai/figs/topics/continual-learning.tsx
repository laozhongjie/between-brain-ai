import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num, Store } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Complementary learning systems: a fast hippocampal store replays into a slow neocortical store. */
function ComplementaryArch({ t }: FigProps) {
  const id = 'f09b'
  return (
    <Svg id={id} w={380} h={284} label={t(b('互补学习系统与突触巩固的结构与信息流', 'Structure and information flow of complementary learning systems and synaptic consolidation'))}>
      <Mod x={14} y={14} w={352} h={30} side="bio" label={t(b('新经历', 'New experience'))} size={10.5} />
      <Store x={14} y={70} w={150} h={60} side="bio" label={t(b('海马', 'Hippocampus'))} sub={t(b('快速写入、稀疏编码', 'fast writes, sparse code'))} />
      <Store x={216} y={70} w={150} h={60} side="bio" label={t(b('新皮层', 'Neocortex'))} sub={t(b('缓慢学习、交错整合', 'slow, interleaved learning'))} />
      <Mod x={110} y={160} w={160} h={40} side="bio" label={t(b('睡眠回放', 'Sleep replay'))} sub={t(b('新旧内容交错', 'new and old interleaved'))} />
      <Mod x={14} y={230} w={150} h={40} side="bio" label={t(b('突触巩固', 'Synaptic consolidation'))} sub={t(b('重要连接稳定下来', 'key connections stabilize'))} size={10.5} />
      <Mod x={216} y={230} w={150} h={40} side="bio" label={t(b('干扰与修剪', 'Interference, pruning'))} sub={t(b('相似内容相互重叠', 'similar content overlaps'))} size={10.5} />

      <Flow id={id} side="bio" fast pts={[[89, 44], [89, 70]]} label={t(b('一次写入', 'one shot'))} lx={30} ly={0} />
      <Flow id={id} side="bio" pts={[[291, 44], [291, 70]]} label={t(b('缓慢', 'slowly'))} lx={22} ly={0} />
      <Flow id={id} side="bio" head="read" pts={[[89, 130], [89, 180], [110, 180]]} />
      <Flow id={id} side="bio" pts={[[270, 180], [291, 180], [291, 130]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[50, 230], [50, 130]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[330, 230], [330, 130]]} />
      <Num x={14} y={72} n={1} side="bio" />
      <Num x={14} y={230} n={2} side="bio" />
      <Num x={110} y={160} n={3} side="bio" />
      <Num x={216} y={72} n={4} side="bio" />
      <Num x={216} y={230} n={5} side="bio" />
    </Svg>
  )
}

/** Sequential tasks update shared parameters; replay, regularization and isolation protect old tasks. */
function ContinualMethodsArch({ t }: FigProps) {
  const id = 'f09c'
  return (
    <Svg id={id} w={380} h={288} label={t(b('持续学习方法的结构与信息流', 'Structure and information flow of continual learning methods'))}>
      <Mod x={14} y={14} w={352} h={30} side="comp" label={t(b('任务按顺序到来：A，然后 B……', 'Tasks in sequence: A, then B …'))} size={10.5} />
      <Store x={110} y={66} w={160} h={58} side="comp" label={t(b('共享参数', 'Shared parameters'))} />
      <Store x={14} y={150} w={110} h={56} side="comp" label={t(b('回放缓冲区', 'Replay buffer'))} sub={t(b('旧样本', 'old samples'))} />
      <Mod x={135} y={150} w={110} h={56} side="comp" label={t(b('正则化', 'Regularization'))} sub={t(b('重要参数拉回原位', 'pulls key weights back'))} size={10.5} />
      <Mod x={256} y={150} w={110} h={56} side="comp" label={t(b('参数隔离', 'Isolation'))} sub={t(b('新增适配器', 'new adapters'))} size={10.5} />
      <Gap x={110} y={236} w={160} h={40} label={t(b('离线自动整合', 'Automatic offline\nintegration'))} />

      <Flow id={id} side="comp" pts={[[190, 44], [190, 66]]} label={t(b('梯度下降', 'gradient descent'))} lx={36} ly={0} />
      <Flow id={id} side="comp" head="read" pts={[[69, 150], [69, 95], [110, 95]]} label={t(b('混入训练', 'mixed in'))} at={1} ly={-7} />
      <Flow id={id} side="comp" kind="fb" pts={[[190, 150], [190, 124]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[311, 150], [311, 95], [270, 95]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={110} y={68} n={2} side="comp" />
      <Num x={14} y={152} n={3} side="comp" />
      <Num x={135} y={150} n={4} side="comp" />
      <Num x={256} y={150} n={5} side="comp" />
      <Num x={110} y={236} n={6} side="comp" />
    </Svg>
  )
}

export const CONTINUAL_FIGS: TopicFigs = {
  arch: { brain: ComplementaryArch, ai: ContinualMethodsArch },
}
