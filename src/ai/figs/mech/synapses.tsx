import { useMemo, useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Line, Svg, T } from '../kit'
import { Flow, Mod, Num, Region, Store } from '../grammar'
import { Axes, Bar, FigSlider, Label, Path, Ref, SIDE_COLOR, Vec, px, py, trace, type Frame } from '../plot'
import type { FigProps, MechFigs } from '../types'
import { feedbackAlignment } from './sims'

const b = (zh: string, en: string): Bi => ({ zh, en })
const col = SIDE_COLOR.bio
const binom = (n: number, k: number) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i; return r }

/* ── M01 synaptic transmission ── */

/** A terminal with five release sites (two releasing), transmitter crossing the cleft, receptors and the current. */
function SynapseMech({ t }: FigProps) {
  const id = 'm01'
  const sites = [70, 110, 150, 190, 230]
  const released = [1, 3]
  return (
    <Svg id={id} w={380} h={300} label={t(b('突触传递：随机释放、受体与电流', 'Synaptic transmission: random release, receptors and current'))}>
      <path d="M 40 30 Q 40 14 60 14 L 240 14 Q 260 14 260 30 L 260 104 L 40 104 Z" fill={C.pink} stroke={C.pinkD} strokeWidth={1.3} />
      <T x={150} y={26} s={t(b('轴突末梢', 'Axon terminal'))} size={10.5} weight={600} />
      <Flow id={id} side="bio" fast pts={[[150, 2], [150, 12]]} head="none" />
      <T x={318} y={34} s={t(b('脉冲到达\n钙离子流入', 'spike arrives,\ncalcium enters'))} size={9.5} color={C.dim} />
      <Vec x1={292} y1={52} x2={262} y2={62} color={C.dim} width={1.2} />
      {sites.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={released.includes(i) ? 100 : 72} r={10} fill={C.white} stroke={C.pinkD} strokeWidth={1.2} />
          {[0, 1, 2].map((d) => <circle key={d} cx={x - 4 + d * 4} cy={(released.includes(i) ? 100 : 72) + (d === 1 ? -3 : 2)} r={1.6} fill={C.pinkD} />)}
        </g>
      ))}
      <T x={150} y={50} s={t(b('5 个释放位点，各以概率 p 释放', '5 release sites, each releases with probability p'))} size={9.5} color={C.dim} />
      {released.map((i) => [0, 1, 2, 3].map((d) => <circle key={`${i}${d}`} cx={sites[i] - 9 + d * 6} cy={118 + (d % 2) * 5} r={1.8} fill={C.pinkD} />))}
      <T x={300} y={120} s={t(b('间隙约 20 纳米', 'gap ~20 nm'))} size={9.5} color={C.dim} />
      <rect x={40} y={134} width={220} height={22} rx={4} fill={C.pink} stroke={C.pinkD} strokeWidth={1.3} />
      {sites.map((x, i) => <rect key={i} x={x - 9} y={130} width={18} height={8} rx={2} fill={released.includes(i) ? C.pinkD : C.white} stroke={C.pinkD} strokeWidth={1} />)}
      <T x={150} y={148} s={t(b('受体：数量决定量子大小 q', 'receptors: their number sets the quantum q'))} size={9.5} />
      <Flow id={id} side="bio" pts={[[110, 156], [110, 196]]} label={t(b('电流 = k × q', 'current = k × q'))} lx={40} ly={0} />
      <Mod x={40} y={196} w={220} h={40} side="bio" label={t(b('树突与胞体', 'Dendrite and soma'))} sub={t(b('数千个突触的电流相加', 'currents of thousands of synapses add up'))} />
      <Store x={276} y={176} w={92} h={70} side="bio" label={t(b('可塑性', 'Plasticity'))} sub={t(b('改变 p、q、n', 'changes p, q, n'))} />
      <Flow id={id} side="bio" kind="fb" pts={[[360, 176], [360, 84], [260, 84]]} />
      <T x={150} y={262} s={t(b('这一次：k = 2 个小泡被释放', 'this time: k = 2 vesicles released'))} size={10} color={C.pinkD} />
      <Num x={40} y={14} n={1} side="bio" />
      <Num x={40} y={72} n={2} side="bio" />
      <Num x={40} y={134} n={3} side="bio" />
      <Num x={86} y={176} n={4} side="bio" />
      <Num x={40} y={196} n={5} side="bio" />
      <Num x={276} y={176} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: the binomial distribution of released vesicles for n = 5, q = 10 pA; drag p. */
