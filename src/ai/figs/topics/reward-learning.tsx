import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Mod, Num, Region, Var } from '../grammar'
import { Axes, Bar, Dot, Label, Path, Ref, SIDE_COLOR, STEPS, px, py, trace, type Frame } from '../plot'
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

/** The dopamine response in the worked example: before learning, after learning, and after learning with the reward left out. */
function RpeTransferPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const x0 = 104, x1 = 364, tr: [number, number] = [-0.4, 1.5]
  const X = (s: number) => x0 + ((s - tr[0]) / (tr[1] - tr[0])) * (x1 - x0)
  const rows: { y: number; label: string; cue: number; rew: number }[] = [
    { y: 56, label: t(b('学习前', 'Before learning')), cue: 0, rew: 1 },
    { y: 114, label: t(b('学习后', 'After learning')), cue: 1, rew: 0 },
    { y: 172, label: t(b('学习后，\n奖赏没来', 'After learning,\nno reward')), cue: 1, rew: -1 },
  ]
  const bump = (s: number, at: number) => Math.exp(-((s - at) ** 2) / (2 * 0.045 ** 2))
  const axis = 206
  return (
    <Svg id="f30mb0" w={380} h={242} label={t(b('多巴胺反应从奖赏转移到线索；奖赏没来时放电暂停', 'The dopamine response moves from the reward to the cue; a missing reward brings a pause'))}>
      <Label x={X(0)} y={16} s={t(b('线索', 'Cue'))} color={C.ink} />
      <Label x={X(1)} y={16} s={t(b('奖赏', 'Reward'))} color={C.ink} />
      <line x1={X(0)} x2={X(0)} y1={26} y2={axis} stroke={C.dim} strokeDasharray="3 3" />
      <line x1={X(1)} x2={X(1)} y1={26} y2={axis} stroke={C.dim} strokeDasharray="3 3" />
      {rows.map((r) => (
        <g key={r.y}>
          <Label x={10} y={r.y} s={r.label} anchor="start" />
          <Path pts={Array.from({ length: 241 }, (_, i) => { const s2 = tr[0] + ((tr[1] - tr[0]) * i) / 240; return [X(s2), r.y - 24 * (r.cue * bump(s2, 0) + r.rew * bump(s2, 1))] as [number, number] })} color={col} />
          <Label x={X(0) + 8} y={r.y - (r.cue ? 18 : 9)} s={`δ = ${r.cue}`} anchor="start" size={10} color={r.cue ? col : C.dim} />
          <Label x={X(1) + 8} y={r.y + (r.rew < 0 ? 18 : r.rew ? -18 : -9)} s={`δ = ${r.rew < 0 ? '−1' : r.rew}`} anchor="start" size={10} color={r.rew ? col : C.dim} />
        </g>
      ))}
      <line x1={x0} x2={x1} y1={axis} y2={axis} stroke={C.dim} />
      {[0, 1].map((s2) => <text key={s2} x={X(s2)} y={axis + 11} fontSize={10} textAnchor="middle" dominantBaseline="middle" fill={C.dim}>{s2}</text>)}
      <Label x={(x0 + x1) / 2} y={axis + 27} s={t(b('时间（秒）', 'Time (s)'))} />
    </Svg>
  )
}

/** Rewards of 0 or 10, half the time each: a neuron with asymmetry τ settles where τ(10 − V) = (1 − τ)V, at V = 10τ. */
function DistributionalPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f1: Frame = { x: 70, y: 26, w: 270, h: 44, xr: [-1, 11], yr: [0, 0.6] }
  const f2: Frame = { x: 70, y: 100, w: 270, h: 96, xr: [-1, 11], yr: [0, 1] }
  const taus = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
  return (
    <Svg id="f30mb1" w={380} h={240} label={t(b('乐观与悲观的神经元学到奖赏分布的不同位置', 'Optimistic and pessimistic neurons learn different points of the reward distribution'))}>
      <Label x={f1.x - 8} y={f1.y + f1.h / 2} s={t(b('奖赏\n分布', 'Reward\nodds'))} anchor="end" />
      <line x1={f1.x} x2={f1.x + f1.w} y1={f1.y + f1.h} y2={f1.y + f1.h} stroke={C.dim} />
      {[0, 10].map((r) => <Bar key={r} f={f1} x={r} v={0.5} w={0.7} color={C.dim} />)}
      {[0, 10].map((r) => <Label key={r} x={px(f1, r)} y={py(f1, 0.5) - 8} s={t(b('一半', 'half'))} size={10} />)}
      <Axes f={f2} xTicks={[[0, '0'], [2, '2'], [5, '5'], [8, '8'], [10, '10']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('神经元学到的 V（奖赏）', 'V learned by the neuron (reward)'))} />
      <Label x={f2.x - 8} y={f2.y - 16} s={t(b('τ 乐观程度', 'τ optimism'))} anchor="start" />
      <Ref f={f2} x={5} />
      <Path pts={trace(f2, (v) => v / 10, 0, 10, 2)} color={col} opacity={0.3} width={1} dashed />
      {taus.map((tau) => <Dot key={tau} f={f2} x={10 * tau} y={tau} color={col} r={[0.2, 0.5, 0.8].includes(tau) ? 4 : 2.5} />)}
      <Label x={px(f2, 2) + 8} y={py(f2, 0.2) + 2} s={t(b('悲观，V = 2', 'pessimistic, V = 2'))} anchor="start" color={col} />
      <Label x={px(f2, 5) + 8} y={py(f2, 0.5) + 2} s={t(b('平均值 5', 'the mean, 5'))} anchor="start" color={col} />
      <Label x={px(f2, 8) + 8} y={py(f2, 0.8) + 4} s={t(b('乐观，V = 8', 'optimistic, V = 8'))} anchor="start" color={col} />
    </Svg>
  )
}

