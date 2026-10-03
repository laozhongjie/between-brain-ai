import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Mod, Num, Store, Var } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, SIDE_COLOR, Vec, gauss, px, py, rng, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** One synapse: co-activity writes an eligibility trace, dopamine reads it out into a weight change. */
function ThreeFactorArch({ t }: FigProps) {
  const id = 'f07b'
  return (
    <Svg id={id} w={380} h={286} label={t(b('三因子学习的结构与信息流：突触、资格迹、多巴胺和更新', 'Three-factor learning: synapse, eligibility trace, dopamine and update'))}>
      <Mod x={14} y={14} w={120} h={36} side="bio" label={t(b('输入神经元', 'Input neuron'))} sub={t(b('突触前', 'presynaptic'))} />
      <Store x={150} y={10} w={80} h={56} side="bio" label={t(b('突触', 'Synapse'))} sub={t(b('权重 w', 'weight w'))} />
      <Mod x={262} y={14} w={104} h={36} side="bio" label={t(b('输出神经元', 'Output neuron'))} sub={t(b('突触后', 'postsynaptic'))} />
      <Store x={150} y={90} w={80} h={56} side="bio" label={t(b('资格迹', 'Trace'))} sub={t(b('几秒内衰减', 'fades in seconds'))} />
      <Mod x={262} y={100} w={104} h={40} side="bio" label={t(b('高级皮层', 'Higher cortex'))} sub={t(b('反馈到树突', 'feedback to dendrites'))} size={10.5} />
      <Mod x={14} y={166} w={120} h={40} side="bio" label={t(b('多巴胺神经元', 'Dopamine neurons'))} sub={t(b('比预期好则爆发', 'burst if better'))} size={10.5} />
      <Mod x={150} y={166} w={80} h={40} side="bio" label={t(b('更新', 'Update'))} sub={t(b('迹 × 多巴胺', 'trace × DA'))} />
      <Var cx={74} cy={256} side="bio" label={t(b('结果', 'Outcome'))} r={15} />
      <T x={150} y={232} anchor="start" s={t(b('多巴胺广播到大量突触', 'dopamine reaches many synapses'))} size={9} color={C.dim} />

      <Flow id={id} side="bio" pts={[[134, 26], [150, 26]]} />
      <Flow id={id} side="bio" pts={[[230, 26], [262, 26]]} />
      <Flow id={id} side="bio" pts={[[190, 66], [190, 90]]} label={t(b('共同活动', 'co-activity'))} lx={30} ly={0} />
      <Flow id={id} side="bio" head="read" pts={[[190, 146], [190, 166]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[134, 186], [150, 186]]} />
      <Flow id={id} side="bio" pts={[[230, 186], [246, 186], [246, 52], [230, 52]]} label={t(b('改变权重', 'change weight'))} at={1} lx={30} ly={40} />
      <Flow id={id} side="bio" pts={[[74, 241], [74, 206]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[314, 100], [314, 50]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={150} y={92} n={2} side="bio" />
      <Num x={14} y={166} n={3} side="bio" />
      <Num x={150} y={166} n={4} side="bio" />
      <Num x={262} y={100} n={5} side="bio" />
    </Svg>
  )
}

/** A layered network: forward pass with stored activations, an error, the backward pass, the update and TD learning. */
function BackpropArch({ t }: FigProps) {
  const id = 'f07c'
  return (
    <Svg id={id} w={380} h={284} label={t(b('反向传播与时序差分学习的结构与信息流', 'Structure and information flow of backpropagation and TD learning'))}>
      <Mod x={14} y={14} w={352} h={30} side="comp" label={t(b('输入', 'Input'))} size={10.5} />
      <Mod x={14} y={64} w={352} h={34} side="comp" label={t(b('第 1 层', 'Layer 1'))} sub={t(b('保存激活', 'activations stored'))} />
      <Mod x={14} y={118} w={352} h={34} side="comp" label={t(b('第 2 层', 'Layer 2'))} sub={t(b('保存激活', 'activations stored'))} />
      <Mod x={14} y={172} w={170} h={34} side="comp" label={t(b('输出', 'Output'))} size={10.5} />
      <Mod x={196} y={172} w={170} h={34} side="comp" label={t(b('误差', 'Error'))} sub={t(b('与目标之差或 TD 误差', 'vs. target, or TD error'))} />
      <Mod x={14} y={232} w={170} h={38} side="comp" label={t(b('时序差分', 'TD learning'))} sub={t(b('奖赏与相邻两步的预测', 'reward and successive predictions'))} size={10.5} />
      <Mod x={270} y={232} w={96} h={38} side="comp" label={t(b('权重更新', 'Update'))} sub={t(b('所有权重一步', 'all weights'))} size={10.5} />

      <Flow id={id} side="comp" pts={[[60, 44], [60, 64]]} />
      <Flow id={id} side="comp" pts={[[60, 98], [60, 118]]} />
      <Flow id={id} side="comp" pts={[[60, 152], [60, 172]]} label={t(b('前向', 'forward'))} lx={24} ly={0} />
      <Flow id={id} side="comp" pts={[[184, 189], [196, 189]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[330, 172], [330, 152]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[330, 118], [330, 98]]} label={t(b('反向传递', 'backward'))} lx={-36} ly={0} />
      <Flow id={id} side="comp" pts={[[318, 206], [318, 232]]} />
      <Flow id={id} side="comp" pts={[[184, 251], [230, 251], [230, 206]]} />
      <Num x={14} y={64} n={1} side="comp" />
      <Num x={196} y={172} n={2} side="comp" />
      <Num x={344} y={135} n={3} side="comp" />
      <Num x={270} y={232} n={4} side="comp" />
      <Num x={14} y={232} n={5} side="comp" />
    </Svg>
  )
}

/** The eligibility trace after co-activity at t = 0 (τ_e = 1 s), interactive: drag when dopamine arrives; the weight
 * change is proportional to the trace at that moment. Starts at the worked example's 0.5 s. */
function EligibilityPlot({ t }: FigProps) {
  const [delay, setDelay] = useState(0.5)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 34, w: 310, h: 120, xr: [-0.5, 4], yr: [0, 1.1] }
  const e = (s: number) => (s < 0 ? 0 : Math.exp(-s))
  const readout = (s: number) => t(b(`多巴胺 ${s.toFixed(2)} 秒后到：$\\Delta w \\propto ${e(s).toFixed(2)}$`, `dopamine at ${s.toFixed(2)} s: $\\Delta w \\propto ${e(s).toFixed(2)}$`))
  return (
    <>
      <Svg id="f07mb0" w={380} h={198} label={t(b('资格迹：共同活动留下的痕迹逐渐衰减，多巴胺来得越晚，突触改变越小', 'The eligibility trace: the mark left by co-activity fades, so the later dopamine arrives, the smaller the change'))}>
        <Axes f={f} xTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
          xLabel={t(b('共同活动之后的时间（秒）', 'Time after co-activity (s)'))} />
        <Label x={f.x - 4} y={14} s={t(b('资格迹 e', 'Trace e'))} anchor="start" />
        <Path pts={trace(f, e, -0.5, 4, 200)} color={col} />
        <Vec x1={px(f, delay)} y1={f.y - 14} x2={px(f, delay)} y2={py(f, e(delay)) - 6} color={C.lemonD} width={1.3} />
        <Label x={px(f, delay) + (delay > 3 ? -6 : 6)} y={f.y - 10} s={t(b('多巴胺', 'dopamine'))} anchor={delay > 3 ? 'end' : 'start'} size={10} color={C.lemonD} />
        <line x1={px(f, delay)} x2={px(f, delay)} y1={py(f, e(delay))} y2={py(f, 0)} stroke={col} strokeOpacity={0.6} strokeWidth={3} />
        <Dot f={f} x={delay} y={e(delay)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('多巴胺到达', 'Dopamine arrives'))} value={delay} min={0} max={4} step={0.05} onChange={setDelay}
        readout={readout(delay)} widest={[0.5, 3.85].map(readout)} />
    </>
  )
}

