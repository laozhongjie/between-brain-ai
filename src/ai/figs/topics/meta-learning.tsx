import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store, Var } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Prefrontal meta-RL: slow dopamine learning shapes a recurrent prefrontal network that learns in its activity. */
function PrefrontalMetaArch({ t }: FigProps) {
  const id = 'f08b'
  return (
    <Svg id={id} w={380} h={268} label={t(b('前额叶元强化学习的结构与信息流', 'Structure and information flow of prefrontal meta-reinforcement learning'))}>
      <Mod x={14} y={14} w={352} h={32} side="bio" label={t(b('观察、上一个动作与上一次奖赏', 'Observation, last action, last reward'))} size={10.5} />
      <Mod x={14} y={84} w={84} h={46} side="bio" label={t(b('多巴胺', 'Dopamine'))} sub={t(b('慢速学习', 'slow learning'))} />
      <Mod x={118} y={84} w={144} h={46} side="bio" label={t(b('前额叶', 'Prefrontal cortex'))} sub={t(b('循环网络', 'recurrent network'))} />
      <Mod x={282} y={84} w={84} h={46} side="bio" label={t(b('前扣带', 'ACC'))} sub={t(b('调节学习速度', 'tunes speed'))} size={10.5} />
      <Mod x={118} y={160} w={144} h={36} side="bio" label={t(b('纹状体与运动区', 'Striatum, motor areas'))} sub={t(b('选择动作', 'choose action'))} size={10.5} />
      <Var cx={190} cy={240} side="bio" label={t(b('结果', 'Outcome'))} r={15} />

      <Flow id={id} side="bio" pts={[[140, 46], [140, 84]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[180, 84], [240, 84]]} curve={[210, 58]} label={t(b('活动在试验间保持', 'activity carries over'))} ly={-8} lx={40} />
      <Flow id={id} side="bio" kind="fb" pts={[[98, 107], [118, 107]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[282, 107], [262, 107]]} />
      <Flow id={id} side="bio" pts={[[190, 130], [190, 160]]} />
      <Flow id={id} side="bio" pts={[[190, 196], [190, 225]]} />
      <Flow id={id} side="bio" pts={[[175, 240], [8, 240], [8, 30], [14, 30]]} label={t(b('下一次输入', 'next input'))} ly={-7} />
      <Num x={14} y={84} n={1} side="bio" />
      <Num x={118} y={84} n={2} side="bio" />
      <Num x={168} y={66} n={3} side="bio" />
      <Num x={118} y={160} n={4} side="bio" />
      <Num x={282} y={84} n={5} side="bio" />
    </Svg>
  )
}

