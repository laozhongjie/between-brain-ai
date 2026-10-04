import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Line, Svg, T } from '../kit'
import { Flow, Mod, Num, Region } from '../grammar'
import { Axes, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, MechFigs } from '../types'
import { sparseCode } from './sims'

const b = (zh: string, en: string): Bi => ({ zh, en })
const col = SIDE_COLOR.bio

/* ── M06 excitation, inhibition and cell types ── */

function EiMech({ t }: FigProps) {
  const id = 'm06a'
  return (
    <Svg id={id} w={380} h={292} label={t(b('皮层微环路：锥体细胞与三类抑制性中间神经元', 'Cortical microcircuit: pyramidal cells and three classes of inhibitory interneurons'))}>
      <Mod x={14} y={14} w={150} h={40} side="bio" label={t(b('自上而下的信号', 'Top-down signals'))} sub={t(b('运动、注意', 'locomotion, attention'))} />
      <Mod x={226} y={14} w={140} h={40} side="bio" label="VIP" sub={t(b('抑制 SST', 'inhibits SST'))} />
      <Mod x={226} y={92} w={140} h={40} side="bio" label="SST" sub={t(b('抑制树突', 'inhibits dendrites'))} />
      <Mod x={226} y={170} w={140} h={40} side="bio" label="PV" sub={t(b('快速抑制胞体', 'fast, at the soma'))} />
      <Region x={14} y={84} w={186} h={150} side="bio" label={t(b('锥体细胞（兴奋性）', 'Pyramidal cells (excitatory)'))} />
      <Mod x={28} y={108} w={70} h={40} side="bio" label={t(b('树突', 'Dendrite'))} size={10} />
      <Mod x={28} y={176} w={70} h={40} side="bio" label={t(b('胞体', 'Soma'))} size={10} />
      <Mod x={116} y={176} w={70} h={40} side="bio" label={t(b('邻居', 'Neighbor'))} size={10} />
      <Line pts={[[63, 148], [63, 176]]} color={C.pinkD} width={1.6} />
      <Flow id={id} side="bio" pts={[[98, 196], [116, 196]]} />
      <Flow id={id} side="bio" pts={[[116, 206], [98, 206]]} />
      <Flow id={id} side="bio" pts={[[164, 34], [226, 34]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[296, 54], [296, 92]]} label={t(b('抑制', 'inhibits'))} lx={20} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[226, 112], [98, 128]]} label={t(b('抑制', 'inhibits'))} ly={-4} />
      <Flow id={id} side="bio" kind="fb" pts={[[226, 190], [186, 190]]} />
      <Flow id={id} side="bio" pts={[[186, 210], [226, 210]]} label={t(b('兴奋', 'excites'))} ly={12} />
      <Flow id={id} side="bio" pts={[[63, 266], [63, 216]]} label={t(b('前馈输入', 'feedforward input'))} lx={44} ly={10} />
      <T x={232} y={240} s={t(b('兴奋与抑制平衡', 'excitation and inhibition balance'))} size={9.5} anchor="start" color={C.dim} />
      <T x={232} y={262} s={t(b('增加 PV 的输入，PV 反而少放电', 'more input to PV lowers PV firing'))} size={9.5} anchor="start" color={col} />
      <Num x={14} y={86} n={1} side="bio" />
      <Num x={366} y={170} n={2} side="bio" />
      <Num x={366} y={92} n={3} side="bio" />
      <Num x={366} y={14} n={4} side="bio" />
      <Num x={218} y={240} n={5} side="bio" />
      <Num x={218} y={262} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: steady rates of the E and I populations as the input to I rises, for recurrent excitation W_EE;
 * W_EI = W_IE = 2, W_II = 1, I_E = 2. Above W_EE = 1 the inhibitory rate falls: the paradoxical effect. */
