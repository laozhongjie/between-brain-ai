import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store, Var } from '../grammar'
import { Axes, Bar, Dot, Label, Path, Ref, SIDE_COLOR, Vec, px, py, trace, type Frame } from '../plot'
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

/** After a rule change (reward drops to 0), the expectation with an adaptive learning rate (η = 0.5, starting at 0.1)
 * against a fixed rate of 0.1, and the adaptive rate itself. */
function AdaptiveRatePlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const n = 10
  const adaptive: number[] = [0.8], rates: number[] = [0.1]
  for (let i = 0; i < n; i++) {
    const v = adaptive[i], a = rates[i], d = 0 - v
    adaptive.push(v + a * d)
    rates.push(0.5 * Math.abs(d) + 0.5 * a)
  }
  const fixed = Array.from({ length: n + 1 }, (_, i) => 0.8 * Math.pow(0.9, i))
  const f: Frame = { x: 40, y: 28, w: 250, h: 96, xr: [0, n], yr: [0, 0.9] }
  const f2: Frame = { x: 40, y: 150, w: 250, h: 40, xr: [0, n], yr: [0, 0.7] }
  const line = (fr: Frame, vs: number[]) => vs.map((v, i) => [px(fr, i), py(fr, v)] as [number, number])
  return (
    <Svg id="f08mb0" w={380} h={226} label={t(b('规则改变后，学习率自动升高，预期下降得比固定学习率快得多', 'After a rule change the learning rate rises on its own, and the expectation falls far faster than with a fixed rate'))}>
      <Axes f={f} yTicks={[[0, '0'], [0.4, '0.4'], [0.8, '0.8']]} yLabel={t(b('对奖赏的预期 V', 'Expected reward V'))} grid />
      <Path pts={line(f, fixed)} color={C.dim} />
      <Path pts={line(f, adaptive)} color={col} />
      {adaptive.map((v, i) => <circle key={i} cx={px(f, i)} cy={py(f, v)} r={2.4} fill={col} />)}
      <Label x={f.x + f.w + 6} y={py(f, fixed[n])} s={t(b('固定 α = 0.1', 'fixed α = 0.1'))} anchor="start" size={10} />
      <Label x={f.x + f.w + 6} y={py(f, adaptive[n]) + 2} s={t(b('自适应 α', 'adaptive α'))} anchor="start" size={10} color={col} />
      <Label x={px(f, 1) + 6} y={py(f, adaptive[1]) - 2} s="0.72" anchor="start" size={10} color={col} />
      <Label x={px(f, 2) + 6} y={py(f, adaptive[2]) - 2} s="0.40" anchor="start" size={10} color={col} />
      <Axes f={f2} xTicks={[[0, '0'], [2, '2'], [4, '4'], [6, '6'], [8, '8'], [10, '10']]} yTicks={[[0, '0'], [0.5, '0.5']]} xLabel={t(b('规则改变后的试次', 'Trials after the rule change'))} />
      <Ref f={f2} y={0.1} />
      {rates.slice(0, n).map((a, i) => <Bar key={i} f={f2} x={i + 0.5} v={a} w={0.6} color={col} opacity={0.7} />)}
      <Label x={f2.x + f2.w + 6} y={py(f2, 0.35)} s={t(b('学习率 α\n（虚线为 0.1）', 'learning rate α\n(dashed: 0.1)'))} anchor="start" size={10} color={col} />
    </Svg>
  )
}

/** MAML on two tasks with losses (θ − 1)² and (θ + 1)², α = 0.25: the loss after one adaptation step is lowest at θ = 0. */
function MamlPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 40, y: 30, w: 300, h: 130, xr: [-2, 2], yr: [0, 4] }
  const after = (th: number) => 0.25 * (th - 1) ** 2 + 0.25 * (th + 1) ** 2
  return (
    <Svg id="f08mc0" w={380} h={204} label={t(b('MAML：适应一步后的总损失在两个任务中间最低，从那里一步就能向任一任务靠近一半', 'MAML: the total loss after one step is lowest between the two tasks, and from there one step goes halfway to either'))}>
      <Axes f={f} xTicks={[[-2, '−2'], [-1, '−1'], [0, '0'], [1, '1'], [2, '2']]} yTicks={[[0, '0'], [2, '2'], [4, '4']]} xLabel={t(b('共享的起点 θ', 'Shared starting point θ'))} yLabel={t(b('损失', 'Loss'))} grid />
      <Path pts={trace(f, (th) => (th - 1) ** 2)} color={C.dim} />
      <Path pts={trace(f, (th) => (th + 1) ** 2)} color={C.dim} />
      <Label x={px(f, 1)} y={py(f, 0) - 10} s={t(b('任务 1', 'task 1'))} size={10} />
      <Label x={px(f, -1)} y={py(f, 0) - 10} s={t(b('任务 2', 'task 2'))} size={10} />
      <Path pts={trace(f, after)} color={col} width={2.2} />
      <Dot f={f} x={0} y={after(0)} color={col} />
      <Label x={px(f, 1.02)} y={py(f, 3.1)} s={t(b('适应一步后的总损失\n最低在 θ = 0', 'loss after a step,\nlowest at θ = 0'))} anchor="start" size={10} color={col} />
      <Vec x1={px(f, 0)} y1={py(f, 0.2)} x2={px(f, 0.5)} y2={py(f, 0.2)} color={col} width={1.6} />
      <Vec x1={px(f, 0)} y1={py(f, 0.2)} x2={px(f, -0.5)} y2={py(f, 0.2)} color={col} width={1.6} />
    </Svg>
  )
}

export const META_FIGS: TopicFigs = {
  arch: { brain: PrefrontalMetaArch, ai: InContextArch },
  math: {
    bio: {
      0: { Fig: AdaptiveRatePlot, cap: b('小例子的延续：奖赏突然变为 $0$。固定学习率 $0.1$ 时预期每次只降一成；自适应时大误差把学习率推到 $0.45$ 以上，预期第二次就降到 $0.40$，几次之后接近 $0$。误差变小后，学习率又回落。', 'The worked example continued: reward suddenly drops to $0$. With a fixed rate of $0.1$ the expectation falls a tenth per trial. With the adaptive rate the large errors push the rate above $0.45$, the expectation reaches $0.40$ by the second trial and nears $0$ within a few. As errors shrink, the rate falls back.') },
    },
    comp: {
      0: { Fig: MamlPlot, cap: b('灰线是两个任务各自的损失，最低点在 $\\pm 1$。蓝线是从起点 $\\theta$ 在每个任务上走一步后的总损失 $0.25\\,(\\theta - 1)^2 + 0.25\\,(\\theta + 1)^2$，最低在 $\\theta = 0$。从这里一步就到 $\\pm 0.5$，向任一任务靠近了一半（箭头）。', 'Gray curves are the two tasks’ own losses, lowest at $\\pm 1$. The blue curve is the total loss after one step on each task from start $\\theta$, $0.25\\,(\\theta - 1)^2 + 0.25\\,(\\theta + 1)^2$, lowest at $\\theta = 0$. From there one step reaches $\\pm 0.5$, halfway to either task (arrows).') },
    },
  },
}
