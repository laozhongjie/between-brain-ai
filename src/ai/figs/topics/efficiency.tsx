import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Mod, Num, Region, Store } from '../grammar'
import { Axes, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** The brain's energy budget: blood supplies ATP to synapses (memory and compute in one place) and axons; inside a
 * neuron, communication costs about 35 times computation, which keeps firing sparse. */
function BrainBudgetArch({ t }: FigProps) {
  const id = 'x02b'
  const bar = (y: number, w: number, label: string, value: string) => (
    <g>
      <T x={22} y={y + 5} s={label} size={9.5} anchor="start" color={C.dim} />
      <rect x={70} y={y} width={w} height={10} rx={2} fill={C.pinkD} fillOpacity={0.75} />
      <T x={76 + w} y={y + 5} s={value} size={9.5} anchor="start" color={C.pinkD} />
    </g>
  )
  return (
    <Svg id={id} w={380} h={298} label={t(b('大脑能量预算的结构与信息流', 'Structure and information flow of the brain’s energy budget'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('能量供应', 'Energy supply'))} sub={t(b('血液送来葡萄糖和氧，线粒体生成 ATP', 'blood brings glucose and oxygen, mitochondria make ATP'))} />
      <Region x={6} y={68} w={368} h={150} side="bio" label={t(b('神经元', 'Neuron'))} />
      <Store x={18} y={90} w={104} h={58} side="bio" label={t(b('突触', 'Synapse'))} sub={t(b('存储即计算', 'stores and computes'))} />
      <Mod x={140} y={94} w={104} h={50} side="bio" label={t(b('树突与胞体', 'Dendrites, soma'))} sub={t(b('汇总电流', 'sum currents'))} />
      <Mod x={262} y={94} w={104} h={50} side="bio" label={t(b('轴突', 'Axon'))} sub={t(b('脉冲传导', 'conducts spikes'))} />
      {bar(170, 6, t(b('计算', 'compute')), t(b('约 0.1 W', '~0.1 W')))}
      {bar(190, 210, t(b('通信', 'transmit')), t(b('约 3.5 W', '~3.5 W')))}
      <Mod x={14} y={240} w={170} h={44} side="bio" label={t(b('稀疏放电', 'Sparse firing'))} sub={t(b('平均低于每秒一次', 'under one spike per second'))} />
      <Mod x={196} y={240} w={170} h={44} side="bio" label={t(b('按需分配', 'Allocation by demand'))} sub={t(b('局部血流增加，总量几乎不变', 'local flow up, total flat'))} />

      <Flow id={id} side="bio" kind="fb" pts={[[70, 50], [70, 90]]} label="ATP" lx={14} ly={2} />
      <Flow id={id} side="bio" kind="fb" pts={[[314, 50], [314, 94]]} label="ATP" lx={14} ly={2} />
      <Flow id={id} side="bio" head="read" pts={[[122, 119], [140, 119]]} />
      <Flow id={id} side="bio" pts={[[244, 119], [262, 119]]} />
      <Flow id={id} side="bio" pts={[[314, 144], [314, 228], [99, 228], [99, 240]]} label={t(b('脉冲', 'spikes'))} at={1} ly={-6} />
      <Flow id={id} side="bio" kind="fb" pts={[[366, 262], [377, 262], [377, 32], [366, 32]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={18} y={92} n={2} side="bio" />
      <Num x={140} y={94} n={3} side="bio" />
      <Num x={262} y={94} n={4} side="bio" />
      <Num x={14} y={240} n={5} side="bio" />
      <Num x={196} y={240} n={6} side="bio" />
    </Svg>
  )
}

/** GPUs and neuromorphic chips: weights travel from HBM to on-chip cache and tensor cores (each read far dearer than an
 * operation), batching reuses each read, chips trade data, and a neuromorphic chip keeps memory beside each core. */
function ChipArch({ t }: FigProps) {
  const id = 'x02c'
  return (
    <Svg id={id} w={380} h={298} label={t(b('GPU 与神经形态芯片的结构与信息流', 'Structure and information flow of GPUs and neuromorphic chips'))}>
      <Store x={14} y={22} w={120} h={66} side="comp" label={t(b('显存（HBM）', 'Memory (HBM)'))} sub={t(b('读取约 640 pJ', 'read ~640 pJ'))} />
      <Region x={150} y={6} w={224} h={148} side="comp" label={t(b('GPU 芯片', 'GPU chip'))} />
      <Mod x={162} y={30} w={92} h={44} side="comp" label={t(b('片上缓存', 'On-chip cache'))} sub={t(b('读取约 5 pJ', 'read ~5 pJ'))} size={10.5} />
      <Mod x={272} y={30} w={94} h={44} side="comp" label={t(b('张量核心', 'Tensor cores'))} sub={t(b('乘法约 3.7 pJ', 'multiply ~3.7 pJ'))} size={10.5} />
      <Mod x={162} y={98} w={204} h={44} side="comp" label={t(b('批处理与复用', 'Batching and reuse'))} sub={t(b('读一次权重，服务整批请求', 'one weight read serves a batch'))} />
      <Mod x={14} y={176} w={150} h={44} side="comp" label={t(b('其他 GPU', 'Other GPUs'))} sub={t(b('交换梯度和激活', 'trade gradients, activations'))} />
      <Region x={180} y={172} w={194} h={116} side="comp" label={t(b('神经形态芯片', 'Neuromorphic chip'))} />
      <Mod x={192} y={196} w={74} h={44} side="comp" label={t(b('核', 'Core'))} sub={t(b('自带突触存储', 'own synapses'))} />
      <Mod x={290} y={196} w={74} h={44} side="comp" label={t(b('核', 'Core'))} sub={t(b('自带突触存储', 'own synapses'))} />
      <T x={277} y={268} s={t(b('没有脉冲就不计算', 'no spike, no computation'))} size={9.5} color={C.dim} />

      <Flow id={id} side="comp" fast head="read" pts={[[134, 52], [162, 52]]} />
      <Flow id={id} side="comp" pts={[[254, 52], [272, 52]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[208, 98], [208, 74]]} />
      <Flow id={id} side="comp" pts={[[150, 128], [76, 128], [76, 176]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[110, 176], [110, 144], [150, 144]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[266, 218], [290, 218]]} label={t(b('脉冲', 'spikes'))} ly={-25} />
      <Num x={14} y={24} n={1} side="comp" />
      <Num x={162} y={30} n={2} side="comp" />
      <Num x={272} y={30} n={3} side="comp" />
      <Num x={14} y={176} n={4} side="comp" />
      <Num x={162} y={98} n={5} side="comp" />
      <Num x={366} y={172} n={6} side="comp" />
    </Svg>
  )
}

/* Energy-efficient coding: bits per unit energy for a binary neuron that fires with probability p per window. */
const H = (p: number) => (p <= 0 || p >= 1 ? 0 : -p * Math.log2(p) - (1 - p) * Math.log2(1 - p))
const eff = (p: number, r: number) => H(p) / (1 + p * r)
const bestP = (r: number) => { let bp = 0.001, be = 0; for (let p = 0.001; p <= 0.5; p += 0.0005) { const e = eff(p, r); if (e > be) { be = e; bp = p } } return bp }

/** Interactive: drag the spike-to-rest cost ratio r and watch the most efficient firing probability slide toward
 * zero. Efficiency is shown relative to its own peak. Starts at the worked example's r = 50. */
function EfficientCodePlot({ t }: FigProps) {
  const [r, setR] = useState(50)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 26, w: 250, h: 130, xr: [0, 0.5], yr: [0, 1.05] }
  const p0 = bestP(r), top = eff(p0, r)
  const readout = (v: number) => t(b(`$r = ${v}$：能效最高的 $p \\approx ${bestP(v).toFixed(3)}$`, `$r = ${v}$: most efficient $p \\approx ${bestP(v).toFixed(3)}$`))
  return (
    <>
      <Svg id="x02mb0" w={380} h={196} label={t(b('能效编码：脉冲越贵，能效最高的放电概率越低', 'Energy-efficient coding: the costlier a spike, the lower the most efficient firing probability'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.1, '0.1'], [0.2, '0.2'], [0.3, '0.3'], [0.4, '0.4'], [0.5, '0.5']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('放电概率 p', 'Firing probability p'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('相对能效 η / η 最大值', 'Relative efficiency η / max'))} anchor="start" />
        <Path pts={trace(f, (p) => H(p), 0.001, 0.5)} color={C.dim} dashed />
        <Path pts={trace(f, (p) => eff(p, r) / top, 0.001, 0.5)} color={col} width={2} />
        <Ref f={f} x={p0} color={col} />
        <Label x={px(f, p0) + 4} y={py(f, 1.02)} s={`p ≈ ${p0.toFixed(3)}`} anchor="start" size={10} color={col} />
        <Label x={300} y={60} s={t(b('实线：每单位\n能量的比特数', 'solid: bits per\nunit energy'))} anchor="start" size={9.5} color={col} />
        <Label x={300} y={104} s={t(b('虚线：每个时间\n窗的比特数 H(p)', 'dashed: bits per\nwindow H(p)'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$r$" value={r} min={1} max={200} step={1} onChange={setR} readout={readout(r)} widest={[readout(200)]} />
    </>
  )
}

/* Roofline for the worked example's chip: 1000 TFLOP/s peak, 3 TB/s bandwidth; one 2-byte weight per multiply-add at
 * batch size 1, so intensity equals the batch size. */
const PEAK = 1000, BW = 3
const lg = Math.log10

/** Interactive: drag the batch size (powers of two) and watch the operating point climb the bandwidth slope until it
 * meets the compute roof. Starts at the worked example's batch of 1. */
function RooflinePlot({ t }: FigProps) {
  const [k, setK] = useState(0)
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 46, y: 26, w: 250, h: 130, xr: [-0.3, 3.3], yr: [0, 3.3] }
  const perf = (i: number) => Math.min(PEAK, BW * i)
  const batch = 2 ** k
  const readout = (kk: number) => { const bb = 2 ** kk, p = perf(bb); return t(b(`批大小 $${bb}$：约 $${p.toFixed(0)}$ TFLOP/s，峰值的 $${((p / PEAK) * 100).toFixed(1)}\\%$`, `batch $${bb}$: about $${p.toFixed(0)}$ TFLOP/s, $${((p / PEAK) * 100).toFixed(1)}\\%$ of peak`)) }
  return (
    <>
      <Svg id="x02mc0" w={380} h={196} label={t(b('Roofline：运算强度低时速度受显存带宽限制，高于拐点后受峰值算力限制', 'Roofline: at low intensity memory bandwidth limits speed, above the ridge point peak compute does'))}>
        <Axes f={f} xTicks={[[0, '1'], [1, '10'], [2, '100'], [3, '1000']]} yTicks={[[0, '1'], [1, '10'], [2, '100'], [3, '1000']]} xLabel={t(b('运算强度 I（次 / 字节）', 'Intensity I (FLOP per byte)'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('速度（TFLOP/s）', 'Speed (TFLOP/s)'))} anchor="start" />
        <Path pts={trace(f, (x) => lg(perf(10 ** x)))} color={col} width={2} />
        <Ref f={f} x={lg(PEAK / BW)} />
        <Label x={px(f, lg(PEAK / BW)) - 4} y={py(f, 0.4)} s={t(b('拐点 333', 'ridge 333'))} anchor="end" size={9.5} />
        <circle cx={px(f, lg(batch))} cy={py(f, lg(perf(batch)))} r={4.5} fill={col} />
        <Label x={306} y={56} s={t(b('平台：峰值\n1000 TFLOP/s', 'roof: peak\n1000 TFLOP/s'))} anchor="start" size={9.5} color={col} />
        <Label x={306} y={110} s={t(b('斜坡：带宽\n3 TB/s 乘以 I', 'slope: 3 TB/s\ntimes I'))} anchor="start" size={9.5} color={col} />
      </Svg>
      <FigSlider label={t(b('批大小', 'Batch size'))} value={k} min={0} max={10} step={1} onChange={setK} readout={readout(k)} widest={[readout(10), readout(6)]} />
    </>
  )
}

/** The worked example's 32-bit multiply-add: 4.6 pJ of arithmetic, plus reading both operands from DRAM or from
 * on-chip SRAM, on a log energy axis. */
function MoveEnergyPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 120, y: 30, w: 210, h: 110, xr: [0, 3.3], yr: [0, 2] }
  const rows: [string, number, number][] = [[t(b('从 DRAM 读', 'from DRAM')), 1280, 4.6], [t(b('从 SRAM 读', 'from SRAM')), 10, 4.6]]
  return (
    <Svg id="x02mc1" w={380} h={180} label={t(b('一次乘加的能耗：从 DRAM 取数时，搬运占绝大部分', 'Energy of one multiply-add: reading from DRAM, data movement is nearly all of it'))}>
      <Axes f={f} xTicks={[[0, '1'], [1, '10'], [2, '100'], [3, '1000']]} xLabel={t(b('能耗（pJ，对数刻度）', 'Energy (pJ, log scale)'))} />
      {rows.map(([name, read, op], i) => {
        const y = f.y + 18 + i * 46, total = read + op
        return (
          <g key={i}>
            <T x={f.x - 8} y={y + 9} s={name} size={10} anchor="end" />
            <rect x={f.x} y={y} width={px(f, lg(total)) - f.x} height={18} fill={col} fillOpacity={0.35} stroke={col} />
            <rect x={f.x} y={y} width={px(f, lg(op)) - f.x} height={18} fill={col} fillOpacity={0.9} />
            <T x={px(f, lg(total)) + 6} y={y + 9} s={`${total.toFixed(0)} pJ`} size={10} anchor="start" color={col} />
          </g>
        )
      })}
      <Ref f={f} x={lg(4.6)} />
      <Label x={px(f, lg(4.6))} y={f.y - 10} s={t(b('运算本身 4.6 pJ', 'arithmetic 4.6 pJ'))} size={9.5} />
    </Svg>
  )
}

export const EFFICIENCY_FIGS: TopicFigs = {
  arch: { brain: BrainBudgetArch, ai: ChipArch },
  math: {
    bio: {
      0: { Fig: EfficientCodePlot, cap: b('实线是每单位能量传递的比特数（以自身最大值为 $1$），虚线是每个时间窗的比特数。$r = 50$ 时，能效在 $p \\approx 0.055$ 达到最高，远低于信息量最大的 $p = 0.5$。拖动滑块改变脉冲与静息的代价之比 $r$：$r$ 越大，最佳放电概率越低。', 'The solid line is bits per unit energy, scaled to a peak of $1$, and the dashed line is bits per window. At $r = 50$, efficiency peaks at $p \\approx 0.055$, far below the $p = 0.5$ that carries the most information. Drag the slider to change $r$, the ratio of spike to rest cost. The larger $r$, the lower the best firing probability.') },
    },
    comp: {
      0: { Fig: RooflinePlot, cap: b('例中芯片的 Roofline，两轴都是对数刻度。批大小为 $1$ 时运算强度约为 $1$，速度只有约 $3$ TFLOP/s。拖动滑块把批大小加倍：工作点沿带宽斜坡上升，过了拐点 $333$ 才碰到峰值算力。', 'The roofline of the example chip, both axes on log scales. At batch size $1$ the intensity is about $1$ and the speed only about $3$ TFLOP/s. Drag the slider to double the batch. The operating point climbs the bandwidth slope and meets peak compute only past the ridge point of $333$.') },
      1: { Fig: MoveEnergyPlot, cap: b('例中一次 32 位乘加：实心部分是运算本身的 $4.6$ pJ，半透明部分是读取两个操作数的能耗（对数刻度）。从 DRAM 读取时总能耗约 $1285$ pJ，搬运占 $99.6\\%$；从片上 SRAM 读取时约 $15$ pJ。', 'The example’s 32-bit multiply-add. The solid part is the $4.6$ pJ of arithmetic and the translucent part is reading both operands, on a log scale. Reading from DRAM totals about $1285$ pJ, $99.6\\%$ of it data movement. Reading from on-chip SRAM totals about $15$ pJ.') },
    },
  },
}