function BinomialPlot({ t }: FigProps) {
  const [p, setP] = useState(0.3)
  const n = 5
  const f: Frame = { x: 44, y: 26, w: 250, h: 124, xr: [-0.6, 5.6], yr: [0, 1] }
  const probs = Array.from({ length: n + 1 }, (_, k) => binom(n, k) * p ** k * (1 - p) ** (n - k))
  const readout = (v: number) => t(b(`$p = ${v.toFixed(2)}$：平均 $${(n * v * 10).toFixed(1)}$ pA，不释放 $${((1 - v) ** n).toFixed(2)}$，CV $${Math.sqrt((1 - v) / (n * v)).toFixed(2)}$`,
    `$p = ${v.toFixed(2)}$: mean $${(n * v * 10).toFixed(1)}$ pA, none $${((1 - v) ** n).toFixed(2)}$, CV $${Math.sqrt((1 - v) / (n * v)).toFixed(2)}$`))
  return (
    <>
      <Svg id="m01m0" w={380} h={190} label={t(b('二项释放：一次脉冲释放的小泡数的分布', 'Binomial release: distribution of vesicles released by one spike'))}>
        <Axes f={f} xTicks={probs.map((_, k) => [k, `${k * 10}`] as [number, string])} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('突触电流（pA）', 'Synaptic current (pA)'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('概率', 'Probability'))} anchor="start" />
        {probs.map((v, k) => <Bar key={k} f={f} x={k} v={v} w={0.6} color={col} />)}
        {probs.map((v, k) => <Label key={k} x={px(f, k)} y={py(f, v) - 8} s={v.toFixed(2)} size={9.5} color={col} />)}
        <Label x={306} y={64} s={t(b('n = 5 个位点\nq = 10 pA', 'n = 5 sites\nq = 10 pA'))} anchor="start" size={9.5} />
        <Label x={306} y={110} s={t(b('最左一栏：\n完全不释放', 'leftmost bar:\nno release'))} anchor="start" size={9.5} color={col} />
      </Svg>
      <FigSlider label="$p$" value={p} min={0.05} max={0.95} step={0.05} onChange={setP} readout={readout(p)} widest={[readout(0.05)]} />
    </>
  )
}

/* ── M02 short-term plasticity ── */

/** Tsodyks–Markram traces for a 20 Hz train of 6 spikes then silence: resource x, utilization u, and the response u·x. */
function tmTrain(U: number, tauD: number, tauF: number, spikes: number[], tEnd: number, dt = 0.002) {
  let x = 1, u = U
  const xs: [number, number][] = [], us: [number, number][] = [], amps: [number, number][] = []
  let k = 0
  for (let tt = 0; tt <= tEnd; tt += dt) {
    if (k < spikes.length && tt >= spikes[k]) {
      u = u + U * (1 - u)
      amps.push([spikes[k], u * x])
      x = x - u * x
      k++
    }
    xs.push([tt, x]); us.push([tt, u])
    x += (dt * (1 - x)) / tauD
    u += (dt * (U - u)) / tauF
  }
  return { xs, us, amps }
}

/** A depressing train above (resources drain and recover) and a facilitating one below (utilization builds), then one
 * axon reaching two kinds of target. */
