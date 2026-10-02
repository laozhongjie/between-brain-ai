import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
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

/** Learning and forgetting from minutes to a lifetime. */
function ContinualTimeline({ t }: FigProps) {
  const id = 'f09d'
  const ticks: [number, Bi][] = [[150, b('1 分钟', '1 min')], [240, b('1 小时', '1 h')], [320, b('1 天', '1 day')], [400, b('1 周', '1 week')], [470, b('1 月', '1 month')], [560, b('1 年', '1 year')], [650, b('10 年', '10 years')], [730, b('数十年', 'decades')]]
  return (
    <Svg id={id} w={760} h={250} label={t(b('学习与遗忘的时间尺度', 'Time scales of learning and forgetting'))}>
      <T x={16} y={44} anchor="start" s={t(b('突触巩固与\n互补学习', 'Consolidation,\nCLS'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={176} anchor="start" s={t(b('持续学习\n方法', 'Continual\nlearning'))} size={10.5} color={C.skyD} weight={600} />

      <Mod x={150} y={26} w={90} h={36} side="bio" label={t(b('编码', 'Encoding'))} sub={t(b('分钟', 'minutes'))} />
      <Mod x={240} y={26} w={80} h={36} side="bio" label={t(b('突触巩固', 'Synaptic'))} sub={t(b('小时', 'hours'))} size={10.5} />
      <Mod x={320} y={26} w={150} h={36} side="bio" label={t(b('系统巩固', 'Systems consolidation'))} sub={t(b('夜间到数周', 'nights to weeks'))} size={10.5} />
      <Mod x={470} y={26} w={260} h={36} side="bio" label={t(b('维持与修剪', 'Maintenance and pruning'))} sub={t(b('数月到终身', 'months to a lifetime'))} />

      <line x1={140} y1={100} x2={752} y2={100} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={96} x2={x} y2={104} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={115} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      <Mod x={150} y={150} w={80} h={36} side="comp" label={t(b('逐步更新', 'Step updates'))} sub={t(b('几分钟内数千步', '1000s of steps in minutes'))} size={10.5} />
      <Mod x={240} y={150} w={80} h={36} side="comp" label={t(b('任务切换', 'Task switch'))} size={10.5} />
      <Mod x={320} y={150} w={150} h={36} side="comp" label={t(b('长期连续训练', 'Long continual training'))} sub={t(b('可塑性可能下降', 'plasticity may fade'))} size={10.5} />
      <Gap x={470} y={150} w={260} h={36} label={t(b('部署：冻结，定期重新训练新版本', 'Deployed: frozen, retrained as new versions'))} />
      <Num x={150} y={26} n={1} side="bio" />
      <Num x={240} y={26} n={2} side="bio" />
      <Num x={320} y={26} n={3} side="bio" />
      <Num x={470} y={26} n={4} side="bio" />
      <Num x={150} y={150} n={1} side="comp" />
      <Num x={240} y={150} n={2} side="comp" />
      <Num x={320} y={150} n={3} side="comp" />
      <Num x={470} y={150} n={4} side="comp" />
    </Svg>
  )
}

export const CONTINUAL_FIGS: TopicFigs = {
  arch: { brain: ComplementaryArch, ai: ContinualMethodsArch },
  dynamics: ContinualTimeline,
}