/** The quantile (pinball) loss ρ_τ(u) = u(τ − 1{u < 0}) for three values of τ. */
function PinballPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 40, y: 28, w: 260, h: 138, xr: [-4, 4], yr: [0, 3.2] }
  const rho = (tau: number) => (u: number) => u * (tau - (u < 0 ? 1 : 0))
  return (
    <Svg id="f30mc1" w={380} h={206} label={t(b('分位数损失：τ 决定低估与高估各罚多重', 'Quantile loss: τ sets how hard underestimates and overestimates are penalized'))}>
      <Axes f={f} xTicks={[[-4, ''], [-2, '−2'], [0, '0'], [2, '2'], [4, '4']]} yTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3']]}
        xLabel={t(b('误差 u = r − θ', 'Error u = r − θ'))} yLabel={t(b('损失', 'Loss'))} />
      {[0.25, 0.5, 0.75].map((tau, i) => <Path key={tau} pts={trace(f, rho(tau), -4, 4, 2)} color={col} opacity={STEPS[i + 1]} />)}
      {[0.25, 0.5, 0.75].map((tau) => <Label key={tau} x={f.x + f.w + 6} y={py(f, 4 * tau)} s={`τ = ${tau}`} anchor="start" color={col} />)}
      <Label x={px(f, 0)} y={py(f, 2.85)} s={t(b('τ = 0.75 罚低估更重，\n输出被推向高处', 'τ = 0.75 penalizes underestimates\nmore, pushing its output up'))} />
      <Label x={px(f, -3.1)} y={f.y + f.h + 27} s={t(b('估计偏高', 'estimate too high'))} size={10} />
      <Label x={px(f, 3.1)} y={f.y + f.h + 27} s={t(b('估计偏低', 'estimate too low'))} size={10} />
    </Svg>
  )
}

export const REWARD_FIGS: TopicFigs = {
  arch: { brain: RewardBrainArch, ai: ActorCriticArch },
  math: {
    bio: {
      0: { Fig: RpeTransferPlot, cap: b('小例子的三种情况，曲线是预测误差 $\\delta$，也就是多巴胺放电相对基线的变化。学会之后，爆发从奖赏移到线索；预测的奖赏没来，奖赏时刻出现 $\\delta = -1$ 的暂停。', 'The three cases of the worked example. Each trace is the prediction error $\\delta$, the change in dopamine firing from baseline. After learning, the burst moves from the reward to the cue. When a predicted reward fails to come, a pause with $\\delta = -1$ appears at the reward time.') },
      1: { Fig: DistributionalPlot, cap: b('奖赏一半是 $0$、一半是 $10$。不对称程度为 $\\tau$ 的神经元停在 $V = 10\\tau$，9 个神经元铺满 $0$ 到 $10$，合起来能看出奖赏分在两端；只学平均值的话，只有一个点停在 $5$。', 'Reward is $0$ half the time and $10$ the other half. A neuron with asymmetry $\\tau$ settles at $V = 10\\tau$, so nine neurons span $0$ to $10$ and together show the reward sits at two ends. Learning only the mean leaves a single point at $5$.') },
    },
    comp: {
      1: { Fig: PinballPlot, cap: b('分位数损失是一个不对称的 V 形：低估（$u > 0$）的斜率为 $\\tau$，高估的斜率为 $1 - \\tau$。最小化它，输出就停在使两边加权误差平衡的位置，也就是第 $\\tau$ 分位点，与大脑侧的乐观、悲观神经元相同。', 'The quantile loss is a lopsided V: the slope is $\\tau$ for underestimates, $u > 0$, and $1 - \\tau$ for overestimates. Minimizing it leaves the output where the weighted errors on both sides balance, the $\\tau$ quantile, like the optimistic and pessimistic neurons on the brain side.') },
    },
  },
}
