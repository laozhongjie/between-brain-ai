import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Line, Svg, T } from '../kit'
import { Flow, Mod, Num } from '../grammar'
import { Axes, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, MechFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const col = SIDE_COLOR.bio

/* ── M09 structural plasticity ── */

function StructuralMech({ t }: FigProps) {
  const sites = [40, 72, 104, 136, 168, 200, 232, 264, 296, 328]
  const actual = [1, 4, 7]
  const days = ['', '', '', '']
  const spines: [number, number[]][] = [[60, [1, 1, 1, 1]], [100, [0, 1, 0, 0]], [140, [1, 1, 0, 0]], [180, [0, 1, 1, 1]], [220, [0, 0, 1, 0]], [260, [1, 1, 1, 1]], [300, [0, 0, 0, 1]]]
  const dev: Frame = { x: 230, y: 214, w: 130, h: 56, xr: [0, 10], yr: [0, 1.1] }
  return (
    <Svg id="m09a" w={380} h={296} label={t(b('结构可塑性：潜在位置、树突棘的生灭与发育中的修剪', 'Structural plasticity: potential sites, spine turnover and pruning in development'))}>
      <Line pts={[[20, 30], [360, 30]]} color={C.dim} width={2} />
      <T x={22} y={18} s={t(b('轴突', 'axon'))} size={9.5} anchor="start" color={C.dim} />
      <Line pts={[[20, 66], [360, 66]]} color={C.pinkD} width={3} />
      <T x={22} y={82} s={t(b('树突', 'dendrite'))} size={9.5} anchor="start" color={C.pinkD} />
      {sites.map((x, i) => actual.includes(i)
        ? <g key={i}><Line pts={[[x, 66], [x, 40]]} color={C.pinkD} width={2} /><circle cx={x} cy={38} r={5} fill={C.pinkD} /></g>
        : <circle key={i} cx={x} cy={48} r={6} fill="none" stroke={C.dim} strokeDasharray="2 2" />)}
      <T x={250} y={88} s={t(b('虚线圈：潜在位置；实心：已有突触', 'dashed: potential site, solid: synapse'))} size={9.5} color={C.dim} />
      <T x={22} y={112} s={t(b('同一段树突，连续 4 天成像', 'the same dendrite imaged on 4 days'))} size={9.5} anchor="start" color={C.dim} />
      {days.map((_, d) => (
        <g key={d}>
          <Line pts={[[40, 130 + d * 18], [320, 130 + d * 18]]} color={C.pinkD} width={1.6} />
          <T x={330} y={130 + d * 18} s={t(b(`第 ${d + 1} 天`, `day ${d + 1}`))} size={9} anchor="start" color={C.dim} />
          {spines.map(([x, on], j) => on[d] ? <circle key={j} cx={x} cy={124 + d * 18} r={3.5} fill={j === 0 || j === 5 ? C.pinkD : C.lemonD} /> : null)}
        </g>
      ))}
      <T x={110} y={210} s={t(b('粉色：持久；黄色：短暂', 'pink: persistent, yellow: transient'))} size={9.5} color={C.dim} />
      <Mod x={14} y={226} w={190} h={44} side="bio" label={t(b('学习后新生、保留的树突棘', 'Spines formed and kept after learning'))} sub={t(b('与长期记忆相关', 'linked to long-term memory'))} size={10} />
      <rect x={dev.x} y={dev.y} width={dev.w} height={dev.h} fill="none" stroke={C.line} />
      <Path pts={trace(dev, (x) => (x < 3 ? x / 3 : 1 - 0.4 * (1 - Math.exp(-(x - 3) / 2))))} color={col} width={1.8} />
      <T x={dev.x + dev.w / 2} y={dev.y + dev.h + 12} s={t(b('发育：先多后剪', 'development: overgrow, then prune'))} size={9.5} color={C.dim} />
      <Num x={14} y={48} n={1} side="bio" />
      <Num x={14} y={150} n={2} side="bio" />
      <Num x={366} y={110} n={3} side="bio" />
      <Num x={222} y={206} n={4} side="bio" />
      <Num x={366} y={48} n={5} side="bio" />
      <Num x={204} y={226} n={6} side="bio" />
    </Svg>
  )
}

const H2 = (f: number) => (f <= 0 || f >= 1 ? 0 : -f * Math.log2(f) - (1 - f) * Math.log2(1 - f))

/** Interactive: bits per actual synapse, H(f)/f, and bits per potential site, H(f), against the filling fraction f. */
function WiringPlot({ t }: FigProps) {
  const [fill, setFill] = useState(0.25)
  const f: Frame = { x: 44, y: 26, w: 240, h: 124, xr: [0.02, 1], yr: [0, 6] }
  const readout = (v: number) => t(b(`$f = ${v.toFixed(2)}$：每个突触约 $${(H2(v) / v).toFixed(1)}$ 比特，每个位置 $${H2(v).toFixed(2)}$ 比特`, `$f = ${v.toFixed(2)}$: about $${(H2(v) / v).toFixed(1)}$ bits per synapse, $${H2(v).toFixed(2)}$ per site`))
  return (
    <>
      <Svg id="m09m0" w={380} h={190} label={t(b('连接的选择所携带的信息随填充率的变化', 'Information carried by the choice of connections against the filling fraction'))}>
        <Axes f={f} xTicks={[[0.02, '0'], [0.25, '0.25'], [0.5, '0.5'], [0.75, '0.75'], [1, '1']]} yTicks={[[0, '0'], [2, '2'], [4, '4'], [6, '6']]} xLabel={t(b('填充率 f', 'Filling fraction f'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('比特', 'Bits'))} anchor="start" />
        <rect x={px(f, 0.2)} y={f.y} width={px(f, 0.3) - px(f, 0.2)} height={f.h} fill={C.lav} fillOpacity={0.5} />
        <Path pts={trace(f, (x) => H2(x) / x, 0.03, 0.99)} color={col} width={2} />
        <Path pts={trace(f, (x) => H2(x), 0.02, 0.99)} color={C.dim} width={1.5} dashed />
        <circle cx={px(f, fill)} cy={py(f, H2(fill) / fill)} r={4} fill={col} />
        <Ref f={f} x={fill} color={col} />
        <Label x={296} y={56} s={t(b('实线：每个突触', 'solid: per synapse'))} anchor="start" size={9.5} color={col} />
        <Label x={296} y={80} s={t(b('虚线：每个位置', 'dashed: per site'))} anchor="start" size={9.5} />
        <Label x={296} y={110} s={t(b('灰底：皮层的\n估计范围', 'shaded: cortical\nestimate'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$f$" value={fill} min={0.05} max={0.95} step={0.05} onChange={setFill} readout={readout(fill)} widest={[readout(0.05)]} />
    </>
  )
}

/* ── M09 glia ── */

function GliaMech({ t }: FigProps) {
  const id = 'm09b'
  return (
    <Svg id={id} w={380} h={296} label={t(b('三方突触、髓鞘与小胶质细胞', 'The tripartite synapse, myelin and microglia'))}>
      <path d="M 40 40 Q 40 22 60 22 L 140 22 Q 160 22 160 40 L 160 80 L 40 80 Z" fill={C.pink} stroke={C.pinkD} />
      <T x={100} y={50} s={t(b('突触前', 'presynaptic'))} size={10} weight={600} />
      <rect x={40} y={98} width={120} height={30} rx={6} fill={C.pink} stroke={C.pinkD} />
      <T x={100} y={113} s={t(b('突触后', 'postsynaptic'))} size={10} weight={600} />
      <path d="M 24 60 Q 12 90 24 120 Q 60 150 100 140 Q 150 150 176 120 Q 188 90 176 60" fill="none" stroke={C.lemonD} strokeWidth={6} strokeOpacity={0.55} />
      <Mod x={196} y={60} w={170} h={48} side="bio" label={t(b('星形胶质细胞', 'Astrocyte'))} sub={t(b('包裹约十万个突触', 'wraps ~100,000 synapses'))} />
      <T x={100} y={92} s={t(b('谷氨酸被回收', 'glutamate taken up'))} size={9} color={C.lemonD} />
      <Flow id={id} side="bio" pts={[[178, 84], [196, 84]]} />
      <T x={281} y={126} s={t(b('钙信号：数秒内起落', 'calcium: rises over seconds'))} size={9.5} color={C.dim} />
      <Flow id={id} side="bio" kind="fb" pts={[[240, 108], [240, 150], [100, 150], [100, 140]]} label={t(b('胶质递质？（有争议）', 'gliotransmitters? (debated)'))} at={1} ly={12} />
      <Line pts={[[30, 200], [360, 200]]} color={C.pinkD} width={2} />
      {[60, 140, 220, 300].map((x) => <rect key={x} x={x} y={192} width={56} height={16} rx={8} fill={C.lav} stroke={C.lavD} />)}
      <T x={195} y={222} s={t(b('少突胶质细胞的髓鞘：调节传导时间', 'oligodendrocyte myelin: tunes conduction time'))} size={9.5} color={C.dim} />
      <circle cx={60} cy={262} r={14} fill={C.mint} stroke={C.mintD} />
      <T x={84} y={262} s={t(b('小胶质细胞吞噬被标记的弱突触', 'microglia engulf tagged weak synapses'))} size={9.5} anchor="start" color={C.dim} />
      <Num x={20} y={40} n={1} side="bio" />
      <Num x={100} y={78} n={2} side="bio" />
      <Num x={366} y={60} n={3} side="bio" />
      <Num x={240} y={150} n={4} side="bio" />
      <Num x={16} y={200} n={5} side="bio" />
      <Num x={36} y={262} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: one second of synaptic activity, the astrocyte calcium A(t) with threshold, and the release probability
 * p(t)/p0 of the domain's synapses; drag τ_a. */
function AstroPlot({ t }: FigProps) {
  const [tau, setTau] = useState(2)
  const th = 0.2
  const A = (x: number) => (x < 0 ? 0 : x <= 1 ? 1 - Math.exp(-x / tau) : (1 - Math.exp(-1 / tau)) * Math.exp(-(x - 1) / tau))
  const f: Frame = { x: 44, y: 26, w: 240, h: 124, xr: [-0.5, 6], yr: [0, 1.4] }
  const peak = 1 - Math.exp(-1 / tau)
  const above = (tt: number) => { const p = 1 - Math.exp(-1 / tt); if (p <= th) return 0; const on = -tt * Math.log(1 - th), off = 1 + tt * Math.log(p / th); return off - on }
  const readout = (v: number) => t(b(`$\\tau_a = ${v.toFixed(1)}$ 秒：最多提高 $${(Math.max(0, 1 - Math.exp(-1 / v) - th) * 100).toFixed(0)}\\%$，持续约 $${above(v).toFixed(1)}$ 秒`, `$\\tau_a = ${v.toFixed(1)}$ s: up to $${(Math.max(0, 1 - Math.exp(-1 / v) - th) * 100).toFixed(0)}\\%$ more, for about $${above(v).toFixed(1)}$ s`))
  return (
    <>
      <Svg id="m09m1" w={380} h={190} label={t(b('星形胶质细胞的慢整合：一秒的活动带来数秒的调节', 'Slow astrocyte integration: one second of activity, seconds of modulation'))}>
        <Axes f={f} xTicks={[[0, '0'], [2, '2'], [4, '4'], [6, '6']]} yTicks={[[0, '0'], [1, '1']]} xLabel={t(b('时间（秒）', 'Time (s)'))} grid />
        <rect x={px(f, 0)} y={py(f, 1.3)} width={px(f, 1) - px(f, 0)} height={6} fill={C.lemonD} fillOpacity={0.8} />
        <Label x={px(f, 1) + 4} y={py(f, 1.3) + 3} s={t(b('突触活动', 'synaptic activity'))} anchor="start" size={9.5} color={C.lemonD} />
        <Ref f={f} y={th} color={C.dim} />
        <Path pts={trace(f, A)} color={col} width={2} />
        <Path pts={trace(f, (x) => 1 + Math.max(0, A(x) - th) - 0.0)} color={C.skyD} width={1.6} dashed />
        <Label x={296} y={50} s={t(b('虚线：p / p₀', 'dashed: p / p₀'))} anchor="start" size={9.5} color={C.skyD} />
        <Label x={296} y={90} s={t(b('实线：钙信号 A', 'solid: calcium A'))} anchor="start" size={9.5} color={col} />
        <Label x={296} y={py(f, th)} s={t(b('阈值', 'threshold'))} anchor="start" size={9.5} />
        <Label x={px(f, 1)} y={py(f, peak) - 10} s={peak.toFixed(2)} size={9.5} color={col} />
      </Svg>
      <FigSlider label="$\tau_a$" value={tau} min={0.5} max={5} step={0.1} onChange={setTau} readout={readout(tau)} widest={[readout(4.4)]} />
    </>
  )
}

export const STRUCTURAL_FIGS: MechFigs = { mech: StructuralMech, math: { 0: { Fig: WiringPlot, cap: b('实线是平均每个实际突触由「存在与否」携带的比特数，虚线是每个潜在位置的比特数，灰底是皮层填充率的估计范围。$f = 0.25$ 时每个突触约 $3.2$ 比特。拖动 $f$：填充率越低，每个突触携带越多，每个位置的总量则在 $0.5$ 时最大。', 'The solid line is the bits each actual synapse carries by existing, the dashed line the bits per potential site, and the shading the estimated cortical filling fraction. At $f = 0.25$ each synapse carries about $3.2$ bits. Drag $f$: lower filling fractions give more bits per synapse, while the total per site peaks at $0.5$.') } } }
export const GLIA_FIGS: MechFigs = { mech: GliaMech, math: { 0: { Fig: AstroPlot, cap: b('示意。区域内的突触活跃 $1$ 秒（黄条）。$\\tau_a = 2$ 秒时，钙信号（实线）升到约 $0.39$，超过阈值的部分使释放概率（虚线，相对基础值）最多提高约 $19\\%$，持续约 $1.9$ 秒。拖动 $\\tau_a$：时间常数越长，钙信号升得越低，但回落得越慢。', 'Schematic. The domain’s synapses are active for $1$ s (yellow). At $\\tau_a = 2$ s, calcium (solid) rises to about $0.39$, and the part above threshold raises release probability (dashed, relative to baseline) by up to about $19\\%$ for about $1.9$ s. Drag $\\tau_a$: a longer time constant raises calcium less but lets it fall more slowly.') } } }