/** Weight perturbation in two dimensions: single-trial updates (g · ξ) ξ scatter in every direction, yet their average
 * points along the gradient g. Forty seeded samples. */
function PerturbationPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const g = [1, 0.45], u = rng(11), k = 40, sc = 24, cx = 96, cy = 104
  const ups = Array.from({ length: k }, () => { const xi = [gauss(u), gauss(u)]; const d = g[0] * xi[0] + g[1] * xi[1]; return [d * xi[0], d * xi[1]] })
  const mean = [ups.reduce((a, v) => a + v[0], 0) / k, ups.reduce((a, v) => a + v[1], 0) / k]
  const clip = ([a, c]: number[]) => { const l = Math.hypot(a, c), m = 3.3; return l > m ? [(a / l) * m, (c / l) * m] : [a, c] }
  return (
    <Svg id="f07mb1" w={380} h={200} label={t(b('扰动学习：每次更新的方向都很乱，平均起来指向梯度', 'Perturbation learning: each update points somewhere random, yet on average they point along the gradient'))}>
      <circle cx={cx} cy={cy} r={3.3 * sc} fill="none" stroke={C.line} strokeDasharray="2 3" />
      {ups.map((v, i) => { const [a, c] = clip(v); return <line key={i} x1={cx} y1={cy} x2={cx + a * sc} y2={cy - c * sc} stroke={C.dim} strokeOpacity={0.55} strokeWidth={1} /> })}
      <Vec x1={cx} y1={cy} x2={cx + g[0] * sc * 2} y2={cy - g[1] * sc * 2} color={C.ink} width={1.4} dashed />
      <Vec x1={cx} y1={cy} x2={cx + mean[0] * sc * 2} y2={cy - mean[1] * sc * 2} color={col} width={2.4} />
      <Label x={200} y={58} s={t(b('细线：40 次单独的更新\n(R − R̄) ξ x，方向随噪声乱跳', 'Thin lines: 40 single updates\n(R − R̄) ξ x, scattered by noise'))} anchor="start" size={10} />
      <Label x={200} y={110} s={t(b('粗箭头：它们的平均', 'Bold arrow: their average'))} anchor="start" size={10} color={col} />
      <Label x={200} y={134} s={t(b('虚线箭头：真实梯度', 'Dashed arrow: the true gradient'))} anchor="start" size={10} color={C.ink} />
      <Label x={cx} y={190} s={t(b('两个权重组成的平面（示意）', 'Plane of two weights (illustration)'))} size={10} />
    </Svg>
  )
}