function StpMech({ t }: FigProps) {
  const spikes = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3]
  const dep = tmTrain(0.5, 0.5, 0.02, spikes, 0.9)
  const fac = tmTrain(0.1, 0.1, 0.7, spikes, 0.9)
  const fd: Frame = { x: 30, y: 40, w: 220, h: 60, xr: [0, 0.9], yr: [0, 1.05] }
  const ff: Frame = { x: 30, y: 160, w: 220, h: 60, xr: [0, 0.9], yr: [0, 1.05] }
  const pts = (f: Frame, a: [number, number][]) => a.filter((_, i) => i % 3 === 0).map(([tt, v]) => [px(f, tt), py(f, v)] as [number, number])
  return (
    <Svg id="m02" w={380} h={286} label={t(b('短时可塑性：抑制型与易化型突触对同一串脉冲的反应', 'Short-term plasticity: depressing and facilitating synapses responding to the same train'))}>
      {spikes.map((s, i) => <line key={i} x1={px(fd, s)} x2={px(fd, s)} y1={16} y2={28} stroke={C.ink} strokeWidth={1.6} />)}
      <T x={30} y={10} s={t(b('同一串脉冲，20 Hz', 'the same train, 20 Hz'))} size={9.5} anchor="start" color={C.dim} />
      <rect x={fd.x} y={fd.y} width={fd.w} height={fd.h} fill="none" stroke={C.line} />
      <Path pts={pts(fd, dep.xs)} color={col} width={1.6} />
      {dep.amps.map(([s, a], i) => { const v = a / dep.amps[0][1]; return <rect key={i} x={px(fd, s) - 3} y={py(fd, v)} width={6} height={fd.y + fd.h - py(fd, v)} fill={col} fillOpacity={0.35} /> })}
      <T x={256} y={52} s={t(b('资源 x（线）', 'resource x (line)'))} size={9.5} anchor="start" color={col} />
      <T x={256} y={70} s={t(b('每次传递（柱）', 'each response (bars)'))} size={9.5} anchor="start" color={C.dim} />
      <T x={270} y={90} s={t(b('抑制型：越来越弱', 'depressing: weaker'))} size={9.5} anchor="start" weight={600} />
      <rect x={ff.x} y={ff.y} width={ff.w} height={ff.h} fill="none" stroke={C.line} />
      <Path pts={pts(ff, fac.us.map(([tt, v]) => [tt, v / 0.6] as [number, number]))} color={C.lemonD} width={1.6} />
      {fac.amps.map(([s, a], i) => { const v = a / Math.max(...fac.amps.map((q) => q[1])); return <rect key={i} x={px(ff, s) - 3} y={py(ff, v)} width={6} height={ff.y + ff.h - py(ff, v)} fill={col} fillOpacity={0.35} /> })}
      <T x={256} y={172} s={t(b('释放比例 u（线）', 'utilization u (line)'))} size={9.5} anchor="start" color={C.lemonD} />
      <T x={256} y={190} s={t(b('每次传递（柱）', 'each response (bars)'))} size={9.5} anchor="start" color={C.dim} />
      <T x={256} y={210} s={t(b('易化型：越来越强', 'facilitating: stronger'))} size={9.5} anchor="start" weight={600} />
      <T x={px(fd, 0.62)} y={fd.y + fd.h + 14} s={t(b('脉冲停止后仍在恢复', 'still recovering after the train'))} size={9.5} color={C.dim} />
      <T x={px(ff, 0.62)} y={ff.y + ff.h + 14} s={t(b('状态保留约 1 秒', 'state lasts about a second'))} size={9.5} color={C.dim} />
      <Line pts={[[30, 262], [140, 262]]} color={C.pinkD} width={1.6} />
      <Vec x1={140} y1={262} x2={200} y2={250} color={C.pinkD} width={1.4} />
      <Vec x1={140} y1={262} x2={200} y2={274} color={C.pinkD} width={1.4} />
      <T x={84} y={252} s={t(b('同一条轴突', 'one axon'))} size={9.5} color={C.pinkD} />
      <T x={206} y={250} s={t(b('到锥体细胞：抑制型', 'to a pyramidal cell: depressing'))} size={9.5} anchor="start" />
      <T x={206} y={275} s={t(b('到某些中间神经元：易化型', 'to some interneurons: facilitating'))} size={9.5} anchor="start" />
      <Num x={px(fd, 0.05)} y={fd.y - 4} n={1} side="bio" />
      <Num x={px(fd, 0.5)} y={fd.y + 18} n={2} side="bio" />
      <Num x={px(ff, 0.05)} y={ff.y - 4} n={3} side="bio" />
      <Num x={260} y={90} n={4} side="bio" />
      <Num x={px(ff, 0.42)} y={ff.y + ff.h + 14} n={5} side="bio" />
      <Num x={16} y={262} n={6} side="bio" />
    </Svg>
  )
}

const xInf = (f: number, U: number, tau = 0.5) => { const e = Math.exp(-1 / (f * tau)); return (1 - e) / (1 - (1 - U) * e) }

