import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Line, Svg, T } from '../kit'
import { Flow, Num } from '../grammar'
import { Axes, Bar, FigSlider, Label, Path, Ref, SIDE_COLOR, Vec, px, py, trace, type Frame } from '../plot'
import type { FigProps, MechFigs } from '../types'
import { normal, seeded } from './sims'

const b = (zh: string, en: string): Bi => ({ zh, en })
const col = SIDE_COLOR.bio

/* ── M04 neuron models ── */

/** An adapting integrate-and-fire neuron under a step of current (dimensionless, θ = 1). */
function lifTrace() {
  const dt = 0.1, tau = 20, tauW = 120, ref = 2
  let v = 0, w = 0, lastSpike = -100
  const pts: [number, number][] = [], spikes: number[] = []
  for (let tt = 0; tt <= 300; tt += dt) {
    const I = tt > 20 && tt < 260 ? 1.6 : 0
    if (tt - lastSpike < ref) v = 0
    else v += (dt / tau) * (-v + I - w)
    w += (dt / tauW) * -w
    if (v >= 1) { pts.push([tt, 1]); pts.push([tt, 2.2]); spikes.push(tt); v = 0; w += 0.12; lastSpike = tt }
    pts.push([tt, v])
  }
  return { pts, spikes }
}

function NeuronMech({ t }: FigProps) {
  const { pts } = lifTrace()
  const f: Frame = { x: 30, y: 20, w: 320, h: 130, xr: [0, 300], yr: [-0.15, 2.3] }
  const ladder = [b('离子通道\nHodgkin-Huxley', 'ion channels\nHodgkin-Huxley'), b('两变量\nIzhikevich', 'two variables\nIzhikevich'), b('积分发放\nLIF', 'integrate\nand fire'), b('放电率\n模型', 'rate\nmodel'), b('人工单元\nReLU', 'artificial\nunit')]
  return (
    <Svg id="m04a" w={380} h={290} label={t(b('积分发放神经元的膜电位，与神经元模型的抽象层次', 'Membrane potential of an integrate-and-fire neuron, and the levels of neuron models'))}>
      <rect x={px(f, 20)} y={f.y + f.h + 2} width={px(f, 260) - px(f, 20)} height={6} fill={C.lemonD} fillOpacity={0.7} />
      <T x={px(f, 140)} y={f.y + f.h + 18} s={t(b('恒定输入电流', 'constant input current'))} size={9.5} color={C.lemonD} />
      <Ref f={f} y={1} color={C.dim} />
      <Label x={f.x + f.w + 2} y={py(f, 1)} s={t(b('阈值', 'threshold'))} anchor="start" size={9.5} />
      <Ref f={f} y={0} color={C.line} />
      <Label x={f.x + f.w + 2} y={py(f, 0)} s={t(b('静息', 'rest'))} anchor="start" size={9.5} />
      <Path pts={pts.map(([x, y]) => [px(f, x), py(f, y)] as [number, number])} color={col} width={1.5} />
      <T x={px(f, 40)} y={py(f, 1.6)} s={t(b('充电', 'charging'))} size={9.5} color={C.dim} />
      <T x={px(f, 280)} y={py(f, 0.5)} s={t(b('漏电回落', 'leak'))} size={9.5} color={C.dim} />
      <T x={px(f, 200)} y={py(f, 2.15)} s={t(b('间隔变长：适应', 'gaps widen: adaptation'))} size={9.5} color={C.dim} />
      <Num x={px(f, 26)} y={py(f, 0.55)} n={1} side="bio" />
      <Num x={px(f, 268)} y={py(f, 0.85)} n={2} side="bio" />
      <Num x={px(f, 52)} y={py(f, 2.15)} n={3} side="bio" />
      <Num x={px(f, 66)} y={py(f, 0.4)} n={4} side="bio" />
      <Num x={px(f, 128)} y={py(f, 2.15)} n={5} side="bio" />
      {ladder.map((s, i) => (
        <g key={i}>
          <rect x={14 + i * 72} y={216} width={64} height={44} rx={7} fill={C.pink} stroke={C.pinkD} strokeOpacity={1 - i * 0.15} strokeWidth={1.2} />
          <T x={46 + i * 72} y={238} s={t(s)} size={9.5} />
          {i < 4 && <Vec x1={79 + i * 72} y1={238} x2={85 + i * 72} y2={238} color={C.dim} width={1.2} />}
        </g>
      ))}
      <T x={190} y={276} s={t(b('越往右越简化：保留的细节越少，计算越快', 'further right is simpler: fewer details, faster to compute'))} size={9.5} color={C.dim} />
      <Num x={14} y={214} n={6} side="bio" />
    </Svg>
  )
}