/** In-context learning in a frozen model on the left, a MAML-style meta-learner on the right. */
function InContextArch({ t }: FigProps) {
  const id = 'f08c'
  return (
    <Svg id={id} w={380} h={306} label={t(b('上下文学习与元学习算法的结构与信息流', 'Structure and information flow of in-context learning and meta-learning algorithms'))}>
      <Mod x={14} y={14} w={200} h={36} side="comp" label={t(b('预训练', 'Pretraining'))} sub={t(b('梯度下降，数周到数月', 'gradient descent, weeks to months'))} />
      <Store x={14} y={72} w={200} h={56} side="comp" label={t(b('参数', 'Parameters'))} sub={t(b('之后冻结', 'then frozen'))} />
      <Mod x={14} y={150} w={200} h={36} side="comp" label={t(b('提示中的示例', 'Examples in the prompt'))} sub={t(b('几组问答加一个新问题', 'a few Q&A pairs plus a question'))} />
      <Mod x={14} y={206} w={200} h={40} side="comp" label={t(b('注意力层', 'Attention layers'))} sub={t(b('归纳头读取示例', 'induction heads read examples'))} />
      <Mod x={14} y={266} w={200} h={30} side="comp" label={t(b('输出', 'Output'))} size={10.5} />
      <Region x={240} y={10} w={134} h={156} side="comp" label={t(b('元学习（MAML）', 'Meta-learning (MAML)'))} />
      <Mod x={252} y={40} w={110} h={40} side="comp" label={t(b('外层', 'Outer loop'))} sub={t(b('调整起点', 'adjusts the start'))} size={10.5} />
      <Mod x={252} y={110} w={110} h={40} side="comp" label={t(b('内层', 'Inner loop'))} sub={t(b('每个任务几步梯度', 'a few steps per task'))} size={10.5} />
      <Gap x={240} y={260} w={126} h={36} label={t(b('巩固进参数', 'Consolidation\ninto weights'))} />

      <Flow id={id} side="comp" pts={[[114, 50], [114, 72]]} />
      <Flow id={id} side="comp" head="read" pts={[[214, 100], [228, 100], [228, 226], [214, 226]]} />
      <Flow id={id} side="comp" pts={[[114, 186], [114, 206]]} />
      <Flow id={id} side="comp" pts={[[114, 246], [114, 266]]} />
      <Flow id={id} side="comp" pts={[[290, 80], [290, 110]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[330, 110], [330, 80]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={150} n={2} side="comp" />
      <Num x={14} y={206} n={3} side="comp" />
      <Num x={14} y={266} n={4} side="comp" />
      <Num x={240} y={10} n={5} side="comp" />
      <Num x={240} y={260} n={6} side="comp" />
    </Svg>
  )
}

/** Fast and slow learning in both systems, from seconds to months. */
function MetaTimeline({ t }: FigProps) {
  const id = 'f08d'
  const ticks: [number, Bi][] = [[150, b('1 秒', '1 s')], [220, b('10 秒', '10 s')], [280, b('1 分钟', '1 min')], [340, b('10 分钟', '10 min')], [400, b('1 小时', '1 h')], [480, b('1 天', '1 day')], [550, b('1 周', '1 week')], [610, b('1 月', '1 month')], [690, b('1 年', '1 year')]]
  return (
    <Svg id={id} w={760} h={250} label={t(b('快学习与慢学习的时间尺度', 'Time scales of fast and slow learning'))}>
      <T x={16} y={44} anchor="start" s={t(b('前额叶元\n强化学习', 'Prefrontal\nmeta-RL'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={176} anchor="start" s={t(b('上下文学习\n与元学习', 'In-context and\nmeta-learning'))} size={10.5} color={C.skyD} weight={600} />

      <Mod x={150} y={26} w={70} h={36} side="bio" label={t(b('每次试验', 'Each trial'))} sub={t(b('秒', 'seconds'))} size={10.5} />
      <Mod x={220} y={26} w={120} h={36} side="bio" label={t(b('学会新问题', 'New problem learned'))} sub={t(b('几分钟', 'minutes'))} size={10.5} />
      <Mod x={400} y={26} w={80} h={36} side="bio" label={t(b('巩固', 'Consolidation'))} sub={t(b('夜间睡眠', 'overnight sleep'))} size={10} />
      <Mod x={480} y={26} w={210} h={36} side="bio" label={t(b('学会怎么学', 'Learning to learn'))} sub={t(b('多巴胺塑造前额叶，天到月', 'dopamine shapes PFC, days to months'))} size={10.5} />

      <line x1={140} y1={100} x2={752} y2={100} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={96} x2={x} y2={104} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={115} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      <Mod x={150} y={150} w={70} h={36} side="comp" label={t(b('上下文学习', 'In-context'))} sub={t(b('一次提示内', 'one prompt'))} size={10} />
      <Mod x={400} y={150} w={80} h={36} side="comp" label={t(b('微调', 'Fine-tuning'))} sub={t(b('数小时', 'hours'))} size={10.5} />
      <Mod x={550} y={150} w={140} h={36} side="comp" label={t(b('预训练与元训练', 'Pre- and meta-training'))} sub={t(b('数周到数月', 'weeks to months'))} size={10.5} />
      <Gap x={220} y={202} w={180} h={30} label={t(b('会话结束即清空', 'Cleared when the session ends'))} />
      <Num x={150} y={26} n={1} side="bio" />
      <Num x={220} y={26} n={2} side="bio" />
      <Num x={480} y={26} n={4} side="bio" />
      <Num x={400} y={26} n={3} side="bio" />
      <Num x={150} y={150} n={1} side="comp" />
      <Num x={400} y={150} n={2} side="comp" />
      <Num x={550} y={150} n={3} side="comp" />
      <Num x={220} y={202} n={4} side="comp" />
    </Svg>
  )
}

export const META_FIGS: TopicFigs = {
  arch: { brain: PrefrontalMetaArch, ai: InContextArch },
  dynamics: MetaTimeline,
}
