import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store, Var } from '../grammar'
import { Axes, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
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

/** Persistent activity, interactive: drag w to see the decay after the input ends (left) and where w sits on
 * τ_eff = τ / (1 − w), τ = 10 ms (right, log scale). Starts at the worked example's w = 0.99. */
function PersistentDecayPlot({ t }: FigProps) {
  const [w, setW] = useState(0.99)
  const col = SIDE_COLOR.bio
  const e = Math.exp(-1)
  const tauOf = (v: number) => 10 / (1 - v)
  const tau = tauOf(w)
  const f: Frame = { x: 40, y: 30, w: 196, h: 128, xr: [0, 1000], yr: [0, 1] }
  const f2: Frame = { x: 308, y: 30, w: 58, h: 128, xr: [0.8, 1], yr: [1, 4] }
  const left = Math.exp(-1000 / tau)
  const fmt = (raw: number) => { const ms = Math.round(raw); return ms < 1000 ? t(b(`${Math.round(ms)} 毫秒`, `${Math.round(ms)} ms`)) : t(b(`${(ms / 1000).toFixed(ms < 9995 ? 2 : 1)} 秒`, `${(ms / 1000).toFixed(ms < 9995 ? 2 : 1)} s`)) }
  const readout = (v: number) => `$w = ${v.toFixed(3)}$${t(b('，', ', '))}$\\tau_{\\text{eff}} =$ ${fmt(tauOf(v))}`
  return (
    <>
      <Svg id="f11mb0" w={380} h={200} label={t(b('输入结束后活动的衰减，以及有效时间常数随 w 的变化：w 越接近 1，保持越久', 'Decay after the input ends, and the effective time constant against w: the closer w is to 1, the longer the hold'))}>
        <Axes f={f} xTicks={[[0, '0'], [500, '500'], [1000, '1000']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
          xLabel={t(b('输入结束后（毫秒）', 'After the input ends (ms)'))} yLabel={t(b('活动，相对输入结束时', 'Activity, relative to offset'))} />
        <Ref f={f} y={e} />
        <Label x={f.x - 5} y={py(f, e)} s="1/e" anchor="end" size={10} />
        <Path pts={trace(f, (x) => Math.exp(-x / tau), 0, 1000, 300)} color={col} width={2.2} />
        {tau <= 1000 && <Dot f={f} x={tau} y={e} color={col} />}
        <Label x={f.x + f.w + 6} y={py(f, left) - 11} s={`${Math.round(left * 100)}%`} anchor="start" size={10} color={col} />
        <Axes f={f2} xTicks={[[0.8, '0.8'], [0.9, '0.9'], [1, '1']]} yTicks={[[1, '10ms'], [2, '100ms'], [3, '1s'], [4, '10s']]} xLabel="w" grid />
        <text x={f2.x - 4} y={f2.y - 12} fontSize={11} fill={C.dim} dominantBaseline="middle">τ<tspan fontSize={8} dy={3}>eff</tspan></text>
        <Path pts={trace(f2, (v) => Math.log10(tauOf(v)), 0.8, 0.999, 200)} color={col} opacity={0.45} />
        <Dot f={f2} x={w} y={Math.log10(tau)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('循环强度 $w$', 'Recurrent strength $w$'))} value={w} min={0.8} max={0.999} step={0.001} onChange={setW}
        readout={readout(w)} widest={[0.989, 0.995, 0.999].map(readout)} />
    </>
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

/** Attention dilution, interactive: one token matches the query (dot product 2), the others score 0. Drag the number
 * of irrelevant tokens added to the worked example's three. Starts at 100. */
function AttentionDilutionPlot({ t }: FigProps) {
  const [n, setN] = useState(100)
  const col = SIDE_COLOR.comp
  const a = Math.exp(2)
  const firstOf = (k: number) => a / (a + 2 + k)
  const first = firstOf(n), rest = 1 / (a + 2 + n)
  const f1: Frame = { x: 40, y: 30, w: 150, h: 128, xr: [0, 1], yr: [0, 1] }
  const f2: Frame = { x: 236, y: 30, w: 126, h: 128, xr: [0, 200], yr: [0, 1] }
  const bottom = f1.y + f1.h
  const readout = (k: number) => t(b(`加入 ${k} 个，相关词元得到 ${firstOf(k).toFixed(2)}`, `${k} added: the relevant token gets ${firstOf(k).toFixed(2)}`))
  return (
    <>
      <Svg id="f11mc0" w={380} h={200} label={t(b('注意力权重被无关词元稀释：无关词元越多，相关词元分到的越少', 'Attention weight diluted by irrelevant tokens: the more there are, the less the relevant token gets'))}>
        <Axes f={f1} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} yLabel={t(b('注意力权重', 'Attention weight'))} grid />
        <rect x={f1.x + 6} y={py(f1, first)} width={14} height={bottom - py(f1, first)} rx={1.5} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={1.2} />
        <Label x={f1.x + 13} y={py(f1, first) - 8} s={first.toFixed(2)} size={10} color={col} />
        <rect x={f1.x + 28} y={py(f1, rest) - 1} width={f1.w - 32} height={bottom - py(f1, rest) + 1} fill={C.dim} fillOpacity={0.5} />
        <Label x={f1.x + 28 + (f1.w - 32) / 2} y={py(f1, rest) - 26} s={t(b(`其余 ${n + 2} 个，各 ${rest.toFixed(3)}\n合计 ${(1 - first).toFixed(2)}`, `other ${n + 2}: ${rest.toFixed(3)} each\n${(1 - first).toFixed(2)} in all`))} size={10} />
        <Label x={f1.x + 13} y={bottom + 12} s={t(b('相关', 'match'))} size={10} color={col} />
        <Label x={f1.x + 28 + (f1.w - 32) / 2} y={bottom + 12} s={t(b('其余词元', 'other tokens'))} size={10} />
        <Axes f={f2} xTicks={[[0, '0'], [100, '100'], [200, '200']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('加入的无关词元', 'Irrelevant tokens added'))} grid />
        <Label x={f2.x - 4} y={f2.y - 12} s={t(b('相关词元的权重', 'Weight of the match'))} anchor="start" />
        <Path pts={trace(f2, firstOf, 0, 200, 200)} color={col} opacity={0.45} />
        <Dot f={f2} x={n} y={first} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('无关词元', 'Irrelevant tokens'))} value={n} min={0} max={200} step={1} onChange={setN}
        readout={readout(n)} widest={[100, 188].map(readout)} />
    </>
  )
}

/** LSTM retention with the input gate closed, interactive: drag the forget gate f to see f^n (left) and the steps it
 * takes to fall to about 1/e, 1/(1 − f) (right, log scale). The same layout as persistent activity on the
 * biological side. Starts at the worked example's f = 0.99. */
function ForgetGatePlot({ t }: FigProps) {
  const [g, setG] = useState(0.99)
  const col = SIDE_COLOR.comp
  const e = Math.exp(-1)
  const nOf = (v: number) => 1 / (1 - v)
  const n = nOf(g)
  const f: Frame = { x: 40, y: 30, w: 196, h: 128, xr: [0, 300], yr: [0, 1] }
  const f2: Frame = { x: 308, y: 30, w: 58, h: 128, xr: [0.9, 1], yr: [1, 3] }
  const left = Math.pow(g, 300)
  const readout = (v: number) => t(b(`$f = ${v.toFixed(3)}$，约 ${Math.round(nOf(v))} 步降到 $1/e$`, `$f = ${v.toFixed(3)}$, about ${Math.round(nOf(v))} steps to $1/e$`))
  return (
    <>
      <Svg id="f11mc1" w={380} h={200} label={t(b('输入门关闭时旧内容的保留，以及降到 1/e 所需步数随遗忘门的变化', 'Old content kept with the input gate closed, and the steps to fall to 1/e against the forget gate'))}>
        <Axes f={f} xTicks={[[0, '0'], [100, '100'], [200, '200'], [300, '300']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
          xLabel={t(b('步数', 'Steps'))} yLabel={t(b('旧内容的保留比例', 'Share of old content kept'))} />
        <Ref f={f} y={e} />
        <Label x={f.x - 5} y={py(f, e)} s="1/e" anchor="end" size={10} />
        <Path pts={trace(f, (k) => Math.pow(g, k), 0, 300, 300)} color={col} width={2.2} />
        {n <= 300 && <Dot f={f} x={n} y={e} color={col} />}
        <Label x={f.x + f.w + 6} y={py(f, left) - 11} s={`${Math.round(left * 100)}%`} anchor="start" size={10} color={col} />
        <Axes f={f2} xTicks={[[0.9, '0.9'], [0.95, '0.95'], [1, '1']]} yTicks={[[1, '10'], [2, '100'], [3, '1000']]} xLabel="f" grid />
        <Label x={f2.x - 4} y={f2.y - 12} s={t(b('步数', 'steps'))} anchor="start" />
        <Path pts={trace(f2, (v) => Math.log10(nOf(v)), 0.9, 0.999, 200)} color={col} opacity={0.45} />
        <Dot f={f2} x={g} y={Math.log10(n)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('遗忘门 $f$', 'Forget gate $f$'))} value={g} min={0.9} max={0.999} step={0.001} onChange={setG}
        readout={readout(g)} widest={[0.99, 0.999].map(readout)} />
    </>
  )
}

export const WORKING_MEMORY_FIGS: TopicFigs = {
  arch: { brain: WorkingMemoryArch, ai: ContextStateArch },
  math: {
    bio: {
      0: { Fig: PersistentDecayPlot, cap: b('拖动滑块改变 $w$。左：输入结束后活动按 $e^{-t/\\tau_{\\text{eff}}}$ 衰减，圆点是降到 $1/e$ 的时刻，右端是 1 秒后还剩多少。右：$\\tau_{\\text{eff}} = \\tau/(1 - w)$，纵轴为对数。从 $0.9$ 拖到 $0.99$，保持时间从 100 毫秒变成 1 秒；再到 $0.999$ 就是 10 秒，越接近 $1$ 越陡。', 'Drag the slider to change $w$. Left: after the input ends, activity decays as $e^{-t/\\tau_{\\text{eff}}}$; the dot marks where it falls to $1/e$, and the right end shows what is left after 1 s. Right: $\\tau_{\\text{eff}} = \\tau/(1 - w)$ on a log axis. From $0.9$ to $0.99$ the hold grows from 100 ms to 1 s, and at $0.999$ it is 10 s: the curve steepens as $w$ nears $1$.') },
      1: { Fig: FacilitationPlot, cap: b('8 次放电（$U = 0.2$）把 $u$ 推高、把 $x$ 耗尽。停止放电后，$x$ 在约 0.2 秒内恢复，$u$ 要 1.5 秒量级才回到基线，这段时间里突触保存了「刚才谁在放电」。', 'Eight spikes, with $U = 0.2$, push $u$ up and drain $x$. After firing stops, $x$ recovers within about 0.2 s while $u$ takes on the order of 1.5 s to return to baseline, and during that time the synapses store which group just fired.') },
    },
    comp: {
      0: { Fig: AttentionDilutionPlot, cap: b('拖动滑块改变加入的无关词元数。查询与相关词元的点积为 $2$，与其余词元为 $0$。不加时（小例子的三个词元）相关词元得到 $0.79$；加入 100 个后，每个无关词元只分到约 $0.009$，合起来却拿走 $0.93$，相关词元只剩 $0.07$。', 'Drag the slider to change how many irrelevant tokens are added. The query’s dot product is $2$ with the relevant token and $0$ with the rest. With none added, the worked example’s three tokens, the relevant one gets $0.79$. With 100 added, each irrelevant token takes only about $0.009$, yet together they take $0.93$, leaving the relevant token $0.07$.') },
      1: { Fig: ForgetGatePlot, cap: b('拖动滑块改变遗忘门 $f$，输入门为 $0$。左：旧内容按 $f^{\\,n}$ 衰减，圆点是降到 $1/e$ 的步数，右端是 300 步后还剩多少。右：所需步数约为 $1/(1 - f)$，纵轴为对数。与生物侧的持续活动对照：遗忘门 $f$ 的作用相当于循环强度 $w$，只是时间以步数计。', 'Drag the slider to change the forget gate $f$, with the input gate at $0$. Left: old content decays as $f^{\\,n}$; the dot marks the step where it reaches $1/e$, and the right end shows what is left after 300 steps. Right: the steps needed, about $1/(1 - f)$, on a log axis. Compare persistent activity on the biological side: the forget gate $f$ plays the role of the recurrent strength $w$, with time counted in steps.') },
    },
  },
}
