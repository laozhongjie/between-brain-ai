import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Store } from '../grammar'
import { Axes, Dot, FigSlider, Label, Path, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** The genome encodes rules; development lays a coarse map; spontaneous activity refines it before birth; innate circuits result, and experience then learns on that frame. */
function InnateBrainArch({ t }: FigProps) {
  const id = 'f39b'
  return (
    <Svg id={id} w={380} h={224} label={t(b('先天初始结构的结构与信息流：基因组、发育、自发活动、先天的回路与偏好、经验', 'Innate initial structure: genome, development, spontaneous activity, innate circuits and preferences, experience'))}>
      <Store x={14} y={10} w={170} h={56} side="bio" label={t(b('基因组', 'Genome'))} sub={t(b('细胞类型与导向的规则', 'rules for cell types, guidance'))} />
      <Mod x={196} y={18} w={170} h={40} side="bio" label={t(b('发育', 'Development'))} sub={t(b('轴突沿梯度，形成粗略的连接图', 'axons follow gradients: a coarse map'))} size={10.5} />
      <Mod x={14} y={98} w={170} h={40} side="bio" label={t(b('自发活动', 'Spontaneous activity'))} sub={t(b('出生前的视网膜波细化地图', 'prenatal retinal waves refine it'))} size={10.5} />
      <Mod x={196} y={98} w={170} h={40} side="bio" label={t(b('先天的回路与偏好', 'Innate circuits'))} sub={t(b('偏好像脸的图案，见阴影就逃', 'face preference, flight from looming'))} size={10.5} />
      <Mod x={14} y={170} w={352} h={40} side="bio" label={t(b('经验', 'Experience'))} sub={t(b('出生后在先天框架上调整连接', 'after birth, tunes connections on the innate frame'))} size={10.5} />

      <Flow id={id} side="bio" head="read" pts={[[184, 38], [196, 38]]} />
      <Flow id={id} side="bio" pts={[[281, 58], [281, 78], [99, 78], [99, 98]]} />
      <Flow id={id} side="bio" pts={[[184, 118], [196, 118]]} />
      <Flow id={id} side="bio" pts={[[99, 138], [99, 170]]} />
      <Flow id={id} side="bio" pts={[[281, 138], [281, 170]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={196} y={18} n={2} side="bio" />
      <Num x={14} y={98} n={3} side="bio" />
      <Num x={196} y={98} n={4} side="bio" />
      <Num x={14} y={170} n={5} side="bio" />
    </Svg>
  )
}

/** A designer (or a search) picks the architecture; weights are initialized, pretrained into stored parameters and fine-tuned downstream. */
function InductiveBiasArch({ t }: FigProps) {
  const id = 'f39c'
  return (
    <Svg id={id} w={380} h={214} label={t(b('归纳偏置与预训练的结构与信息流：选择架构、初始化、预训练、下游微调、结构搜索', 'Inductive bias and pretraining: architecture choice, initialization, pretraining, fine-tuning, architecture search'))}>
      <Mod x={14} y={14} w={170} h={40} side="comp" label={t(b('选择架构', 'Architecture'))} sub={t(b('卷积、注意力、图网络', 'convolution, attention, graphs'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="comp" label={t(b('结构搜索', 'Architecture search'))} sub={t(b('自动寻找结构，类似进化', 'automatic, evolution-like'))} size={10.5} />
      <Mod x={14} y={80} w={170} h={40} side="comp" label={t(b('初始化', 'Initialization'))} sub={t(b('按随机分布设定权重', 'weights from a random distribution'))} size={10.5} />
      <Gap x={196} y={80} w={170} h={40} label={t(b('由少量规则生成的\n发育程序', 'A developmental program\nfrom a few rules'))} />
      <Store x={14} y={142} w={170} h={56} side="comp" label={t(b('预训练', 'Pretraining'))} sub={t(b('海量数据，存成全部参数', 'huge data, stored as all weights'))} />
      <Mod x={196} y={150} w={170} h={40} side="comp" label={t(b('下游微调', 'Fine-tuning'))} sub={t(b('从起点出发很快学会', 'learns fast from the start point'))} size={10.5} />

      <Flow id={id} side="comp" pts={[[196, 34], [184, 34]]} />
      <Flow id={id} side="comp" pts={[[99, 54], [99, 80]]} />
      <Flow id={id} side="comp" pts={[[99, 120], [99, 142]]} />
      <Flow id={id} side="comp" head="read" pts={[[184, 170], [196, 170]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={80} n={2} side="comp" />
      <Num x={14} y={146} n={3} side="comp" />
      <Num x={196} y={150} n={4} side="comp" />
      <Num x={196} y={14} n={5} side="comp" />
      <Num x={196} y={80} n={6} side="comp" />
    </Svg>
  )
}

/** The genome bottleneck on a log scale: about 6 × 10⁹ bits in the genome against about 4 × 10¹⁵ bits to list every
 * connection. */
function BottleneckPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 112, y: 40, w: 230, h: 96, xr: [8, 16.5], yr: [0, 1] }
  const bar = (y: number, v: number, s: string, sub: string, color: string) => (
    <g>
      <rect x={f.x} y={y} width={px(f, Math.log10(v)) - f.x} height={24} rx={3} fill={color} fillOpacity={0.4} stroke={color} />
      <Label x={f.x - 8} y={y + 12} s={s} anchor="end" size={10} color={C.ink} />
      <Label x={px(f, Math.log10(v)) + 6} y={y + 12} s={sub} anchor="start" size={10} color={color} />
    </g>
  )
  return (
    <Svg id="f39mb0" w={380} h={190} label={t(b('基因组瓶颈：基因组的信息量只够写下全部连接的约百万分之一', 'The genome bottleneck: the genome holds about a millionth of what listing every connection would take'))}>
      {[8, 10, 12, 14, 16].map((v) => (
        <g key={v}>
          <line x1={px(f, v)} x2={px(f, v)} y1={f.y - 4} y2={f.y + f.h} stroke={C.line} strokeDasharray="2 3" />
          <text x={px(f, v)} y={f.y + f.h + 12} fontSize={10} textAnchor="middle" fill={C.dim} fontFamily="var(--mono)">{`10${['⁸', '¹⁰', '¹²', '¹⁴', '¹⁶'][(v - 8) / 2]}`}</text>
        </g>
      ))}
      {bar(f.y + 10, 6e9, t(b('基因组', 'Genome')), t(b('6 × 10⁹，不到 1 GB', '6 × 10⁹, under 1 GB')), col)}
      {bar(f.y + 56, 4e15, t(b('写下全部连接', 'Every connection')), '4 × 10¹⁵', C.lemonD)}
      <Label x={f.x + f.w / 2} y={f.y + f.h + 28} s={t(b('比特（对数刻度）', 'Bits (log scale)'))} />
      <Label x={190} y={20} s={t(b('相差约一百万倍：先天结构只能以规则的形式写下', 'about a millionfold apart: innate structure can only be written as rules'))} size={10} color={C.ink} />
    </Svg>
  )
}

/** Prenatal waves refining a map: inputs A and B (neighbors on the retina) fire together, C does not. With
 * Δw = η(⟨x_i x_j⟩ − x̄²) the A and B connections grow and C's shrinks until it is pruned. Illustrative rates. */
function WavesPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const n = 60, eta = 0.03
  const wA: number[] = [0.5], wB: number[] = [0.5], wC: number[] = [0.5]
  for (let i = 0; i < n; i++) {
    wA.push(Math.min(1, wA[i] + eta * (0.25 - 0.09) * 1.5))
    wB.push(Math.min(1, wB[i] + eta * (0.22 - 0.09) * 1.5))
    wC.push(Math.max(0, wC[i] + eta * (0.02 - 0.09) * 5.5))
  }
  const f: Frame = { x: 44, y: 30, w: 248, h: 124, xr: [0, n], yr: [0, 1] }
  const line = (v: number[]) => v.map((y, i) => [px(f, i), py(f, y)] as [number, number])
  const cut = wC.findIndex((v) => v <= 0)
  return (
    <Svg id="f39mb1" w={380} h={198} label={t(b('出生前的自发活动：一起放电的输入连接增强，不同步的被修剪', 'Spontaneous prenatal activity: inputs that fire together strengthen, the out-of-sync one is pruned'))}>
      <Axes f={f} xTicks={[[0, '0'], [30, '30'], [60, '60']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('视网膜波的次数', 'Retinal waves'))} grid />
      <Label x={f.x - 4} y={f.y - 12} s={t(b('到目标神经元的连接强度', 'Strength onto the target neuron'))} anchor="start" />
      <Path pts={line(wA)} color={col} />
      <Path pts={line(wB)} color={col} opacity={0.6} />
      <Path pts={line(wC)} color={C.dim} />
      {cut > 0 && <Label x={px(f, cut)} y={py(f, 0) - 10} s={t(b('C 被修剪', 'C pruned'))} size={10} />}
      <Label x={f.x + f.w + 4} y={py(f, wA[n]) - 6} s={t(b('A', 'A'))} anchor="start" size={10} color={col} />
      <Label x={f.x + f.w + 4} y={py(f, wB[n]) + 8} s={t(b('B（与 A 相邻）', 'B (next to A)'))} anchor="start" size={10} color={col} />
      <Label x={px(f, 4)} y={py(f, 0.32)} s={t(b('C：离得远，很少同步', 'C: far away, rarely in sync'))} anchor="start" size={10} />
    </Svg>
  )
}

/** Parameters of a fully connected layer against a 3 × 3 convolution, 64 channels in and out, interactive: drag the image
 * size. Full grows with the fourth power of the side; the convolution stays fixed. Starts at the worked example's 32. */
function ConvParamsPlot({ t }: FigProps) {
  const [H, setH] = useState(32)
  const col = SIDE_COLOR.comp
  const full = (h: number) => Math.pow(h * h * 64, 2), conv = 9 * 64 * 64
  const f: Frame = { x: 44, y: 30, w: 270, h: 124, xr: [8, 128], yr: [4, 12] }
  const sci = (v: number) => { const e = Math.floor(Math.log10(v)); return `${(v / Math.pow(10, e)).toFixed(1)}×10${String(e).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('')}` }
  const readout = (h: number) => t(b(`${h}×${h}：全连接 ${sci(full(h))}，卷积 ${sci(conv)}`, `${h}×${h}: full ${sci(full(h))}, conv ${sci(conv)}`))
  return (
    <>
      <Svg id="f39mc0" w={380} h={198} label={t(b('卷积的归纳偏置：权重共享让参数量与图像大小无关', 'The convolution’s inductive bias: weight sharing makes the parameter count independent of image size'))}>
        <Axes f={f} xTicks={[[8, '8'], [32, '32'], [64, '64'], [128, '128']]} yTicks={[[4, '10⁴'], [8, '10⁸'], [12, '10¹²']]} xLabel={t(b('图像边长（像素）', 'Image side (pixels)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('参数量（对数）', 'Parameters (log)'))} anchor="start" />
        <Path pts={trace(f, (h) => Math.log10(full(h)), 8, 128, 120)} color={C.lemonD} />
        <Path pts={trace(f, () => Math.log10(conv), 8, 128, 2)} color={col} />
        <Dot f={f} x={H} y={Math.min(12, Math.log10(full(H)))} color={C.lemonD} r={4} />
        <Dot f={f} x={H} y={Math.log10(conv)} color={col} r={4} />
        <Label x={f.x + f.w + 4} y={py(f, 11.5)} s={t(b('全连接', 'fully\nconnected'))} anchor="start" size={10} color={C.lemonD} />
        <Label x={f.x + f.w + 4} y={py(f, Math.log10(conv))} s={t(b('3 × 3 卷积', '3 × 3 conv'))} anchor="start" size={10} color={col} />
      </Svg>
      <FigSlider label={t(b('图像边长', 'Image side'))} value={H} min={8} max={128} step={8} onChange={setH} readout={readout(H)} widest={[32, 128].map(readout)} />
    </>
  )
}

export const INNATE_FIGS: TopicFigs = {
  arch: { brain: InnateBrainArch, ai: InductiveBiasArch },
  math: {
    bio: {
      0: { Fig: BottleneckPlot, cap: b('横轴为对数。基因组约 $6 \\times 10^{9}$ 比特，不到 1 GB；逐个写下连接约需 $4 \\times 10^{15}$ 比特，约 500 TB。两者相差约一百万倍，所以先天结构不可能逐条写下连接，只能写成细胞类型、导向分子和连接统计这样的规则。', 'On a log axis. The genome holds about $6 \\times 10^{9}$ bits, under 1 GB; listing every connection would take about $4 \\times 10^{15}$ bits, about 500 TB. They are about a millionfold apart, so innate structure cannot list connections one by one and must be written as rules: cell types, guidance molecules and connection statistics.') },
      1: { Fig: WavesPlot, cap: b('示意：目标神经元起初从视网膜上 A、B、C 三处接收同样强的输入。视网膜波中 A 与 B 常一起放电，相关高于平均，连接增强；C 很少同步，连接逐渐减弱直到被修剪。眼睛睁开之前，地图就这样被细化了。', 'Illustration: the target neuron starts with equal inputs from retinal positions A, B and C. In retinal waves A and B often fire together, above-average correlation, so their connections strengthen; C is rarely in sync, so its connection weakens until it is pruned. The map is refined before the eyes open.') },
    },
    comp: {
      0: { Fig: ConvParamsPlot, cap: b('输入输出各 $64$ 个通道，纵轴为对数。拖动滑块改变图像边长：默认 $32 \\times 32$ 时全连接层约需 $4.3 \\times 10^{9}$ 个参数，$3 \\times 3$ 卷积只需 $3.7 \\times 10^{4}$ 个，少了约十万倍。全连接随边长的四次方增长，卷积的参数量与图像大小无关。', 'With $64$ channels in and out, on a log axis. Drag the slider to change the image side: at the default $32 \\times 32$ a fully connected layer needs about $4.3 \\times 10^{9}$ parameters and a $3 \\times 3$ convolution only $3.7 \\times 10^{4}$, about a hundred thousand times fewer. The fully connected count grows with the fourth power of the side; the convolution’s does not depend on image size.') },
    },
  },
}