/** Interactive: per-spike strength and total transmitted per second against rate (log axis); drag U. */
function DepressionPlot({ t }: FigProps) {
  const [U, setU] = useState(0.5)
  const f: Frame = { x: 44, y: 26, w: 240, h: 124, xr: [0, 2], yr: [0, 2.1] }
  const lg = (v: number) => Math.log10(v)
  const readout = (v: number) => { const a = 2 * v * xInf(2, v), c = 20 * v * xInf(20, v); return t(b(`$U = ${v.toFixed(2)}$：$20$ Hz 比 $2$ Hz 多传 $${(c / a).toFixed(1)}$ 倍`, `$U = ${v.toFixed(2)}$: $20$ Hz transmits $${(c / a).toFixed(1)}$ times $2$ Hz`)) }
  return (
    <>
      <Svg id="m02m0" w={380} h={190} label={t(b('抑制型突触：频率越高，每个脉冲越弱，每秒传递的总量趋于饱和', 'Depressing synapse: the higher the rate, the weaker each spike, and the total per second saturates'))}>
        <Axes f={f} xTicks={[[0, '1'], [1, '10'], [2, '100']]} yTicks={[[0, '0'], [1, '1'], [2, '2']]} xLabel={t(b('放电频率 f（Hz，对数刻度）', 'Rate f (Hz, log scale)'))} grid />
        <Ref f={f} y={2} color={C.dim} />
        <Path pts={trace(f, (x) => 2 * U * xInf(10 ** x, U))} color={col} width={1.6} dashed />
        <Path pts={trace(f, (x) => 10 ** x * U * xInf(10 ** x, U))} color={col} width={2} />
        {[2, 20].map((r) => <circle key={r} cx={px(f, lg(r))} cy={py(f, r * U * xInf(r, U))} r={3.5} fill={col} />)}
        <Label x={296} y={44} s={t(b('上限 1/τ_D = 2', 'ceiling 1/τ_D = 2'))} anchor="start" size={9.5} />
        <Label x={296} y={80} s={t(b('实线：每秒\n传递的总量', 'solid: total\nper second'))} anchor="start" size={9.5} color={col} />
        <Label x={296} y={124} s={t(b('虚线：每个脉冲\n的强度（×2）', 'dashed: strength\nper spike (×2)'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$U$" value={U} min={0.1} max={0.9} step={0.05} onChange={setU} readout={readout(U)} widest={[readout(0.1)]} />
    </>
  )
}

/* ── M03 STDP ── */

/** Pre and post sides of one synapse: glutamate, AMPA and NMDA receptors, the magnesium block, the back-propagating
 * spike, and the two calcium outcomes. */
function StdpMech({ t }: FigProps) {
  const id = 'm03a'
  return (
    <Svg id={id} w={380} h={300} label={t(b('STDP：NMDA 受体检测两侧活动的巧合', 'STDP: NMDA receptors detect coincident activity on both sides'))}>
      <Mod x={14} y={14} w={150} h={40} side="bio" label={t(b('突触前末梢', 'Presynaptic terminal'))} sub={t(b('释放谷氨酸', 'releases glutamate'))} />
      <Flow id={id} side="bio" pts={[[89, 54], [89, 92]]} label={t(b('谷氨酸', 'glutamate'))} lx={-30} ly={0} />
      <Region x={14} y={92} w={352} h={104} side="bio" label={t(b('突触后', 'Postsynaptic side'))} />
      <Mod x={26} y={116} w={110} h={40} side="bio" label="AMPA" sub={t(b('打开，产生电流', 'opens, gives current'))} />
      <Mod x={150} y={116} w={110} h={40} side="bio" label="NMDA" sub={t(b('静息时被镁堵住', 'blocked by Mg at rest'))} />
      <T x={205} y={176} s={t(b('两侧同时活跃：与门', 'both sides active: AND gate'))} size={9.5} color={C.pinkD} weight={600} />
      <Mod x={276} y={116} w={80} h={40} side="bio" label={t(b('回传脉冲', 'Back spike'))} sub={t(b('推出镁离子', 'expels Mg'))} size={10} />
      <Flow id={id} side="bio" fast pts={[[276, 136], [260, 136]]} />
      <Flow id={id} side="bio" pts={[[205, 196], [205, 214]]} label={t(b('钙离子流入', 'calcium enters'))} lx={36} ly={0} />
      <Mod x={60} y={214} w={140} h={40} side="bio" label={t(b('大量、快速的钙', 'Large, fast calcium'))} sub={t(b('激酶：插入 AMPA，LTP', 'kinases: add AMPA, LTP'))} size={10} />
      <Mod x={214} y={214} w={140} h={40} side="bio" label={t(b('少量、持久的钙', 'Small, lasting calcium'))} sub={t(b('磷酸酶：移走 AMPA，LTD', 'phosphatases: remove AMPA, LTD'))} size={10} />
      <T x={130} y={270} s={t(b('突触前在先', 'pre before post'))} size={9.5} color={C.dim} />
      <T x={284} y={270} s={t(b('突触后在先', 'post before pre'))} size={9.5} color={C.dim} />
      <T x={190} y={290} s={t(b('时间窗随频率、位置与神经调质改变', 'the window shifts with rate, location and neuromodulators'))} size={9.5} color={C.dim} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={276} y={116} n={2} side="bio" />
      <Num x={150} y={116} n={3} side="bio" />
      <Num x={60} y={214} n={4} side="bio" />
      <Num x={354} y={214} n={5} side="bio" />
      <Num x={40} y={290} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: the STDP window for A+ = 0.010, τ = 20 ms; drag the ratio A−/A+ and watch the sign of the integral. */
function StdpPlot({ t }: FigProps) {
  const [ratio, setRatio] = useState(1.05)
  const Ap = 0.01, tau = 20, Am = Ap * ratio
  const f: Frame = { x: 46, y: 22, w: 240, h: 130, xr: [-80, 80], yr: [-0.012, 0.012] }
  const w = (d: number) => (d > 0 ? Ap * Math.exp(-d / tau) : d < 0 ? -Am * Math.exp(d / tau) : 0)
  const integral = tau * (Ap - Am)
  const readout = (r: number) => { const I = tau * Ap * (1 - r); return t(b(`$A_-/A_+ = ${r.toFixed(2)}$：积分 $${(I * 1000).toFixed(1)} \\times 10^{-3}$，${I < 0 ? '总体减弱' : I > 0 ? '总体增强' : '恰好抵消'}`, `$A_-/A_+ = ${r.toFixed(2)}$: integral $${(I * 1000).toFixed(1)} \\times 10^{-3}$, ${I < 0 ? 'net weakening' : I > 0 ? 'net strengthening' : 'balanced'}`)) }
  const pos = trace(f, w, 0.5, 80), neg = trace(f, w, -80, -0.5)
  return (
    <>
      <Svg id="m03m0" w={380} h={196} label={t(b('STDP 时间窗：突触前在先增强，在后减弱', 'The STDP window: pre first strengthens, pre after weakens'))}>
        <Axes f={f} xTicks={[[-80, '−80'], [-40, '−40'], [0, '0'], [40, '40'], [80, '80']]} yTicks={[[-0.01, '−0.01'], [0, '0'], [0.01, '0.01']]} xLabel={t(b('Δt = t后 − t前（毫秒）', 'Δt = t_post − t_pre (ms)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s="Δw" anchor="start" />
        <path d={`M ${px(f, 0.5)} ${py(f, 0)} ${pos.map((p) => `L ${p[0]} ${p[1]}`).join(' ')} L ${px(f, 80)} ${py(f, 0)} Z`} fill={col} fillOpacity={0.25} />
        <path d={`M ${px(f, -80)} ${py(f, 0)} ${neg.map((p) => `L ${p[0]} ${p[1]}`).join(' ')} L ${px(f, -0.5)} ${py(f, 0)} Z`} fill={C.skyD} fillOpacity={0.2} />
        <Path pts={pos} color={col} width={2} />
        <Path pts={neg} color={C.skyD} width={2} />
        <Label x={300} y={50} s={t(b('前在先：增强', 'pre first:\nstrengthen'))} anchor="start" size={9.5} color={col} />
        <Label x={300} y={130} s={t(b('前在后：减弱', 'pre after:\nweaken'))} anchor="start" size={9.5} color={C.skyD} />
        <Label x={300} y={90} s={integral < 0 ? t(b('积分 < 0', 'integral < 0')) : t(b('积分 ≥ 0', 'integral ≥ 0'))} anchor="start" size={10} weight={600} />
      </Svg>
      <FigSlider label="$A_-/A_+$" value={ratio} min={0.8} max={1.2} step={0.01} onChange={setRatio} readout={readout(ratio)} widest={[readout(0.8)]} />
    </>
  )
}

/* ── M03 three-factor learning ── */

/** Coincidence leaves decaying traces at two synapses; a dopamine broadcast converts only the tagged one; the apical
 * dendrite offers a local third factor. */
function ThreeFactorMech({ t }: FigProps) {
  const id = 'm03b'
  const f: Frame = { x: 40, y: 56, w: 170, h: 54, xr: [0, 3], yr: [0, 1.1] }
  return (
    <Svg id={id} w={380} h={298} label={t(b('三因子学习：资格迹、神经调质与树突信号', 'Three-factor learning: eligibility traces, neuromodulators and dendritic signals'))}>
      <T x={40} y={22} s={t(b('两侧共同活动', 'joint activity'))} size={9.5} anchor="start" color={C.dim} />
      <line x1={px(f, 0.2)} x2={px(f, 0.2)} y1={30} y2={44} stroke={C.ink} strokeWidth={1.6} />
      <rect x={f.x} y={f.y} width={f.w} height={f.h} fill="none" stroke={C.line} />
      <Path pts={trace(f, (x) => (x < 0.2 ? 0 : Math.exp(-(x - 0.2) / 0.8)))} color={col} width={2} />
      <T x={f.x + f.w + 6} y={f.y + 14} s={t(b('资格迹 e', 'trace e'))} size={9.5} anchor="start" color={col} />
      <line x1={px(f, 1.4)} x2={px(f, 1.4)} y1={f.y} y2={f.y + f.h} stroke={C.lemonD} strokeWidth={1.6} strokeDasharray="4 3" />
      <T x={px(f, 1.4)} y={f.y + f.h + 12} s={t(b('多巴胺到达', 'dopamine arrives'))} size={9.5} color={C.lemonD} />
      <T x={f.x} y={f.y + f.h + 26} s={t(b('0 秒', '0 s'))} size={9} anchor="start" color={C.dim} />
      <T x={f.x + f.w} y={f.y + f.h + 26} s={t(b('3 秒', '3 s'))} size={9} anchor="end" color={C.dim} />
      <Mod x={260} y={40} w={106} h={40} side="bio" label={t(b('多巴胺神经元', 'Dopamine neurons'))} sub={t(b('奖赏预测误差', 'reward prediction error'))} size={10} />
      <Mod x={30} y={170} w={150} h={40} side="bio" label={t(b('有资格迹的突触', 'Tagged synapse'))} sub={t(b('改变：Δw = η M e', 'changes: Δw = η M e'))} size={10} />
      <Mod x={30} y={226} w={150} h={40} side="bio" label={t(b('没有资格迹的突触', 'Untagged synapse'))} sub={t(b('不变', 'unchanged'))} size={10} />
      <Flow id={id} side="bio" kind="fb" pts={[[300, 80], [300, 146], [200, 146], [200, 190], [180, 190]]} label={t(b('全局广播 M', 'global broadcast M'))} at={1} ly={-8} />
      <Flow id={id} side="bio" kind="fb" pts={[[200, 190], [200, 246], [180, 246]]} />
      <Mod x={220} y={200} w={146} h={52} side="bio" label={t(b('顶端树突', 'Apical dendrite'))} sub={t(b('反馈与输入同时到达：成串放电', 'feedback with input: a burst'))} size={10} />
      <T x={293} y={270} s={t(b('逐个细胞的局部信号', 'a local signal per cell'))} size={9.5} color={C.dim} />
      <Num x={28} y={22} n={1} side="bio" />
      <Num x={f.x + f.w - 30} y={f.y + 30} n={2} side="bio" />
      <Num x={260} y={40} n={3} side="bio" />
      <Num x={366} y={200} n={4} side="bio" />
      <Num x={30} y={170} n={5} side="bio" />
      <Num x={30} y={226} n={6} side="bio" />
    </Svg>
  )
}

/** The worked example: test loss over the first 1000 steps for backpropagation, feedback alignment and a frozen hidden
 * layer (log scale), and the angle between W2ᵀ and B under feedback alignment. */
function FeedbackAlignmentPlot({ t }: FigProps) {
  const r = useMemo(() => feedbackAlignment(1000, 20), [])
  const f: Frame = { x: 40, y: 24, w: 150, h: 124, xr: [0, 1000], yr: [-3, 1] }
  const g: Frame = { x: 238, y: 24, w: 120, h: 124, xr: [0, 1000], yr: [0, 120] }
  const lossPts = (a: number[]) => a.map((v, i) => [px(f, i * 20), py(f, Math.max(-3, Math.log10(v + 1e-6)))] as [number, number])
  return (
    <Svg id="m03m1" w={380} h={188} label={t(b('反馈对齐：随机反馈与反向传播都能降低误差，冻结隐藏层则不能', 'Feedback alignment: random feedback and backpropagation both lower the error, a frozen hidden layer does not'))}>
      <Axes f={f} xTicks={[[0, '0'], [500, '500'], [1000, '1000']]} yTicks={[[-3, '0.001'], [-1, '0.1'], [1, '10']]} xLabel={t(b('训练步数', 'Steps'))} grid />
      <Label x={f.x - 4} y={f.y - 12} s={t(b('测试误差', 'Test error'))} anchor="start" />
      <Path pts={lossPts(r.frozen.loss)} color={C.dim} width={1.6} />
      <Path pts={lossPts(r.bp.loss)} color={C.skyD} width={1.6} dashed />
      <Path pts={lossPts(r.fa.loss)} color={col} width={2} />
      <Label x={f.x + f.w} y={py(f, Math.log10(2.5)) - 8} s={t(b('冻结', 'frozen'))} anchor="end" size={9.5} />
      <Label x={f.x + 4} y={py(f, -2.7)} s={t(b('反馈对齐', 'feedback alignment'))} anchor="start" size={9.5} color={col} />
      <Label x={f.x + 60} y={py(f, -1.4)} s={t(b('反向传播（虚线）', 'backprop (dashed)'))} anchor="start" size={9.5} color={C.skyD} />
      <Axes f={g} xTicks={[[0, '0'], [1000, '1000']]} yTicks={[[0, '0°'], [90, '90°']]} xLabel={t(b('训练步数', 'Steps'))} grid />
      <Label x={g.x - 4} y={g.y - 12} s={t(b('W₂ᵀ 与 B 的夹角', 'Angle of W₂ᵀ and B'))} anchor="start" />
      <Path pts={r.fa.angle.map((v, i) => [px(g, i * 20), py(g, v)] as [number, number])} color={col} width={2} />
    </Svg>
  )
}

/* ── M03 synaptic consolidation ── */

/** A weak path tags synapse A, a strong path drives protein synthesis in the soma, the proteins travel and are
 * captured only where a tag remains. */
function ConsolidationMech({ t }: FigProps) {
  const id = 'm03c'
  return (
    <Svg id={id} w={380} h={290} label={t(b('突触标记与捕获：弱刺激留标记，强刺激造蛋白', 'Synaptic tagging and capture: a weak stimulus tags, a strong one makes proteins'))}>
      <Mod x={14} y={14} w={150} h={40} side="bio" label={t(b('弱刺激：突触 A', 'Weak: synapse A'))} sub={t(b('早期增强 + 标记', 'early potentiation + tag'))} size={10} />
      <Mod x={216} y={14} w={150} h={40} side="bio" label={t(b('强刺激：突触 B', 'Strong: synapse B'))} sub={t(b('早期增强 + 标记', 'early potentiation + tag'))} size={10} />
      <Region x={6} y={74} w={368} h={150} side="bio" label={t(b('同一个神经元', 'One neuron'))} />
      <Mod x={130} y={150} w={120} h={46} side="bio" label={t(b('胞体与细胞核', 'Soma and nucleus'))} sub={t(b('合成可塑性蛋白', 'makes plasticity proteins'))} size={10} />
      <Flow id={id} side="bio" pts={[[291, 54], [291, 172], [250, 172]]} label={t(b('强信号或多巴胺', 'strong signal or dopamine'))} at={0} lx={-50} ly={30} />
      <Store x={30} y={100} w={100} h={46} side="bio" label={t(b('标记 A', 'Tag A'))} sub={t(b('约 1 到 3 小时', '~1 to 3 hours'))} />
      <Flow id={id} side="bio" pts={[[89, 54], [89, 100]]} />
      <Flow id={id} side="bio" head="read" pts={[[130, 173], [80, 173], [80, 146]]} label={t(b('蛋白运输', 'proteins travel'))} at={0} lx={-6} ly={-9} />
      <Mod x={14} y={238} w={170} h={40} side="bio" label={t(b('A 的增强变持久', 'A’s potentiation lasts'))} sub={t(b('标记捕获了蛋白', 'its tag captured proteins'))} size={10} />
      <Mod x={196} y={238} w={170} h={40} side="bio" label={t(b('系统巩固', 'Systems consolidation'))} sub={t(b('之后数天到数年，靠回放', 'days to years later, via replay'))} size={10} />
      <Flow id={id} side="bio" pts={[[40, 146], [40, 238]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={30} y={100} n={2} side="bio" />
      <Num x={130} y={150} n={3} side="bio" />
      <Num x={80} y={192} n={4} side="bio" />
      <Num x={14} y={238} n={5} side="bio" />
      <Num x={196} y={238} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: tag and protein curves around a strong stimulus Δ hours after the weak one; their product is shaded
 * and the capture C(Δ) is read out. Starts at Δ = 1 h from the worked example. */
function CapturePlot({ t }: FigProps) {
  const [d, setD] = useState(1)
  const tT = 1.5, tP = 2
  const C0 = (x: number) => (x >= 0 ? Math.exp(-x / tT) : Math.exp(x / tP))
  const f: Frame = { x: 40, y: 24, w: 210, h: 120, xr: [-4, 6], yr: [0, 1.05] }
  const g: Frame = { x: 280, y: 24, w: 80, h: 120, xr: [-4, 4], yr: [0, 1.05] }
  const T0 = (x: number) => (x >= 0 ? Math.exp(-x / tT) : 0)
  const P0 = (x: number) => (x >= d ? Math.exp(-(x - d) / tP) : 0)
  const prod = trace(f, (x) => T0(x) * P0(x), Math.max(0, d), 6)
  const readout = (v: number) => t(b(`$\\Delta = ${v.toFixed(1)}$ 小时：$C \\approx ${C0(v).toFixed(2)}$`, `$\\Delta = ${v.toFixed(1)}$ h: $C \\approx ${C0(v).toFixed(2)}$`))
  return (
    <>
      <Svg id="m03m2" w={380} h={188} label={t(b('标记与捕获：重叠越多，巩固越可能', 'Tagging and capture: the more overlap, the likelier consolidation'))}>
        <Axes f={f} xTicks={[[-4, '−4'], [0, '0'], [2, '2'], [4, '4'], [6, '6']]} yTicks={[[0, '0'], [1, '1']]} xLabel={t(b('时间（小时，弱刺激在 0）', 'Time (h, weak stimulus at 0)'))} grid />
        {prod.length > 1 && <path d={`M ${prod[0][0]} ${py(f, 0)} ${prod.map((p) => `L ${p[0]} ${p[1]}`).join(' ')} L ${prod[prod.length - 1][0]} ${py(f, 0)} Z`} fill={col} fillOpacity={0.35} />}
        <Path pts={trace(f, T0)} color={col} width={1.8} />
        <Path pts={trace(f, P0)} color={C.lemonD} width={1.8} dashed />
        <Label x={px(f, 0.3)} y={f.y - 8} s={t(b('标记 T', 'tag T'))} anchor="start" size={9.5} color={col} />
        <Label x={px(f, Math.min(4.5, d + 0.3))} y={f.y + 26} s={t(b('蛋白 P', 'proteins P'))} anchor="start" size={9.5} color={C.lemonD} />
        <Axes f={g} xTicks={[[-4, '−4'], [0, '0'], [4, '4']]} yTicks={[[0, '0'], [1, '1']]} xLabel="Δ" />
        <Label x={g.x - 4} y={g.y - 12} s={t(b('捕获 C(Δ)', 'capture C(Δ)'))} anchor="start" />
        <Path pts={trace(g, C0)} color={col} width={1.8} />
        <circle cx={px(g, d)} cy={py(g, C0(d))} r={4} fill={col} />
      </Svg>
      <FigSlider label="$\Delta$" value={d} min={-4} max={4} step={0.5} onChange={setD} readout={readout(d)} widest={[readout(-3.5)]} />
    </>
  )
}

export const SYNAPSE_WEIGHT_FIGS: MechFigs = { mech: SynapseMech, math: { 0: { Fig: BinomialPlot, cap: b('$5$ 个释放位点、量子大小 $10$ pA 时，一个脉冲产生的电流的分布。$p = 0.3$ 时平均 $15$ pA，最左一栏是完全不释放，约占 $17\\%$。拖动 $p$ 看可靠性怎样随释放概率改变。', 'The distribution of current from one spike with $5$ release sites and a quantum of $10$ pA. At $p = 0.3$ the mean is $15$ pA, and the leftmost bar, no release at all, is about $17\\%$. Drag $p$ to see how reliability changes with release probability.') } } }
export const STP_FIGS: MechFigs = { mech: StpMech, math: { 0: { Fig: DepressionPlot, cap: b('$\\tau_D = 0.5$ 秒时，规则脉冲串的稳态。实线是每秒传递的总量，虚线是每个脉冲的强度。$U = 0.5$ 时，$20$ Hz 只比 $2$ Hz 多传约 $2.2$ 倍，总量逼近 $1/\\tau_D = 2$。拖动 $U$：释放比例越大，饱和越早。', 'Steady state of a regular train with $\\tau_D = 0.5$ s. The solid line is the total per second and the dashed line the strength per spike. At $U = 0.5$, $20$ Hz transmits only about $2.2$ times as much as $2$ Hz, and the total approaches $1/\\tau_D = 2$. Drag $U$: the larger the release fraction, the earlier the saturation.') } } }
export const STDP_FIGS: MechFigs = { mech: StdpMech, math: { 0: { Fig: StdpPlot, cap: b('$A_{+} = 0.010$、$\\tau = 20$ 毫秒的时间窗。粉色是增强，蓝色是减弱，两块面积之差就是积分。$A_{-}/A_{+} = 1.05$ 时积分为负，时间无关的输入总体被削弱。拖动比值看积分怎样变号。', 'The window with $A_{+} = 0.010$ and $\\tau = 20$ ms. Pink is strengthening, blue is weakening, and the difference of the two areas is the integral. At $A_{-}/A_{+} = 1.05$ the integral is negative, so inputs unrelated in time are weakened overall. Drag the ratio to see the integral change sign.') } } }
export const THREE_FACTOR_FIGS: MechFigs = { mech: ThreeFactorMech, math: { 0: { Fig: FeedbackAlignmentPlot, cap: b('例中的线性网络，测试误差用对数刻度。反馈对齐（粉色）和反向传播（蓝色虚线）都把误差降到接近 $0$，冻结隐藏层（灰色）停在约 $2.5$。右图：$W_2^{\\top}$ 与随机矩阵 $B$ 的夹角在约 $100$ 步内从约 $99^\\circ$ 降到 $40^\\circ$ 左右。', 'The example’s linear network, with test error on a log scale. Feedback alignment (pink) and backpropagation (blue, dashed) both bring the error near $0$, while the frozen hidden layer (gray) stays near $2.5$. Right: the angle between $W_2^{\\top}$ and the random matrix $B$ falls from about $99^\\circ$ to around $40^\\circ$ within about $100$ steps.') } } }
export const CONSOLIDATION_FIGS: MechFigs = { mech: ConsolidationMech, math: { 0: { Fig: CapturePlot, cap: b('示意。左图：弱刺激在 $0$ 时设置的标记（粉色）与 $\\Delta$ 小时后强刺激引起的蛋白（黄色虚线），阴影是两者的乘积。右图：捕获程度随 $\\Delta$ 的变化。$\\Delta = 1$ 时 $C \\approx 0.51$；拖动 $\\Delta$，间隔越长捕获越少，负值表示强刺激在前。', 'Schematic. Left: the tag set by the weak stimulus at $0$ (pink) and the proteins from a strong stimulus $\\Delta$ hours later (yellow, dashed), with their product shaded. Right: capture as a function of $\\Delta$. At $\\Delta = 1$, $C \\approx 0.51$. Drag $\\Delta$: longer gaps capture less, and negative values mean the strong stimulus came first.') } } }