const lifRate = (x: number, tau: number, ref = 2) => (x <= 1 ? 0 : 1000 / (ref + tau * Math.log(x / (x - 1))))

/** Interactive: the f-I curve of an integrate-and-fire neuron (t_ref = 2 ms) against input in units of threshold;
 * drag τ_m. A ReLU with the same slope at RI = 1.5θ is dashed. */
function FiPlot({ t }: FigProps) {
  const [tau, setTau] = useState(20)
  const f: Frame = { x: 46, y: 26, w: 240, h: 124, xr: [0, 4], yr: [0, 220] }
  const readout = (v: number) => t(b(`$\\tau_m = ${v}$ 毫秒：$RI = 1.5\\,\\theta$ 时约 $${lifRate(1.5, v).toFixed(0)}$ Hz`, `$\\tau_m = ${v}$ ms: about $${lifRate(1.5, v).toFixed(0)}$ Hz at $RI = 1.5\\,\\theta$`))
  return (
    <>
      <Svg id="m04m0" w={380} h={190} label={t(b('积分发放神经元的输入与放电频率', 'Input and firing rate of an integrate-and-fire neuron'))}>
        <Axes f={f} xTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4']]} yTicks={[[0, '0'], [100, '100'], [200, '200']]} xLabel={t(b('输入 RI（以阈值 θ 为单位）', 'Input RI (in units of threshold θ)'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('放电频率（Hz）', 'Firing rate (Hz)'))} anchor="start" />
        <Path pts={trace(f, (x) => lifRate(x, tau), 0, 4, 300)} color={col} width={2} />
        <Path pts={trace(f, (x) => Math.max(0, (x - 1) * 84))} color={C.dim} width={1.4} dashed />
        <circle cx={px(f, 1.5)} cy={py(f, lifRate(1.5, tau))} r={3.5} fill={col} />
        <Label x={298} y={60} s={t(b('实线：积分发放', 'solid: integrate\nand fire'))} anchor="start" size={9.5} color={col} />
        <Label x={298} y={104} s={t(b('虚线：ReLU\n（只有阈值）', 'dashed: ReLU\n(threshold only)'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$\tau_m$" value={tau} min={5} max={50} step={1} onChange={setTau} readout={readout(tau)} widest={[readout(50)]} />
    </>
  )
}

/* ── M04 dendrites ── */

const sBranch = (u: number) => 1 / (1 + Math.exp(-(u - 3) / 0.5))

function DendriteMech({ t }: FigProps) {
  const id = 'm04b'
  const soma: [number, number][] = [[190, 196], [172, 226], [208, 226]]
  return (
    <Svg id={id} w={380} h={300} label={t(b('锥体细胞的树突：分支上的局部棘波与顶端的上下文输入', 'Dendrites of a pyramidal cell: local spikes on branches and context input at the apex'))}>
      <rect x={6} y={8} width={368} height={34} rx={8} fill={C.lav} fillOpacity={0.35} stroke={C.line} />
      <T x={16} y={18} s={t(b('皮层第 1 层：来自高级脑区和丘脑的反馈', 'cortical layer 1: feedback from higher areas and thalamus'))} size={9.5} anchor="start" color={C.dim} />
      <Line pts={[[190, 196], [190, 56]]} color={C.pinkD} width={2.2} />
      <Line pts={[[190, 60], [150, 30]]} color={C.pinkD} width={1.6} />
      <Line pts={[[190, 60], [230, 30]]} color={C.pinkD} width={1.6} />
      {[[156, 34], [166, 41], [222, 34], [212, 41]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.5} fill={C.lemonD} />)}
      <T x={262} y={64} s={t(b('顶端树突', 'apical dendrite'))} size={10} anchor="start" weight={600} />
      <T x={262} y={78} s={t(b('上下文输入', 'context input'))} size={9.5} anchor="start" color={C.lemonD} />
      <path d={soma.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ') + ' Z'} fill={C.pink} stroke={C.pinkD} strokeWidth={1.4} />
      <T x={190} y={238} s={t(b('胞体', 'soma'))} size={10} weight={600} />
      {/* basal branches: left one with clustered inputs and a local spike, right ones with scattered inputs */}
      <Line pts={[[176, 222], [110, 270]]} color={C.pinkD} width={1.8} />
      <Line pts={[[182, 226], [150, 286]]} color={C.pinkD} width={1.8} />
      <Line pts={[[200, 226], [236, 286]]} color={C.pinkD} width={1.8} />
      <Line pts={[[206, 222], [276, 268]]} color={C.pinkD} width={1.8} />
      {[[126, 258], [132, 254], [138, 249], [144, 245]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.5} fill={C.pinkD} />)}
      <path d="M 100 262 l 8 -12 l 2 8 l 8 -6 l -4 12 l 8 2 l -14 6 Z" fill={C.lemon} stroke={C.lemonD} strokeWidth={1.2} />
      <T x={64} y={244} s={t(b('聚集：局部棘波', 'clustered:\nlocal spike'))} size={9.5} color={C.lemonD} />
      {[[160, 272], [222, 262], [252, 250]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.5} fill={C.pinkD} />)}
      <T x={318} y={262} s={t(b('分散：近似线性', 'scattered:\nnear linear'))} size={9.5} color={C.dim} />
      <T x={110} y={292} s={t(b('基底树突：前馈输入', 'basal dendrites: feedforward input'))} size={9.5} color={C.dim} />
      <Flow id={id} side="bio" fast pts={[[212, 212], [292, 166]]} />
      <T x={338} y={130} s={t(b('两处同时：\n成串放电', 'both at once:\na burst'))} size={9.5} color={C.pinkD} />
      <Line pts={[[300, 150], [300, 170]]} color={C.ink} width={1.6} />
      <Line pts={[[306, 150], [306, 170]]} color={C.ink} width={1.6} />
      <Line pts={[[312, 150], [312, 170]]} color={C.ink} width={1.6} />
      <T x={300} y={208} s={t(b('按分支学习', 'learning per branch'))} size={9.5} anchor="start" color={C.dim} />
      <Num x={92} y={226} n={1} side="bio" />
      <Num x={118} y={238} n={2} side="bio" />
      <Num x={160} y={208} n={3} side="bio" />
      <Num x={248} y={64} n={4} side="bio" />
      <Num x={240} y={150} n={5} side="bio" />
      <Num x={288} y={208} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: 4 inputs on a 4-branch neuron, k of them clustered on branch 1 and the rest one per branch; drag k. */
function BranchPlot({ t }: FigProps) {
  const [k, setK] = useState(4)
  const sums = (kk: number) => { const s = [kk, 0, 0, 0]; for (let i = 0; i < 4 - kk; i++) s[kk === 0 ? i : i + 1] += 1; return s }
  const outs = sums(k).map(sBranch), total = outs.reduce((a, v) => a + v, 0)
  const f: Frame = { x: 46, y: 26, w: 200, h: 124, xr: [0.4, 4.6], yr: [0, 1] }
  const readout = (kk: number) => { const tt = sums(kk).map(sBranch).reduce((a, v) => a + v, 0); return t(b(`聚集 $${kk}$ 个：总驱动 $${tt.toFixed(2)}$`, `$${kk}$ clustered: total drive $${tt.toFixed(2)}$`)) }
  return (
    <>
      <Svg id="m04m1" w={380} h={190} label={t(b('两层神经元：四个输入聚集越多，总驱动越大', 'Two-layer neuron: the more of four inputs cluster, the larger the drive'))}>
        <Axes f={f} xTicks={[[1, '1'], [2, '2'], [3, '3'], [4, '4']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('分支', 'Branch'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('分支输出 s', 'Branch output s'))} anchor="start" />
        {outs.map((v, i) => <Bar key={i} f={f} x={i + 1} v={v} w={0.6} color={col} />)}
        {sums(k).map((u, i) => <Label key={i} x={px(f, i + 1)} y={py(f, outs[i]) - 8} s={t(b(`${u} 个输入`, `${u} in`))} size={9.5} color={col} />)}
        <rect x={276} y={py({ ...f, yr: [0, 1] }, Math.min(1, total))} width={36} height={f.y + f.h - py({ ...f, yr: [0, 1] }, Math.min(1, total))} fill={col} fillOpacity={0.6} />
        <Label x={294} y={f.y + f.h + 12} s={t(b('总驱动', 'total'))} size={9.5} />
        <Label x={322} y={py(f, Math.min(1, total))} s={total.toFixed(2)} anchor="start" size={10} color={col} />
      </Svg>
      <FigSlider label={t(b('聚集在分支 1 的输入', 'Inputs on branch 1'))} value={k} min={0} max={4} step={1} onChange={setK} readout={readout(k)} widest={[readout(4)]} />
    </>
  )
}

/* ── M05 spikes ── */

/** The same weak and strong stimulus in four codes: rate, latency, phase and synchrony. */
function SpikesMech({ t }: FigProps) {
  const x0 = 104, w = 120
  const tick = (x: number, y: number, c = C.ink) => <line x1={x} x2={x} y1={y - 8} y2={y + 8} stroke={c} strokeWidth={1.6} />
  const rows = [b('频率', 'Rate'), b('延迟', 'Latency'), b('相位', 'Phase'), b('同步', 'Synchrony')]
  const y = (i: number) => 58 + i * 52
  return (
    <Svg id="m05a" w={420} h={286} label={t(b('同一刺激的四种编码方式', 'Four ways to code the same stimulus'))}>
      <T x={x0 + w / 2} y={18} s={t(b('弱刺激', 'weak stimulus'))} size={10} weight={600} />
      <T x={x0 + w + 20 + w / 2} y={18} s={t(b('强刺激', 'strong stimulus'))} size={10} weight={600} />
      {rows.map((r, i) => <T key={i} x={60} y={y(i)} s={t(r)} size={10} anchor="end" weight={600} />)}
      {[0, 1].map((k) => <line key={k} x1={x0 + k * (w + 20)} x2={x0 + k * (w + 20) + w} y1={34} y2={34} stroke={C.line} />)}
      {/* rate */}
      {[20, 70, 105].map((x) => <g key={x}>{tick(x0 + x, y(0), col)}</g>)}
      {[8, 22, 36, 50, 64, 78, 92, 106].map((x) => <g key={x}>{tick(x0 + w + 20 + x, y(0), col)}</g>)}
      {/* latency */}
      {tick(x0 + 70, y(1), col)}
      {tick(x0 + w + 20 + 14, y(1), col)}
      <line x1={x0} x2={x0} y1={y(1) - 12} y2={y(1) + 12} stroke={C.lemonD} strokeWidth={1.2} strokeDasharray="3 2" />
      <line x1={x0 + w + 20} x2={x0 + w + 20} y1={y(1) - 12} y2={y(1) + 12} stroke={C.lemonD} strokeWidth={1.2} strokeDasharray="3 2" />
      {/* phase */}
      {[0, 1].map((k) => <Path key={k} pts={Array.from({ length: 61 }, (_, i) => [x0 + k * (w + 20) + (i * w) / 60, y(2) + 9 * Math.cos((2 * Math.PI * i) / 30)] as [number, number])} color={C.dim} width={1} />)}
      {[25, 85].map((x) => <g key={x}>{tick(x0 + x, y(2) - 2, col)}</g>)}
      {[10, 70].map((x) => <g key={x}>{tick(x0 + w + 20 + x, y(2) - 2, col)}</g>)}
      {/* synchrony: three neurons */}
      {[-10, 0, 10].map((dy, j) => <g key={j}>{tick(x0 + 30 + j * 25, y(3) + dy, col)}{tick(x0 + w + 20 + 60 + j, y(3) + dy, col)}</g>)}
      <T x={366} y={y(0)} s={t(b('数脉冲', 'count'))} size={9.5} anchor="start" color={C.dim} />
      <T x={366} y={y(1)} s={t(b('看先后', 'first spike'))} size={9.5} anchor="start" color={C.dim} />
      <T x={366} y={y(2)} s={t(b('对节律', 'vs rhythm'))} size={9.5} anchor="start" color={C.dim} />
      <T x={366} y={y(3)} s={t(b('看对齐', 'alignment'))} size={9.5} anchor="start" color={C.dim} />
      <T x={210} y={274} s={t(b('没有脉冲时不传递，也几乎不耗信号能量', 'no spike, nothing sent and almost no signaling energy'))} size={9.5} color={C.dim} />
      <Num x={86} y={18} n={1} side="bio" />
      <Num x={76} y={y(0)} n={2} side="bio" />
      <Num x={76} y={y(1)} n={3} side="bio" />
      <Num x={76} y={y(2)} n={4} side="bio" />
      <Num x={76} y={y(3)} n={5} side="bio" />
      <Num x={20} y={274} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: Poisson spike counts at 20 Hz in a window of T ms; drag T. */
function PoissonPlot({ t }: FigProps) {
  const [T, setT] = useState(50)
  const r = 20, mu = (r * T) / 1000
  const nmax = 20
  const probs = Array.from({ length: nmax + 1 }, (_, n) => { let lp = -mu + n * Math.log(Math.max(mu, 1e-9)); for (let i = 2; i <= n; i++) lp -= Math.log(i); return Math.exp(lp) })
  const f: Frame = { x: 40, y: 26, w: 250, h: 124, xr: [-0.7, 20.7], yr: [0, 0.4] }
  const readout = (v: number) => { const m = (r * v) / 1000; return t(b(`$T = ${v}$ 毫秒：平均 $${m.toFixed(1)}$ 个，相对误差 $${(1 / Math.sqrt(m)).toFixed(2)}$`, `$T = ${v}$ ms: mean $${m.toFixed(1)}$, relative error $${(1 / Math.sqrt(m)).toFixed(2)}$`)) }
  return (
    <>
      <Svg id="m05m0" w={380} h={190} label={t(b('20 Hz 泊松放电在窗口内的脉冲数分布', 'Spike count distribution of 20 Hz Poisson firing in a window'))}>
        <Axes f={f} xTicks={[[0, '0'], [5, '5'], [10, '10'], [15, '15'], [20, '20']]} yTicks={[[0, '0'], [0.2, '0.2'], [0.4, '0.4']]} xLabel={t(b('窗口内的脉冲数 n', 'Spikes in the window n'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('概率', 'Probability'))} anchor="start" />
        {probs.map((v, n) => <Bar key={n} f={f} x={n} v={Math.min(v, 0.4)} w={0.7} color={col} />)}
        <Label x={302} y={60} s={t(b('r = 20 Hz', 'r = 20 Hz'))} anchor="start" size={9.5} />
        <Label x={302} y={90} s={t(b('窗口越长，\n分布越集中', 'longer windows\nnarrow it'))} anchor="start" size={9.5} color={col} />
      </Svg>
      <FigSlider label="$T$" value={T} min={20} max={1000} step={10} onChange={setT} readout={readout(T)} widest={[readout(20)]} />
    </>
  )
}

/* ── M05 noise ── */

/** Sources of variability and a raster of the same stimulus on repeated trials, with two neurons sharing input. */
function NoiseMech({ t }: FigProps) {
  const u = seeded(11)
  const channel = Array.from({ length: 40 }, (_, i) => [24 + i * 2.6, u() > 0.5 ? 40 : 30] as [number, number])
  const vm = Array.from({ length: 90 }, (_, i) => [140 + i * 2.4, 58 + 7 * normal(u) * 0.6 + 4 * Math.sin(i / 5)] as [number, number])
  const raster = Array.from({ length: 6 }, () => Array.from({ length: 10 }, () => 30 + u() * 300).filter(() => u() > 0.35))
  return (
    <Svg id="m05b" w={380} h={290} label={t(b('神经噪声的来源与试次间变异', 'Sources of neural noise and trial-to-trial variability'))}>
      <T x={70} y={14} s={t(b('离子通道开关', 'channels flipping'))} size={9.5} color={C.dim} />
      <Path pts={channel.flatMap((p, i) => (i ? [[p[0], channel[i - 1][1]], p] : [p]) as [number, number][])} color={col} width={1.3} />
      <T x={250} y={14} s={t(b('背景输入让膜电位起伏', 'background input moves the potential'))} size={9.5} color={C.dim} />
      <Path pts={vm} color={col} width={1.3} />
      <T x={70} y={74} s={t(b('突触电流大小不一', 'synaptic currents vary'))} size={9.5} color={C.dim} />
      {[18, 6, 22, 0, 14].map((h, i) => <rect key={i} x={30 + i * 16} y={110 - h} width={8} height={Math.max(1, h)} fill={col} fillOpacity={0.6} />)}
      <T x={190} y={130} s={t(b('同一刺激，重复 6 次', 'the same stimulus, 6 repeats'))} size={9.5} color={C.dim} />
      {raster.map((row, i) => row.map((x, j) => <line key={`${i}${j}`} x1={x} x2={x} y1={140 + i * 12} y2={148 + i * 12} stroke={C.ink} strokeWidth={1.4} />))}
      <rect x={20} y={226} width={130} height={40} rx={7} fill={C.pink} stroke={C.pinkD} />
      <T x={85} y={246} s={t(b('共享的输入', 'shared input'))} size={10} weight={600} />
      <Flow id="m05b" side="bio" pts={[[150, 236], [210, 222]]} />
      <Flow id="m05b" side="bio" pts={[[150, 256], [210, 268]]} />
      <T x={270} y={222} s={t(b('神经元 A', 'neuron A'))} size={9.5} />
      <T x={270} y={268} s={t(b('神经元 B', 'neuron B'))} size={9.5} />
      <T x={286} y={245} s={t(b('噪声相关：平均不掉', 'correlated: does not average out'))} size={9.5} color={col} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={74} n={2} side="bio" />
      <Num x={136} y={14} n={3} side="bio" />
      <Num x={14} y={150} n={4} side="bio" />
      <Num x={14} y={226} n={5} side="bio" />
      <Num x={366} y={200} n={6} side="bio" />
      <T x={330} y={200} s={t(b('也可表示不确定性', 'may encode uncertainty'))} size={9.5} anchor="end" color={C.dim} />
    </Svg>
  )
}

/** Interactive: variance of the population average against N (log axis) for noise correlation ρ; independent noise
 * dashed. Starts at the worked example's ρ = 0.1. */
function CorrelationPlot({ t }: FigProps) {
  const [rho, setRho] = useState(0.1)
  const f: Frame = { x: 46, y: 26, w: 240, h: 124, xr: [0, 3], yr: [-3, 0] }
  const v = (n: number, r: number) => (1 + (n - 1) * r) / n
  const readout = (r: number) => t(b(`$\\rho = ${r.toFixed(2)}$：$N = 100$ 时方差 $${v(100, r).toFixed(3)}$，下限 $${r.toFixed(2)}$`, `$\\rho = ${r.toFixed(2)}$: variance $${v(100, r).toFixed(3)}$ at $N = 100$, floor $${r.toFixed(2)}$`))
  return (
    <>
      <Svg id="m05m1" w={380} h={190} label={t(b('相关噪声：平均的神经元越多，方差趋于一个下限', 'Correlated noise: averaging more neurons, the variance approaches a floor'))}>
        <Axes f={f} xTicks={[[0, '1'], [1, '10'], [2, '100'], [3, '1000']]} yTicks={[[-3, '0.001'], [-2, '0.01'], [-1, '0.1'], [0, '1']]} xLabel={t(b('平均的神经元数 N（对数）', 'Neurons averaged N (log)'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('平均的方差（对数）', 'Variance of the average (log)'))} anchor="start" />
        <Path pts={trace(f, (x) => Math.log10(1 / 10 ** x))} color={C.dim} width={1.4} dashed />
        {rho > 0 && <Ref f={f} y={Math.log10(rho)} color={col} />}
        <Path pts={trace(f, (x) => Math.log10(v(10 ** x, rho)))} color={col} width={2} />
        <Label x={298} y={60} s={t(b('实线：相关 ρ', 'solid: correlation ρ'))} anchor="start" size={9.5} color={col} />
        <Label x={298} y={100} s={t(b('虚线：独立\n噪声', 'dashed:\nindependent'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$\rho$" value={rho} min={0} max={0.3} step={0.01} onChange={setRho} readout={readout(rho)} widest={[readout(0.25)]} />
    </>
  )
}

export const NEURON_MODEL_FIGS: MechFigs = { mech: NeuronMech, math: { 0: { Fig: FiPlot, cap: b('$t_{\\text{ref}} = 2$ 毫秒时，恒定输入与放电频率的关系。输入低于阈值 $\\theta$ 时不放电，刚过阈值时陡升，之后逐渐饱和。$\\tau_m = 20$ 毫秒、$RI = 1.5\\,\\theta$ 时约 $42$ Hz。虚线是只保留阈值的 ReLU。拖动 $\\tau_m$：膜越慢，同样的输入放电越少。', 'Constant input against firing rate with $t_{\\text{ref}} = 2$ ms. Below threshold $\\theta$ there is no firing, just above it the rate climbs steeply, and then it saturates. At $\\tau_m = 20$ ms and $RI = 1.5\\,\\theta$ the rate is about $42$ Hz. The dashed line is a ReLU that keeps only the threshold. Drag $\\tau_m$: a slower membrane fires less for the same input.') } } }
export const DENDRITE_FIGS: MechFigs = { mech: DendriteMech, math: { 0: { Fig: BranchPlot, cap: b('四个输入落在四个分支的神经元上。柱是各分支的输出，右边是胞体收到的总驱动。四个都聚在分支 1 时总驱动约 $0.89$；拖到 $0$，每个分支一个，总驱动只有约 $0.07$。', 'Four inputs on a neuron with four branches. The bars are the branch outputs and the right bar is the total drive at the soma. With all four on branch 1 the total is about $0.89$. Drag to $0$, one per branch, and it is only about $0.07$.') } } }
export const SPIKE_FIGS: MechFigs = { mech: SpikesMech, math: { 0: { Fig: PoissonPlot, cap: b('$20$ Hz 的泊松放电在 $T$ 毫秒窗口内的脉冲数分布。$T = 50$ 毫秒时平均 $1$ 个，有 $37\\%$ 的概率一个也没有。拖动 $T$：窗口越长，分布越集中，相对误差按 $1/\\sqrt{rT}$ 下降。', 'Spike counts of $20$ Hz Poisson firing in a window of $T$ ms. At $T = 50$ ms the mean is $1$ and there is a $37\\%$ chance of none. Drag $T$: longer windows narrow the distribution, and the relative error falls as $1/\\sqrt{rT}$.') } } }
export const NOISE_FIGS: MechFigs = { mech: NoiseMech, math: { 0: { Fig: CorrelationPlot, cap: b('单个神经元方差为 $1$ 时，平均 $N$ 个神经元后的方差（两轴都是对数）。虚线是独立噪声，按 $1/N$ 一直下降；实线在相关 $\\rho = 0.1$ 时趋于 $0.1$ 的下限。拖动 $\\rho$ 看下限怎样移动。', 'Variance after averaging $N$ neurons, each of variance $1$, with both axes on log scales. The dashed line is independent noise, falling as $1/N$. The solid line, with correlation $\\rho = 0.1$, levels off at $0.1$. Drag $\\rho$ to move the floor.') } } }