function IsnPlot({ t }: FigProps) {
  const [wee, setWee] = useState(2)
  const det = (w: number) => (1 - w) * 2 + 4
  const rE = (ii: number, w: number) => Math.max(0, (2 * 2 - 2 * ii) / det(w))
  const rI = (ii: number, w: number) => Math.max(0, (2 * 2 + (1 - w) * ii) / det(w))
  const f: Frame = { x: 44, y: 26, w: 240, h: 124, xr: [0, 2], yr: [0, 3] }
  const readout = (w: number) => { const s = (1 - w) / det(w); return t(b(`$W_{EE} = ${w.toFixed(1)}$：$\\partial r_I / \\partial I_I = ${s.toFixed(2)}$`, `$W_{EE} = ${w.toFixed(1)}$: $\\partial r_I / \\partial I_I = ${s.toFixed(2)}$`)) }
  return (
    <>
      <Svg id="m06m0" w={380} h={190} label={t(b('抑制稳定网络：增加对抑制性细胞的输入，两个群体的放电都下降', 'Inhibition-stabilized network: more input to inhibitory cells lowers both rates'))}>
        <Axes f={f} xTicks={[[0, '0'], [1, '1'], [2, '2']]} yTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3']]} xLabel={t(b('对抑制性细胞的输入 I_I', 'Input to inhibitory cells I_I'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('稳态放电率', 'Steady rate'))} anchor="start" />
        <Path pts={trace(f, (x) => rE(x, wee))} color={col} width={2} />
        <Path pts={trace(f, (x) => rI(x, wee))} color={C.skyD} width={2} />
        <Label x={296} y={64} s={t(b('粉色：兴奋性 r_E', 'pink: excitatory r_E'))} anchor="start" size={9.5} color={col} />
        <Label x={296} y={88} s={t(b('蓝色：抑制性 r_I', 'blue: inhibitory r_I'))} anchor="start" size={9.5} color={C.skyD} />
        <Label x={296} y={124} s={wee > 1 ? t(b('W_EE > 1：r_I\n随输入下降', 'W_EE > 1: r_I\nfalls with input')) : t(b('W_EE < 1：r_I\n随输入上升', 'W_EE < 1: r_I\nrises with input'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$W_{EE}$" value={wee} min={0.5} max={2.5} step={0.1} onChange={setWee} readout={readout(wee)} widest={[readout(2.5)]} />
    </>
  )
}

/* ── M06 divisive normalization ── */

function NormMech({ t }: FigProps) {
  const id = 'm06b'
  const xs = [40, 92, 144, 196, 248, 300]
  return (
    <Svg id={id} w={380} h={286} label={t(b('除法归一化：自身驱动除以周围的活动池', 'Divisive normalization: own drive divided by the pool of surrounding activity'))}>
      <T x={190} y={16} s={t(b('同一块视野，偏好方向各不相同的神经元', 'neurons with different preferred orientations, same patch of view'))} size={9.5} color={C.dim} />
      {xs.map((x, i) => (
        <g key={i}>
          <rect x={x} y={32} width={40} height={40} rx={7} fill={C.pink} stroke={C.pinkD} strokeWidth={i === 2 ? 2 : 1.1} />
          <line x1={x + 20 - 12 * Math.cos((i * Math.PI) / 6)} y1={52 + 12 * Math.sin((i * Math.PI) / 6)} x2={x + 20 + 12 * Math.cos((i * Math.PI) / 6)} y2={52 - 12 * Math.sin((i * Math.PI) / 6)} stroke={C.pinkD} strokeWidth={2} />
        </g>
      ))}
      <T x={164} y={84} s={t(b('神经元 i 的驱动 x_i', 'drive x_i of neuron i'))} size={9.5} color={col} />
      <Mod x={70} y={116} w={240} h={40} side="bio" label={t(b('归一化池', 'Normalization pool'))} sub={t(b('周围驱动之和，经抑制性细胞传回', 'summed drive, returned by inhibitory cells'))} />
      {xs.map((x, i) => <Line key={i} pts={[[x + 20, 72], [x + 20 > 310 ? 300 : x + 20 < 70 ? 80 : x + 20, 116]]} color={C.dim} width={1} />)}
      <Mod x={130} y={194} w={120} h={46} side="bio" label={t(b('响应 r_i', 'Response r_i'))} sub={t(b('驱动 ÷（σ + 池）', 'drive ÷ (σ + pool)'))} />
      <Flow id={id} side="bio" pts={[[164, 72], [164, 194]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[250, 156], [250, 210]]} label={t(b('除以', 'divides'))} lx={20} ly={0} />
      <T x={66} y={210} s={t(b('对比度高时\n趋于饱和', 'saturates at\nhigh contrast'))} size={9.5} color={C.dim} />
      <T x={318} y={210} s={t(b('不偏好的刺激\n也压低响应', 'non-preferred\nstimuli suppress'))} size={9.5} color={C.dim} />
      <T x={190} y={270} s={t(b('同样的形式见于视觉、听觉、嗅觉、多感官整合与注意', 'the same form in vision, hearing, smell, multisensory integration and attention'))} size={9.5} color={C.dim} />
      <Num x={144} y={34} n={1} side="bio" />
      <Num x={70} y={116} n={2} side="bio" />
      <Num x={130} y={194} n={3} side="bio" />
      <Num x={30} y={200} n={4} side="bio" />
      <Num x={358} y={190} n={5} side="bio" />
      <Num x={16} y={270} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: the contrast response r = c²/(1 + c² + m²), with the unmasked curve dashed; drag the mask contrast m. */
function NormPlot({ t }: FigProps) {
  const [m, setM] = useState(2)
  const r = (c: number, mm: number) => (c * c) / (1 + c * c + mm * mm)
  const f: Frame = { x: 44, y: 26, w: 240, h: 124, xr: [0, 5], yr: [0, 1] }
  const readout = (v: number) => t(b(`遮挡 $m = ${v.toFixed(1)}$：$c = 2$ 时 $r = ${r(2, v).toFixed(2)}$`, `mask $m = ${v.toFixed(1)}$: $r = ${r(2, v).toFixed(2)}$ at $c = 2$`))
  return (
    <>
      <Svg id="m06m1" w={380} h={190} label={t(b('除法归一化：遮挡刺激让对比度响应曲线右移', 'Divisive normalization: a mask shifts the contrast response curve right'))}>
        <Axes f={f} xTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('偏好刺激的对比度 c', 'Contrast of the preferred stimulus c'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('响应 r', 'Response r'))} anchor="start" />
        <Path pts={trace(f, (c) => r(c, 0))} color={C.dim} width={1.4} dashed />
        <Path pts={trace(f, (c) => r(c, m))} color={col} width={2} />
        <circle cx={px(f, 2)} cy={py(f, r(2, m))} r={3.5} fill={col} />
        <circle cx={px(f, 2)} cy={py(f, r(2, 0))} r={3} fill={C.dim} />
        <Label x={296} y={56} s={t(b('虚线：没有遮挡', 'dashed: no mask'))} anchor="start" size={9.5} />
        <Label x={296} y={84} s={t(b('实线：加上遮挡', 'solid: with mask'))} anchor="start" size={9.5} color={col} />
      </Svg>
      <FigSlider label="$m$" value={m} min={0} max={3} step={0.1} onChange={setM} readout={readout(m)} widest={[readout(2.5)]} />
    </>
  )
}

/* ── M07 feedback and predictive coding ── */

function PredictiveMech({ t }: FigProps) {
  const id = 'm07b'
  return (
    <Svg id={id} w={380} h={300} label={t(b('预测编码：反馈携带预测，误差神经元向上报告差异', 'Predictive coding: feedback carries predictions, error neurons report differences upward'))}>
      <Region x={6} y={8} w={368} h={70} side="bio" label={t(b('高一级区域', 'Higher area'))} />
      <Mod x={20} y={28} w={150} h={40} side="bio" label={t(b('表征', 'Representation'))} sub={t(b('关于场景的预期', 'expectation of the scene'))} size={10.5} />
      <Mod x={210} y={28} w={150} h={40} side="bio" label={t(b('深层神经元', 'Deep-layer neurons'))} sub={t(b('发出预测', 'send predictions'))} size={10.5} />
      <Flow id={id} side="bio" pts={[[170, 48], [210, 48]]} />
      <Region x={6} y={100} w={368} h={128} side="bio" label={t(b('低一级区域', 'Lower area'))} />
      <Mod x={20} y={180} w={110} h={38} side="bio" label={t(b('第 4 层', 'Layer 4'))} sub={t(b('感觉输入进入', 'sensory input'))} size={10.5} />
      <Mod x={150} y={122} w={100} h={40} side="bio" label={t(b('正误差', 'Positive error'))} sub={t(b('多于预期', 'more than expected'))} size={10} />
      <Mod x={262} y={122} w={100} h={40} side="bio" label={t(b('负误差', 'Negative error'))} sub={t(b('少于预期', 'less than expected'))} size={10} />
      <T x={256} y={176} s={t(b('第 2/3 层：误差神经元', 'layers 2/3: error neurons'))} size={9.5} color={C.dim} />
      <Flow id={id} side="bio" pts={[[75, 180], [75, 142], [150, 142]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[312, 68], [312, 122]]} label={t(b('预测（反馈）', 'prediction (feedback)'))} lx={-44} ly={0} />
      <Flow id={id} side="bio" fast pts={[[200, 122], [200, 96], [95, 96], [95, 68]]} label={t(b('误差（前馈）', 'error (feedforward)'))} at={1} ly={-6} />
      <Mod x={150} y={244} w={212} h={42} side="bio" label={t(b('运动区域', 'Motor areas'))} sub={t(b('奔跑速度预测视野流动', 'running speed predicts visual flow'))} size={10.5} />
      <Flow id={id} side="bio" kind="fb" pts={[[300, 244], [300, 162]]} />
      <T x={70} y={256} s={t(b('前馈与反馈\n来回几轮', 'several rounds of\nfeedforward and\nfeedback'))} size={9.5} color={C.dim} />
      <Num x={20} y={180} n={1} side="bio" />
      <Num x={360} y={28} n={2} side="bio" />
      <Num x={150} y={122} n={3} side="bio" />
      <Num x={20} y={28} n={4} side="bio" />
      <Num x={150} y={244} n={5} side="bio" />
      <Num x={20} y={244} n={6} side="bio" />
    </Svg>
  )
}

/** Interactive: running v(t), visual flow s(t) with a halt and a playback, and the two error populations for the
 * learned coupling g. */
function MismatchPlot({ t }: FigProps) {
  const [g, setG] = useState(1)
  const v = (x: number) => (x < 6 ? 1 : 0)
  const s = (x: number) => (x < 4 || (x >= 5 && x < 6) || (x >= 7.5 && x < 8.5) ? 1 : 0)
  const ep = (x: number) => Math.max(0, s(x) - g * v(x)), em = (x: number) => Math.max(0, g * v(x) - s(x))
  const top: Frame = { x: 40, y: 20, w: 250, h: 50, xr: [0, 10], yr: [-0.1, 1.2] }
  const bot: Frame = { x: 40, y: 92, w: 250, h: 70, xr: [0, 10], yr: [-0.1, 1.6] }
  const step = (fr: Frame, fn: (x: number) => number) => trace(fr, fn, 0, 10, 1000)
  const readout = (gg: number) => t(b(`$g = ${gg.toFixed(1)}$：正常奔跑时 $\\varepsilon^{+} = ${Math.max(0, 1 - gg).toFixed(1)}$、$\\varepsilon^{-} = ${Math.max(0, gg - 1).toFixed(1)}$`, `$g = ${gg.toFixed(1)}$: during normal running $\\varepsilon^{+} = ${Math.max(0, 1 - gg).toFixed(1)}$, $\\varepsilon^{-} = ${Math.max(0, gg - 1).toFixed(1)}$`))
  return (
    <>
      <Svg id="m07m1" w={380} h={196} label={t(b('失配神经元：预期的视野流动消失时放电', 'Mismatch neurons fire when expected visual flow disappears'))}>
        <rect x={top.x} y={top.y} width={top.w} height={top.h} fill="none" stroke={C.line} />
        <Path pts={step(top, v)} color={C.dim} width={1.6} dashed />
        <Path pts={step(top, s)} color={C.ink} width={1.6} />
        <Label x={300} y={32} s={t(b('虚线：奔跑 v', 'dashed: running v'))} anchor="start" size={9.5} />
        <Label x={300} y={52} s={t(b('实线：流动 s', 'solid: flow s'))} anchor="start" size={9.5} />
        <rect x={bot.x} y={bot.y} width={bot.w} height={bot.h} fill="none" stroke={C.line} />
        <Path pts={step(bot, em)} color={col} width={2} />
        <Path pts={step(bot, ep)} color={C.skyD} width={2} />
        <Label x={300} y={110} s={t(b('粉色：负误差 ε⁻', 'pink: negative ε⁻'))} anchor="start" size={9.5} color={col} />
        <Label x={300} y={130} s={t(b('蓝色：正误差 ε⁺', 'blue: positive ε⁺'))} anchor="start" size={9.5} color={C.skyD} />
        <Label x={px(bot, 4.5)} y={bot.y + bot.h + 12} s={t(b('流动停止', 'flow halts'))} size={9.5} />
        <Label x={px(bot, 8)} y={bot.y + bot.h + 12} s={t(b('静止时回放', 'playback at rest'))} size={9.5} />
        <Label x={bot.x + bot.w / 2} y={bot.y + bot.h + 28} s={t(b('时间（秒）', 'Time (s)'))} size={10} />
      </Svg>
      <FigSlider label="$g$" value={g} min={0} max={1.5} step={0.1} onChange={setG} readout={readout(g)} widest={[readout(0.5), readout(1.5)]} />
    </>
  )
}

/* ── M08 expansion coding ── */

function ExpansionMech({ t }: FigProps) {
  const id = 'm08a'
  const ins = [60, 110, 160, 210, 260].map((x) => [x + 20, 40] as [number, number])
  const cells = Array.from({ length: 14 }, (_, i) => [34 + i * 24, 132] as [number, number])
  const active = [3, 8, 12]
  const wires: [number, number][] = [[0, 1], [0, 3], [1, 3], [1, 8], [2, 5], [2, 8], [3, 10], [3, 12], [4, 12], [4, 8], [0, 0], [2, 6]]
  return (
    <Svg id={id} w={380} h={290} label={t(b('扩展编码：少量输入扩展到大量稀疏的细胞，再线性读出', 'Expansion coding: a few inputs expanded to many sparse cells, then read out linearly'))}>
      <T x={190} y={14} s={t(b('少量输入通道（苔藓纤维、投射神经元）', 'a few input channels (mossy fibers, projection neurons)'))} size={9.5} color={C.dim} />
      {wires.map(([a, c], i) => <Line key={i} pts={[ins[a], cells[c]]} color={C.line} width={1} />)}
      {ins.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={11} fill={C.pink} stroke={C.pinkD} strokeWidth={1.3} />)}
      {cells.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={8} fill={active.includes(i) ? C.pinkD : C.pink} stroke={C.pinkD} strokeWidth={1.1} />)}
      <T x={190} y={156} s={t(b('大量细胞，每个只接收约 4 到 7 个输入，只有少数活跃', 'many cells, each with about 4 to 7 inputs, only a few active'))} size={9.5} color={C.dim} />
      <Mod x={14} y={178} w={130} h={38} side="bio" label={t(b('抑制性细胞', 'Inhibitory cells'))} sub={t(b('提高阈值', 'raise threshold'))} size={10} />
      <Flow id={id} side="bio" kind="fb" pts={[[60, 178], [60, 142]]} />
      {active.map((i) => <Line key={i} pts={[cells[i], [250, 236]]} color={C.pinkD} width={1.4} />)}
      <Mod x={196} y={236} w={110} h={40} side="bio" label={t(b('读出细胞', 'Readout cell'))} sub={t(b('加权求和，学习在这里', 'weighted sum, learns here'))} size={10} />
      <T x={86} y={252} s={t(b('齿状回：类似的\n扩展与稀疏', 'dentate gyrus:\nsimilar expansion'))} size={9.5} color={C.dim} />
      <Num x={50} y={40} n={1} side="bio" />
      <Num x={20} y={120} n={2} side="bio" />
      <Num x={366} y={120} n={3} side="bio" />
      <Num x={14} y={178} n={4} side="bio" />
      <Num x={306} y={236} n={5} side="bio" />
      <Num x={34} y={244} n={6} side="bio" />
    </Svg>
  )
}

const binom = (n: number, k: number) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i; return r }
const coverF = (P: number, N: number) => { if (P <= N) return 1; let s = 0; for (let k = 0; k < N; k++) s += binom(P - 1, k); return (2 * s) / 2 ** P }

/** Interactive: the chance that a random split of P patterns is linearly separable in N dimensions; drag N. */
function CoverPlot({ t }: FigProps) {
  const [N, setN] = useState(4)
  const f: Frame = { x: 44, y: 26, w: 250, h: 124, xr: [1, 40], yr: [0, 1.05] }
  const readout = (n: number) => t(b(`$N = ${n}$：$6$ 个模式时 $F = ${coverF(6, n).toFixed(2)}$，$F = 0.5$ 在 $P = ${2 * n}$`, `$N = ${n}$: $F = ${coverF(6, n).toFixed(2)}$ for $6$ patterns, $F = 0.5$ at $P = ${2 * n}$`))
  const pts: [number, number][] = Array.from({ length: 40 }, (_, i) => [px(f, i + 1), py(f, coverF(i + 1, N))])
  return (
    <>
      <Svg id="m08m0" w={380} h={190} label={t(b('Cover 定理：维度越高，随机分组越可能线性可分', 'Cover’s theorem: higher dimension, likelier linear separability'))}>
        <Axes f={f} xTicks={[[1, '1'], [10, '10'], [20, '20'], [30, '30'], [40, '40']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('模式数 P', 'Patterns P'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('可分的概率 F', 'Chance separable F'))} anchor="start" />
        {2 * N <= 40 && <Ref f={f} x={2 * N} color={C.dim} />}
        <Path pts={pts} color={col} width={2} />
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.8} fill={col} />)}
        <circle cx={px(f, 6)} cy={py(f, coverF(6, N))} r={4} fill={C.lemonD} />
        <Label x={304} y={60} s={t(b('黄点：6 个模式', 'yellow: 6 patterns'))} anchor="start" size={9.5} color={C.lemonD} />
        <Label x={304} y={90} s={t(b('竖线：P = 2N', 'line: P = 2N'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$N$" value={N} min={2} max={20} step={1} onChange={setN} readout={readout(N)} widest={[readout(10)]} />
    </>
  )
}

/* ── M08 sparse coding ── */

function SparseMech({ t }: FigProps) {
  const id = 'm08b'
  const gabor = (cx: number, cy: number, ang: number, on: boolean, key: number) => {
    const dx = Math.cos(ang), dy = Math.sin(ang)
    return (
      <g key={key}>
        <rect x={cx - 15} y={cy - 15} width={30} height={30} rx={5} fill={on ? C.pink : C.white} stroke={on ? C.pinkD : C.line} strokeWidth={on ? 1.8 : 1} />
        {[-6, 0, 6].map((o, j) => <line key={j} x1={cx - 10 * dx - o * dy} y1={cy - 10 * dy + o * dx} x2={cx + 10 * dx - o * dy} y2={cy + 10 * dy + o * dx} stroke={on ? C.pinkD : C.dim} strokeWidth={j === 1 ? 2 : 1} strokeOpacity={j === 1 ? 1 : 0.5} />)}
      </g>
    )
  }
  const angs = [0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8]
  return (
    <Svg id={id} w={380} h={286} label={t(b('稀疏编码：从一大组特征中选出少数几个重建输入', 'Sparse coding: a few features out of a large set reconstruct the input'))}>
      <rect x={20} y={30} width={60} height={60} rx={6} fill={C.white} stroke={C.line} />
      {[[-8, 0], [6, 0]].map(([o], j) => <line key={j} x1={30} y1={60 + o + (j ? 10 : -6)} x2={70} y2={60 + o - (j ? 8 : -14)} stroke={C.ink} strokeWidth={2.4} />)}
      <T x={50} y={104} s={t(b('一小块图像', 'image patch'))} size={9.5} color={C.dim} />
      <Flow id={id} side="bio" pts={[[80, 60], [108, 60]]} />
      {angs.map((a, i) => gabor(130 + (i % 4) * 40, 40 + Math.floor(i / 4) * 40, a, i === 2 || i === 5, i))}
      <T x={190} y={104} s={t(b('过完备的特征（初级视皮层神经元）', 'overcomplete features (V1 neurons)'))} size={9.5} color={C.dim} />
      <T x={330} y={44} s={t(b('8 个特征\n只有 2 个活跃', '8 features,\nonly 2 active'))} size={9.5} color={col} />
      <Mod x={110} y={124} w={160} h={40} side="bio" label={t(b('侧抑制与竞争', 'Lateral inhibition, competition'))} sub={t(b('最匹配的先活跃，压低其他', 'best matches win, suppress others'))} size={10} />
      <Flow id={id} side="bio" pts={[[190, 164], [190, 192]]} />
      <Mod x={110} y={192} w={160} h={40} side="bio" label={t(b('少数神经元放电', 'A few neurons fire'))} sub={t(b('合起来重建输入', 'together they rebuild the input'))} size={10} />
      <T x={330} y={212} s={t(b('脉冲少：省能\n含义单一：易读出', 'few spikes: less energy\nnarrow meaning: easy readout'))} size={9.5} color={C.dim} />
      <Flow id={id} side="bio" kind="fb" pts={[[110, 212], [10, 212], [10, 60], [20, 60]]} label={t(b('特征随经验调整', 'features adapt with experience'))} at={0} ly={12} />
      <Num x={20} y={30} n={1} side="bio" />
      <Num x={110} y={24} n={2} side="bio" />
      <Num x={110} y={124} n={3} side="bio" />
      <Num x={292} y={192} n={4} side="bio" />
      <Num x={30} y={232} n={5} side="bio" />
    </Svg>
  )
}

const sparseCache = new Map<number, ReturnType<typeof sparseCode>>()
const sparseAt = (l: number) => { const k = Math.round(l * 100) / 100; let r = sparseCache.get(k); if (!r) { r = sparseCode(k); sparseCache.set(k, r) } return r }

/** Interactive: the 8 ISTA coefficients of the worked example for the sparsity weight λ; atoms 3 and 6 make the input. */
function SparsePlot({ t }: FigProps) {
  const [lam, setLam] = useState(0.05)
  const r = sparseAt(lam)
  const f: Frame = { x: 44, y: 26, w: 240, h: 124, xr: [0.4, 8.6], yr: [-0.4, 1.1] }
  const readout = (l: number) => { const q = sparseAt(l); return t(b(`$\\lambda = ${l.toFixed(2)}$：$${q.active}$ 个活跃，误差 $${(q.err * 100).toFixed(0)}\\%$`, `$\\lambda = ${l.toFixed(2)}$: $${q.active}$ active, error $${(q.err * 100).toFixed(0)}\\%$`)) }
  return (
    <>
      <Svg id="m08m1" w={380} h={190} label={t(b('稀疏编码：λ 越大，活跃的特征越少', 'Sparse coding: the larger λ, the fewer active features'))}>
        <Axes f={f} xTicks={Array.from({ length: 8 }, (_, i) => [i + 1, String(i + 1)] as [number, string])} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('特征', 'Feature'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('系数 a', 'Coefficient a'))} anchor="start" />
        {r.a.map((v, i) => {
          const y0 = py(f, 0), y1 = py(f, v)
          return <rect key={i} x={px(f, i + 1) - 10} y={Math.min(y0, y1)} width={20} height={Math.max(1, Math.abs(y1 - y0))} fill={i === 2 || i === 5 ? col : C.dim} fillOpacity={0.6} />
        })}
        <Label x={296} y={56} s={t(b('粉色：构成输入\n的第 3、6 个', 'pink: features 3\nand 6 build the input'))} anchor="start" size={9.5} color={col} />
        <Label x={296} y={104} s={t(b('灰色：其余特征', 'gray: the others'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$\lambda$" value={lam} min={0} max={0.5} step={0.01} onChange={setLam} readout={readout(lam)} widest={[readout(0.02)]} />
    </>
  )
}

export const EI_FIGS: MechFigs = { mech: EiMech, math: { 0: { Fig: IsnPlot, cap: b('例中的参数（$W_{EI} = W_{IE} = 2$、$W_{II} = 1$、$I_E = 2$）下，两个群体的稳态放电随 $I_I$ 的变化。$W_{EE} = 2$ 时，$I_I$ 从 $0$ 加到 $1$，$r_I$ 从 $2$ 降到 $1.5$，$r_E$ 从 $2$ 降到 $1$。拖动 $W_{EE}$ 到 $1$ 以下，$r_I$ 改为随输入上升。', 'With the example’s parameters ($W_{EI} = W_{IE} = 2$, $W_{II} = 1$, $I_E = 2$), the steady rates of both populations as $I_I$ changes. At $W_{EE} = 2$, raising $I_I$ from $0$ to $1$ lowers $r_I$ from $2$ to $1.5$ and $r_E$ from $2$ to $1$. Drag $W_{EE}$ below $1$ and $r_I$ rises with input instead.') } } }
export const NORM_FIGS: MechFigs = { mech: NormMech, math: { 0: { Fig: NormPlot, cap: b('$\\sigma = 1$、$n = 2$ 时的对比度响应。虚线没有遮挡，实线叠加对比度为 $m$ 的遮挡刺激。$m = 2$ 时，$c = 2$ 处的响应从 $0.8$ 降到约 $0.44$，整条曲线右移。拖动 $m$ 改变遮挡的强度。', 'Contrast response with $\\sigma = 1$ and $n = 2$. The dashed line has no mask, and the solid line adds a mask of contrast $m$. At $m = 2$ the response at $c = 2$ drops from $0.8$ to about $0.44$ and the whole curve shifts right. Drag $m$ to change the mask strength.') } } }
export const PREDICTIVE_FIGS: MechFigs = { mech: PredictiveMech, math: { 0: { Fig: MismatchPlot, cap: b('上：奔跑速度（虚线）与视野流动（实线），第 $4$ 秒流动停止一秒，第 $7.5$ 秒小鼠静止时屏幕回放流动。下：两群误差神经元。$g = 1$ 时只在意外处有误差：停止时负误差，回放时正误差。拖动 $g$：耦合学得不准时，正常奔跑也留下持续的误差。', 'Top: running speed (dashed) and visual flow (solid). At $4$ s the flow halts for a second, and at $7.5$ s the screen plays flow while the mouse stands still. Bottom: the two error populations. At $g = 1$ errors appear only at surprises, negative at the halt and positive at playback. Drag $g$: with a poorly learned coupling, normal running leaves a lasting error.') } } }
export const EXPANSION_FIGS: MechFigs = { mech: ExpansionMech, math: { 0: { Fig: CoverPlot, cap: b('在 $N$ 维中，随机把 $P$ 个模式分成两类，能被一个超平面实现的概率。$N = 4$ 时，$6$ 个模式（黄点）的概率约 $0.81$，$P = 8$ 时降到 $0.5$。拖动 $N$：维度增加，曲线整体右移，同样的模式变得总能分开。', 'The chance that a random split of $P$ patterns in $N$ dimensions can be made by one hyperplane. At $N = 4$ the chance for $6$ patterns (yellow) is about $0.81$, falling to $0.5$ at $P = 8$. Drag $N$: more dimensions shift the curve right, and the same patterns become always separable.') } } }
export const SPARSE_FIGS: MechFigs = { mech: SparseMech, math: { 0: { Fig: SparsePlot, cap: b('例中 $8$ 个特征的系数（ISTA 运行 $400$ 步）。$\\lambda = 0.05$ 时只有构成输入的第 $3$、第 $6$ 个特征活跃，重建误差约 $6\\%$。拖到 $0$，所有系数都不为零；拖到 $0.5$，仍是这两个特征，但系数被压小，误差变大。', 'The coefficients of the example’s $8$ features after $400$ ISTA steps. At $\\lambda = 0.05$ only features $3$ and $6$, which build the input, are active, and the reconstruction error is about $6\\%$. Drag to $0$ and every coefficient is nonzero. Drag to $0.5$ and the same two remain, but smaller, with a larger error.') } } }