/** Values of A, B, C after the first episode of the worked example, without and with an eligibility trace. */
function TdTracePlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 40, y: 30, w: 230, h: 124, xr: [0.4, 3.6], yr: [0, 0.6] }
  const l0 = [0, 0, 0.5], l5 = [0.125, 0.25, 0.5]
  return (
    <Svg id="f07mc1" w={380} h={198} label={t(b('第一次走完 A、B、C 后的价值：有资格迹时，奖赏一次就传回较早的状态', 'Values after the first pass through A, B, C: with a trace, the reward reaches earlier states at once'))}>
      <Axes f={f} xTicks={[[1, 'A'], [2, 'B'], [3, 'C']]} yTicks={[[0, '0'], [0.25, '0.25'], [0.5, '0.5']]} xLabel={t(b('依次经过的状态，C 之后得到奖赏 1', 'States in order; reward 1 after C'))} yLabel={t(b('第一次之后的价值 V', 'Value V after one pass'))} grid />
      {l0.map((v, i) => <Bar key={`a${i}`} f={f} x={i + 0.83} v={v} w={0.3} color={C.dim} />)}
      {l5.map((v, i) => <Bar key={`b${i}`} f={f} x={i + 1.17} v={v} w={0.3} color={col} />)}
      {l5.map((v, i) => <Label key={i} x={px(f, i + 1.17)} y={py(f, v) - 8} s={String(v)} size={10} color={col} />)}
      <Label x={px(f, 0.83)} y={py(f, 0) - 8} s="0" size={10} />
      <Label x={px(f, 1.83)} y={py(f, 0) - 8} s="0" size={10} />
      <rect x={290} y={60} width={10} height={10} fill={C.dim} fillOpacity={0.35} stroke={C.dim} />
      <Label x={306} y={65} s={t(b('λ = 0\n没有迹', 'λ = 0\nno trace'))} anchor="start" size={10} />
      <rect x={290} y={98} width={10} height={10} fill={col} fillOpacity={0.35} stroke={col} />
      <Label x={306} y={103} s={t(b('λ = 0.5\n有资格迹', 'λ = 0.5\nwith a trace'))} anchor="start" size={10} color={col} />
    </Svg>
  )
}

export const CREDIT_FIGS: TopicFigs = {
  arch: { brain: ThreeFactorArch, ai: BackpropArch },
  math: {
    bio: {
      0: { Fig: EligibilityPlot, cap: b('拖动滑块改变多巴胺到达的时间。共同活动在 $t = 0$ 把迹设为 $1$，之后按 $\\tau_e = 1$ 秒衰减；突触的改变与多巴胺到达那一刻的迹成正比（竖线高度）。默认 $0.5$ 秒时迹还有 $0.61$，突触明显增强；拖到 $3$ 秒只剩 $0.05$，几乎不变。所以奖赏只能回溯几个 $\\tau_e$。', 'Drag the slider to change when dopamine arrives. Co-activity at $t = 0$ sets the trace to $1$, which then decays with $\\tau_e = 1$ s; the change in the synapse is proportional to the trace when dopamine arrives (the bar). At the default $0.5$ s the trace is still $0.61$ and the synapse clearly strengthens; at $3$ s only $0.05$ is left and almost nothing changes. Reward reaches back only a few $\\tau_e$.') },
      1: { Fig: PerturbationPlot, cap: b('示意：两个权重时，每次的随机波动 $\\xi$ 不同，单次更新可能指向任何方向，甚至与梯度相反。把 40 次平均，结果就接近真实梯度。神经元越多，单次更新越乱，需要平均的次数越多，这就是全局信号学得慢的原因。', 'Illustration with two weights: the random fluctuation $\\xi$ differs each time, so a single update can point anywhere, even against the gradient. Averaged over 40 trials, the result is close to the true gradient. With more neurons each update is noisier and more trials are needed, which is why a global signal learns slowly.') },
    },
    comp: {
      1: { Fig: TdTracePlot, cap: b('小例子中第一次走完 A、B、C 后的价值（$\\gamma = 1$、$\\alpha = 0.5$）。没有资格迹时只有 C 学到 $0.5$；$\\lambda = 0.5$ 时三者的迹为 $1$、$0.5$、$0.25$，一次就更新为 $0.5$、$0.25$、$0.125$。', 'Values after the first pass through A, B, C in the worked example, with $\\gamma = 1$ and $\\alpha = 0.5$. Without a trace only C learns $0.5$. With $\\lambda = 0.5$ the traces are $1$, $0.5$ and $0.25$, so one pass gives $0.5$, $0.25$ and $0.125$.') },
    },
  },
}
