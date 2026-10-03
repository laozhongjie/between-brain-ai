import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store, Var } from '../grammar'
import { Axes, Bar, Dot, Label, Path, Ref, SIDE_COLOR, STEPS, Tick, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Sensory input passes a basal ganglia gate into prefrontal cortex, held by recurrent activity and facilitating synapses. */
function WorkingMemoryArch({ t }: FigProps) {
  const id = 'f11b'
  return (
    <Svg id={id} w={380} h={278} label={t(b('工作记忆的结构与信息流：感觉皮层、基底节闸门、前额叶中的持续活动与突触易化、顶叶', 'Working memory: sensory cortex, basal ganglia gate, persistent activity and facilitating synapses in prefrontal cortex, parietal cortex'))}>
      <Mod x={14} y={14} w={150} h={36} side="bio" label={t(b('感觉皮层', 'Sensory cortex'))} sub={t(b('刺激的放电模式', 'firing pattern of the stimulus'))} />
      <Mod x={216} y={14} w={150} h={36} side="bio" label={t(b('基底节闸门', 'Basal ganglia gate'))} sub={t(b('纹状体与丘脑', 'striatum and thalamus'))} />
      <Region x={6} y={76} w={368} h={118} side="bio" label={t(b('前额叶', 'Prefrontal cortex'))} />
      {([[50, 'A'], [110, 'B'], [170, 'C']] as [number, string][]).map(([cx, l]) => (
        <g key={l}>
          <Var cx={cx} cy={140} side="bio" label={l} r={14} />
          <Flow id={id} side="bio" kind="fb" head="none" pts={[[cx - 11, 131], [cx + 11, 131]]} curve={[cx, 92]} />
        </g>
      ))}
      <line x1={64} y1={140} x2={96} y2={140} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1={124} y1={140} x2={156} y2={140} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={110} y={176} s={t(b('循环兴奋维持，相互抑制', 'self-sustained, mutually inhibiting'))} size={9} color={C.dim} />
      <Store x={226} y={106} w={136} h={62} side="bio" label={t(b('突触易化', 'Facilitation'))} sub={t(b('放电停止后约一秒', 'about 1 s after firing'))} />
      <Mod x={110} y={224} w={160} h={40} side="bio" label={t(b('顶叶与运动区', 'Parietal, motor areas'))} sub={t(b('比较、计算、指导动作', 'compare, compute, act'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[164, 32], [216, 32]]} />
      <Flow id={id} side="bio" pts={[[291, 50], [291, 76]]} label={t(b('闸门打开时写入', 'written when open'))} lx={-50} ly={0} />
      <Flow id={id} side="bio" pts={[[186, 140], [226, 140]]} />
      <Flow id={id} side="bio" pts={[[190, 194], [190, 224]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={216} y={14} n={2} side="bio" />
      <Num x={30} y={112} n={3} side="bio" />
      <Num x={226} y={108} n={4} side="bio" />
      <Num x={110} y={224} n={5} side="bio" />
      <Num x={34} y={176} n={6} side="bio" />
    </Svg>
  )
}

/** A transformer keeps every token in its KV cache; a recurrent model keeps a gated fixed-size state. */
function ContextStateArch({ t }: FigProps) {
  const id = 'f11c'
  return (
    <Svg id={id} w={380} h={306} label={t(b('上下文窗口与循环状态的结构与信息流', 'Structure and information flow of context windows and recurrent state'))}>
      <Mod x={14} y={14} w={352} h={30} side="comp" label={t(b('词元输入', 'Token input'))} size={10.5} />
      <Region x={6} y={60} w={180} h={176} side="comp" label="Transformer" />
      <Store x={18} y={86} w={84} h={62} side="comp" label={t(b('上下文窗口', 'Context'))} sub={t(b('逐字保存', 'verbatim'))} />
      <Gap x={112} y={94} w={62} h={46} label={t(b('写入\n闸门', 'Write\ngate'))} />
      <Mod x={18} y={176} w={156} h={40} side="comp" label={t(b('注意力读取', 'Attention readout'))} sub={t(b('与所有词元比较', 'compares with every token'))} size={10.5} />
      <Region x={194} y={60} w={180} h={176} side="comp" label={t(b('循环模型', 'Recurrent model'))} />
      <Mod x={206} y={86} w={156} h={40} side="comp" label={t(b('门控', 'Gates'))} sub={t(b('写入多少、保留多少', 'how much to write and keep'))} size={10.5} />
      <Store x={206} y={150} w={156} h={62} side="comp" label={t(b('状态向量', 'State vector'))} sub={t(b('固定大小', 'fixed size'))} />
      <Mod x={14} y={262} w={352} h={30} side="comp" label={t(b('输出下一个词元', 'Next token'))} size={10.5} />

      <Flow id={id} side="comp" pts={[[60, 44], [60, 86]]} />
      <Flow id={id} side="comp" head="read" pts={[[60, 148], [60, 176]]} />
      <Flow id={id} side="comp" pts={[[96, 216], [96, 262]]} />
      <Flow id={id} side="comp" pts={[[264, 44], [264, 86]]} />
      <Flow id={id} side="comp" pts={[[264, 126], [264, 150]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[340, 150], [340, 126]]} />
      <Flow id={id} side="comp" head="read" pts={[[284, 212], [284, 262]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={88} n={2} side="comp" />
      <Num x={18} y={176} n={3} side="comp" />
      <Num x={206} y={86} n={4} side="comp" />
      <Num x={14} y={262} n={5} side="comp" />
      <Num x={112} y={94} n={6} side="comp" />
    </Svg>
  )
}

/** Persistent activity: decay after the input ends, τ_eff = τ / (1 − w) with τ = 10 ms. */
function PersistentDecayPlot({ t }: FigProps) {
  const f: Frame = { x: 44, y: 28, w: 250, h: 140, xr: [0, 1000], yr: [0, 1] }
  const col = SIDE_COLOR.bio
  const e = Math.exp(-1)
  return (
    <Svg id="f11mb0" w={380} h={206} label={t(b('输入结束后活动的衰减：w 越接近 1，保持越久', 'Decay after the input ends: the closer w is to 1, the longer the hold'))}>
      <Axes f={f} xTicks={[[0, '0'], [250, '250'], [500, '500'], [750, '750'], [1000, '1000']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('输入结束后的时间（毫秒）', 'Time after the input ends (ms)'))} yLabel={t(b('活动，相对输入结束时', 'Activity, relative to input offset'))} />
      <Ref f={f} y={e} />
      <Label x={f.x - 5} y={py(f, e)} s="1/e" anchor="end" size={10} />
      {[0, 0.9, 0.99, 0.999].map((w, i) => <Path key={w} pts={trace(f, (x) => Math.exp((-x * (1 - w)) / 10), 0, 1000, 400)} color={col} opacity={STEPS[i]} />)}
      <Dot f={f} x={100} y={e} color={col} />
      <Dot f={f} x={1000} y={e} color={col} />
      <Label x={px(f, 0) + 8} y={py(f, 0.1)} s="w = 0" anchor="start" color={col} />
      <Label x={px(f, 100) + 7} y={py(f, e) - 9} s={t(b('w = 0.9，100 毫秒', 'w = 0.9, 100 ms'))} anchor="start" color={col} />
      <Label x={f.x + f.w + 6} y={py(f, e)} s={t(b('w = 0.99\n1 秒', 'w = 0.99\n1 s'))} anchor="start" color={col} />
      <Label x={f.x + f.w + 6} y={py(f, Math.exp(-0.1))} s={t(b('w = 0.999\n10 秒', 'w = 0.999\n10 s'))} anchor="start" color={col} />
    </Svg>
  )
}

/** Facilitation after a burst: u (release share) fades over τ_F = 1.5 s while x (resources) recovers within τ_D = 0.2 s. */
function FacilitationPlot({ t }: FigProps) {
  const f: Frame = { x: 44, y: 34, w: 250, h: 134, xr: [0, 2.6], yr: [0, 1] }
  const col = SIDE_COLOR.bio
  const U = 0.2, tF = 1.5, tD = 0.2
  const spikes = Array.from({ length: 8 }, (_, k) => 0.2 + k * 0.04)
  const last = spikes[spikes.length - 1]
  // exact between spikes; each spike raises u, then releases u·x of the resources
  const us: [number, number][] = [], xs: [number, number][] = []
  let u = U, x = 1, tPrev = 0, uLast = U
  const advance = (to: number) => {
    u = U + (u - U) * Math.exp(-(to - tPrev) / tF)
    x = 1 + (x - 1) * Math.exp(-(to - tPrev) / tD)
    tPrev = to
  }
  const push = (tm: number) => { us.push([px(f, tm), py(f, u)]); xs.push([px(f, tm), py(f, x)]) }
  const grid = Array.from({ length: 261 }, (_, i) => i / 100)
  for (const tm of [...grid, ...spikes].sort((a, b2) => a - b2)) {
    advance(tm)
    push(tm)
    if (spikes.includes(tm)) { u += U * (1 - u); x -= u * x; push(tm); uLast = u }
  }
  const uAfter = (dt: number) => U + (uLast - U) * Math.exp(-dt / tF)
  const at = last + 1
  return (
    <Svg id="f11mb1" w={380} h={212} label={t(b('一串放电之后，易化变量 u 慢慢消退，资源 x 很快恢复', 'After a burst, facilitation u fades slowly while resources x recover fast'))}>
      <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1'], [1.5, '1.5'], [2, '2'], [2.5, '2.5']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('时间（秒）', 'Time (s)'))} />
      <Label x={px(f, spikes[0]) - 6} y={14} s={t(b('放电', 'Spikes'))} anchor="end" />
      {spikes.map((s) => <line key={s} x1={px(f, s)} x2={px(f, s)} y1={8} y2={20} stroke={col} strokeWidth={1.4} />)}
      <Ref f={f} y={U} />
      <Ref f={f} x={at} />
      <Path pts={xs} color={col} opacity={0.4} width={1.4} />
      <Path pts={us} color={col} />
      <Dot f={f} x={at} y={uAfter(1)} color={col} />
      <Label x={px(f, at) + 6} y={py(f, 0.74)} s={t(b('停止放电 1 秒后\nu 仍高于基线', '1 s after firing stops\nu is still above baseline'))} anchor="start" />
      <Label x={f.x + f.w + 6} y={py(f, 1)} s={t(b('x 可用递质', 'x resources'))} anchor="start" color={col} />
      <Label x={f.x + f.w + 6} y={py(f, uAfter(2.6 - last)) - 4} s={t(b('u 释放比例', 'u release share'))} anchor="start" color={col} />
      <Label x={f.x + f.w + 6} y={py(f, U) + 8} s={t(b('基线 U', 'baseline U'))} anchor="start" />
    </Svg>
  )
}

/** Attention weights from the worked example: dot products 2, 0, 0, then 100 more irrelevant tokens with dot product 0. */
function AttentionDilutionPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const a = Math.exp(2)
  const f1: Frame = { x: 44, y: 34, w: 110, h: 130, xr: [0.4, 3.6], yr: [0, 1] }
  const f2: Frame = { x: 190, y: 34, w: 170, h: 130, xr: [0, 103], yr: [0, 1] }
  const w3 = [a / (a + 2), 1 / (a + 2), 1 / (a + 2)]
  const first = a / (a + 102), rest = 1 / (a + 102)
  const bottom = f2.y + f2.h
  return (
    <Svg id="f11mc0" w={380} h={204} label={t(b('注意力权重被无关词元稀释：相关词元的权重从 0.79 降到 0.07', 'Attention weight diluted by irrelevant tokens: the relevant token falls from 0.79 to 0.07'))}>
      <Axes f={f1} xTicks={[[1, '1'], [2, '2'], [3, '3']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} yLabel={t(b('注意力权重', 'Attention weight'))} grid />
      {w3.map((v, i) => <Bar key={i} f={f1} x={i + 1} v={v} w={0.6} color={i ? C.dim : col} />)}
      {w3.map((v, i) => <Label key={i} x={px(f1, i + 1)} y={py(f1, v) - 8} s={v.toFixed(2)} color={i ? C.dim : col} />)}
      <Axes f={f2} yTicks={[[0, ''], [0.5, ''], [1, '']]} grid />
      <rect x={px(f2, 1) - 3} y={py(f2, first)} width={6} height={bottom - py(f2, first)} rx={1.5} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={1.2} />
      <Label x={px(f2, 1) + 6} y={py(f2, first) - 8} s={first.toFixed(2)} color={col} anchor="start" />
      <rect x={px(f2, 3)} y={py(f2, rest) - 1} width={px(f2, 103) - px(f2, 3)} height={bottom - py(f2, rest) + 1} fill={C.dim} fillOpacity={0.5} />
      <Label x={px(f2, 60)} y={py(f2, 0.32)} s={t(b('其余 102 个词元\n各约 0.009，合计 0.93', 'the other 102 tokens\nabout 0.009 each, 0.93 in all'))} />
      <Label x={f1.x + f1.w / 2} y={bottom + 28} s={t(b('3 个词元', '3 tokens'))} color={C.ink} />
      <Label x={f2.x + f2.w / 2} y={bottom + 28} s={t(b('再加 100 个无关词元', '100 irrelevant tokens added'))} color={C.ink} />
      <Tick x={px(f2, 1)} y={bottom + 11} s="1" />
    </Svg>
  )
}

/** LSTM retention f^n with the input gate closed; the same shape as the biological decay, with steps for time. */
function ForgetGatePlot({ t }: FigProps) {
  const f: Frame = { x: 44, y: 28, w: 250, h: 140, xr: [0, 300], yr: [0, 1] }
  const col = SIDE_COLOR.comp
  const e = Math.pow(0.99, 100)
  return (
    <Svg id="f11mc1" w={380} h={206} label={t(b('输入门关闭时旧内容的保留：遗忘门越接近 1，保持越久', 'Old content kept with the input gate closed: the closer the forget gate is to 1, the longer the hold'))}>
      <Axes f={f} xTicks={[[0, '0'], [100, '100'], [200, '200'], [300, '300']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('步数', 'Steps'))} yLabel={t(b('旧内容的保留比例', 'Share of old content kept'))} />
      <Ref f={f} y={e} />
      {[0.9, 0.99, 0.999, 1].map((g, i) => <Path key={g} pts={trace(f, (n) => Math.pow(g, n), 0, 300, 300)} color={col} opacity={STEPS[i]} />)}
      <Dot f={f} x={100} y={e} color={col} />
      <Label x={px(f, 100) + 7} y={py(f, e) - 9} s={t(b('f = 0.99：100 步后剩 0.37', 'f = 0.99: 0.37 left after 100 steps'))} anchor="start" color={col} />
      <Label x={px(f, 0) + 8} y={py(f, 0.1)} s="f = 0.9" anchor="start" color={col} />
      <Label x={f.x + f.w + 6} y={py(f, 1)} s="f = 1" anchor="start" color={col} />
      <Label x={f.x + f.w + 6} y={py(f, Math.pow(0.999, 300))} s="f = 0.999" anchor="start" color={col} />
      <Label x={f.x + f.w + 6} y={py(f, Math.pow(0.99, 300))} s="f = 0.99" anchor="start" color={col} />
    </Svg>
  )
}

export const WORKING_MEMORY_FIGS: TopicFigs = {
  arch: { brain: WorkingMemoryArch, ai: ContextStateArch },
  math: {
    bio: {
      0: { Fig: PersistentDecayPlot, cap: b('输入结束后活动按 $e^{-t/\\tau_{\\text{eff}}}$ 衰减。圆点是降到 $1/e$ 的时刻：$w$ 从 $0.9$ 到 $0.99$ 只差 $0.09$，保持时间却从 100 毫秒变成 1 秒。', 'After the input ends, activity decays as $e^{-t/\\tau_{\\text{eff}}}$. Dots mark where it falls to $1/e$: moving $w$ from $0.9$ to $0.99$, a change of only $0.09$, stretches the hold from 100 ms to 1 s.') },
      1: { Fig: FacilitationPlot, cap: b('8 次放电（$U = 0.2$）把 $u$ 推高、把 $x$ 耗尽。停止放电后，$x$ 在约 0.2 秒内恢复，$u$ 要 1.5 秒量级才回到基线，这段时间里突触保存了「刚才谁在放电」。', 'Eight spikes, with $U = 0.2$, push $u$ up and drain $x$. After firing stops, $x$ recovers within about 0.2 s while $u$ takes on the order of 1.5 s to return to baseline, and during that time the synapses store which group just fired.') },
    },
    comp: {
      0: { Fig: AttentionDilutionPlot, cap: b('小例子的两种情况。左：点积为 $2, 0, 0$，相关词元得到 $0.79$。右：再加入 100 个点积为 $0$ 的词元，每个只分到约 $0.009$，但合起来拿走了 $0.93$，相关词元只剩 $0.07$。', 'The two cases of the worked example. Left: dot products $2, 0, 0$ give the relevant token $0.79$. Right: with 100 more tokens at dot product $0$, each takes only about $0.009$, yet together they take $0.93$, leaving the relevant token $0.07$.') },
      1: { Fig: ForgetGatePlot, cap: b('输入门为 $0$ 时，旧内容按 $f^{\\,n}$ 衰减。曲线形状与生物侧的持续活动相同：遗忘门 $f$ 的作用相当于循环强度 $w$，只是时间以步数计。', 'With the input gate at $0$, old content decays as $f^{\\,n}$. The curves have the same shape as persistent activity on the biological side: the forget gate $f$ plays the role of the recurrent strength $w$, with time counted in steps.') },
    },
  },
}
