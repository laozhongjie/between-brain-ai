import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** A genetic timetable opens a critical period in which inputs compete, then brakes close it; body growth and social interaction bring new input. */
function CriticalPeriodBrainArch({ t }: FigProps) {
  const id = 'f40b'
  return (
    <Svg id={id} w={380} h={258} label={t(b('关键期与婴儿发育的结构与信息流：基因设定的时间表、关键期开启、经验竞争、关键期关闭、身体发育、社会互动', 'Critical periods and infant development: genetic timetable, opening, competition, closing, bodily growth, social interaction'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('基因设定的时间表', 'Genetic timetable'))} sub={t(b('初级感觉区最早，前额叶最晚', 'primary sensory areas first, prefrontal last'))} size={10.5} />
      <Region x={6} y={70} w={368} h={112} side="bio" label={t(b('关键期', 'Critical period'))} />
      <Mod x={18} y={96} w={104} h={40} side="bio" label={t(b('开启', 'Opens'))} sub={t(b('抑制性神经元成熟', 'inhibition matures'))} size={10.5} />
      <Mod x={136} y={96} w={108} h={40} side="bio" label={t(b('竞争', 'Competition'))} sub={t(b('活跃的输入保留', 'active inputs stay'))} size={10.5} />
      <Mod x={258} y={96} w={104} h={40} side="bio" label={t(b('关闭', 'Closes'))} sub={t(b('分子刹车稳定连接', 'brakes stabilize'))} size={10.5} />
      <T x={190} y={160} s={t(b('两只眼睛或不同语音的输入相互竞争', 'inputs from the two eyes, or from different speech sounds, compete'))} size={9} color={C.dim} />
      <Mod x={14} y={204} w={170} h={40} side="bio" label={t(b('身体发育', 'Bodily growth'))} sub={t(b('会坐、爬、走，带来新输入', 'sitting, crawling, walking'))} size={10.5} />
      <Mod x={196} y={204} w={170} h={40} side="bio" label={t(b('社会互动', 'Social interaction'))} sub={t(b('照料者的语言与共同注意', 'caregiver speech, joint attention'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[70, 50], [70, 96]]} />
      <Flow id={id} side="bio" pts={[[122, 116], [136, 116]]} />
      <Flow id={id} side="bio" pts={[[244, 116], [258, 116]]} />
      <Flow id={id} side="bio" pts={[[99, 204], [99, 182]]} label={t(b('新的输入', 'new input'))} lx={30} ly={0} />
      <Flow id={id} side="bio" pts={[[281, 204], [281, 182]]} label={t(b('引导注意', 'guides attention'))} lx={34} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={18} y={96} n={2} side="bio" />
      <Num x={136} y={96} n={3} side="bio" />
      <Num x={258} y={96} n={4} side="bio" />
      <Num x={14} y={204} n={5} side="bio" />
      <Num x={196} y={204} n={6} side="bio" />
    </Svg>
  )
}

/** Data are ordered by difficulty and pass three training stages; the learning-rate schedule lowers plasticity along the way. */
function StagedTrainingArch({ t }: FigProps) {
  const id = 'f40c'
  return (
    <Svg id={id} w={380} h={222} label={t(b('课程学习与分阶段训练的结构与信息流：数据排序、预训练、指令微调、人类反馈强化学习、学习率调度', 'Curriculum and staged training: data ordering, pretraining, instruction tuning, RLHF, learning-rate schedule'))}>
      <Mod x={14} y={14} w={170} h={40} side="comp" label={t(b('数据排序', 'Data ordering'))} sub={t(b('先易后难', 'easy before hard'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="comp" label={t(b('学习率调度', 'Learning-rate schedule'))} sub={t(b('早期大，之后逐渐减小', 'large early, then smaller'))} size={10.5} />
      <Region x={6} y={76} w={368} h={70} side="comp" label={t(b('训练阶段', 'Training stages'))} />
      <Mod x={18} y={98} w={104} h={40} side="comp" label={t(b('预训练', 'Pretraining'))} sub={t(b('通用表示', 'general features'))} size={10.5} />
      <Mod x={136} y={98} w={108} h={40} side="comp" label={t(b('指令微调', 'Instruction tuning'))} sub={t(b('按要求回答', 'follow requests'))} size={10} />
      <Mod x={258} y={98} w={104} h={40} side="comp" label={t(b('人类反馈强化学习', 'RLHF'))} sub={t(b('按偏好调整', 'tuned to preferences'))} size={9.5} />
      <Gap x={14} y={168} w={352} h={40} label={t(b('由身体成长和社会互动驱动的学习顺序', 'A learning order driven by bodily growth and social interaction'))} />

      <Flow id={id} side="comp" pts={[[70, 54], [70, 98]]} />
      <Flow id={id} side="comp" pts={[[122, 118], [136, 118]]} />
      <Flow id={id} side="comp" pts={[[244, 118], [258, 118]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[281, 54], [281, 76]]} label={t(b('调节可塑性', 'sets plasticity'))} lx={38} ly={0} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={98} n={2} side="comp" />
      <Num x={136} y={98} n={3} side="comp" />
      <Num x={258} y={98} n={4} side="comp" />
      <Num x={196} y={14} n={5} side="comp" />
      <Num x={14} y={168} n={6} side="comp" />
    </Svg>
  )
}

/** Ocular dominance after covering the left eye (x_L = 0, x_R = 1), interactive: w_R grows by η w_R each step and the
 * pair is renormalized to sum to 1. Drag η: large in the critical period, small afterwards. Starts at the worked
 * example's η = 0.1. */
function OcularDominancePlot({ t }: FigProps) {
  const [eta, setEta] = useState(0.1)
  const col = SIDE_COLOR.bio
  const n = 60
  const run = (e: number) => { const w: number[] = [0.5]; for (let i = 0; i < n; i++) { const r = w[i] + e * w[i]; w.push(r / (r + (1 - w[i]))) } return w }
  const wR = run(eta)
  const f: Frame = { x: 44, y: 30, w: 256, h: 124, xr: [0, n], yr: [0, 1] }
  const readout = (e: number) => t(b(`$\\eta = ${e.toFixed(3)}$：60 步后右眼占 ${run(e)[n].toFixed(2)}`, `$\\eta = ${e.toFixed(3)}$: right eye holds ${run(e)[n].toFixed(2)} after 60 steps`))
  return (
    <>
      <Svg id="f40mb0" w={380} h={198} label={t(b('眼优势竞争：遮住一只眼，另一只眼在关键期内迅速占据连接', 'Ocular dominance: with one eye covered, the other takes over the connections quickly during the critical period'))}>
        <Axes f={f} xTicks={[[0, '0'], [30, '30'], [60, '60']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('遮住左眼后的步数', 'Steps after covering the left eye'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('连接所占份额', 'Share of the connections'))} anchor="start" />
        <Path pts={wR.map((v, i) => [px(f, i), py(f, v)] as [number, number])} color={col} />
        <Path pts={wR.map((v, i) => [px(f, i), py(f, 1 - v)] as [number, number])} color={C.dim} />
        <Label x={f.x + f.w + 4} y={py(f, wR[n])} s={t(b('右眼', 'right eye'))} anchor="start" size={10} color={col} />
        <Label x={f.x + f.w + 4} y={Math.min(py(f, 1 - wR[n]), py(f, 0.1))} s={t(b('左眼（遮住）', 'left, covered'))} anchor="start" size={10} />
      </Svg>
      <FigSlider label={t(b('可塑性 $\\eta$', 'Plasticity $\\eta$'))} value={eta} min={0.005} max={0.2} step={0.005} onChange={setEta} readout={readout(eta)} widest={[0.1].map(readout)} />
    </>
  )
}

/** The plasticity window η(t) = η_max exp(−(t − t₀)² / 2σ²) + η_min with t₀ = 8 months, σ = 2, η_max = 1, η_min = 0.05,
 * interactive: drag the age. Illustrative, as the card says. */
function WindowPlot({ t }: FigProps) {
  const [age, setAge] = useState(8)
  const col = SIDE_COLOR.bio
  const eta = (m: number) => Math.exp(-((m - 8) ** 2) / 8) + 0.05
  const f: Frame = { x: 44, y: 30, w: 270, h: 124, xr: [0, 36], yr: [0, 1.1] }
  const readout = (m: number) => t(b(`${m} 个月：可塑性 ${eta(m).toFixed(2)}，是成年人的 ${(eta(m) / 0.05).toFixed(0)} 倍`, `${m} months: plasticity ${eta(m).toFixed(2)}, ${(eta(m) / 0.05).toFixed(0)} × an adult’s`))
  return (
    <>
      <Svg id="f40mb1" w={380} h={198} label={t(b('可塑性窗口：同样的经验，在关键期内影响最大', 'The plasticity window: the same experience has the most effect inside the critical period'))}>
        <Axes f={f} xTicks={[[0, '0'], [8, '8'], [12, '12'], [24, '24'], [36, '36']]} yTicks={[[0.05, '0.05'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('年龄（月）', 'Age (months)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('可塑性 η（示意）', 'Plasticity η (illustrative)'))} anchor="start" />
        <Ref f={f} y={0.05} color={C.lemonD} />
        <Label x={f.x + f.w + 4} y={py(f, 0.05)} s={t(b('成年', 'adult'))} anchor="start" size={10} color={C.lemonD} />
        <Path pts={trace(f, eta, 0, 36, 200)} color={col} opacity={0.45} />
        <Dot f={f} x={age} y={eta(age)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('年龄', 'Age'))} value={age} min={0} max={36} step={1} onChange={setAge} readout={readout(age)} widest={[8, 10, 12].map(readout)} />
    </>
  )
}

/** Curriculum sampling P(x) ∝ exp(−d(x) / λ) over difficulties 1 to 5, interactive: drag λ upward as training proceeds.
 * Starts at the worked example's λ = 1. */
function CurriculumPlot({ t }: FigProps) {
  const [lam, setLam] = useState(1)
  const col = SIDE_COLOR.comp
  const pOf = (l: number) => { const e = [1, 2, 3, 4, 5].map((d) => Math.exp(-d / l)); const z = e.reduce((a, v) => a + v, 0); return e.map((v) => v / z) }
  const p = pOf(lam)
  const f: Frame = { x: 44, y: 34, w: 270, h: 120, xr: [0.4, 5.6], yr: [0, 1] }
  const readout = (l: number) => { const r = Math.exp(4 / l); return t(b(`$\\lambda = ${l.toFixed(1)}$：难度 1 与 5 的抽样比 ${r < 10 ? r.toFixed(1) : r.toFixed(0)} : 1`, `$\\lambda = ${l.toFixed(1)}$: difficulty 1 vs 5 sampled ${r < 10 ? r.toFixed(1) : r.toFixed(0)} : 1`)) }
  return (
    <>
      <Svg id="f40mc0" w={380} h={198} label={t(b('课程学习：λ 小时几乎只抽简单样本，随训练增大，难样本越来越常被抽到', 'Curriculum learning: at small λ nearly only easy samples are drawn; as λ grows, hard ones come up more and more'))}>
        <Axes f={f} xTicks={[[1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('样本难度 d', 'Sample difficulty d'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('被抽到的概率', 'Chance of being drawn'))} anchor="start" />
        {p.map((v, i) => <Bar key={i} f={f} x={i + 1} v={v} w={0.6} color={col} opacity={1 - i * 0.12} />)}
        {p.map((v, i) => <Label key={i} x={px(f, i + 1)} y={py(f, v) - 8} s={v.toFixed(2)} size={10} color={col} />)}
      </Svg>
      <FigSlider label="$\lambda$" value={lam} min={0.5} max={10} step={0.1} onChange={setLam} readout={readout(lam)} widest={[1, 0.5, 9.9].map(readout)} />
    </>
  )
}

/** The cosine learning-rate schedule from 10⁻³ down to 10⁻⁵, interactive: drag the training progress. Starts halfway. */
function CosineLrPlot({ t }: FigProps) {
  const [prog, setProg] = useState(0.5)
  const col = SIDE_COLOR.comp
  const eta = (x: number) => 1e-5 + 0.5 * (1e-3 - 1e-5) * (1 + Math.cos(Math.PI * x))
  const f: Frame = { x: 52, y: 30, w: 270, h: 124, xr: [0, 1], yr: [0, 1.05e-3] }
  const sci = (v: number) => { const e = Math.floor(Math.log10(v)); return `${(v / Math.pow(10, e)).toFixed(1)}×10⁻${'⁰¹²³⁴⁵⁶⁷⁸⁹'[-e]}` }
  const readout = (x: number) => t(b(`进度 ${Math.round(x * 100)}%：$\\eta \\approx$ ${sci(eta(x))}，开始时的 1/${Math.round(1e-3 / eta(x))}`, `${Math.round(x * 100)}% through: $\\eta \\approx$ ${sci(eta(x))}, 1/${Math.round(1e-3 / eta(x))} of the start`))
  return (
    <>
      <Svg id="f40mc1" w={380} h={198} label={t(b('余弦学习率调度：可塑性随训练平滑下降', 'Cosine learning-rate schedule: plasticity falls smoothly over training'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.5, '50%'], [0.9, '90%'], [1, '100%']]} yTicks={[[0, '0'], [5e-4, '5×10⁻⁴'], [1e-3, '10⁻³']]} xLabel={t(b('训练进度', 'Training progress'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('学习率 η', 'Learning rate η'))} anchor="start" />
        <Path pts={trace(f, eta, 0, 1, 160)} color={col} opacity={0.45} />
        <Dot f={f} x={prog} y={eta(prog)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('训练进度', 'Progress'))} value={prog} min={0} max={1} step={0.01} onChange={setProg} readout={readout(prog)} widest={[1, 0.99, 0.5].map(readout)} />
    </>
  )
}

export const DEVELOPMENT_FIGS: TopicFigs = {
  arch: { brain: CriticalPeriodBrainArch, ai: StagedTrainingArch },
  math: {
    bio: {
      0: { Fig: OcularDominancePlot, cap: b('遮住左眼，只有右眼有输入。每一步右眼的连接按 $\\eta\\, x_R\\, y$ 增强，再归一化，使两者之和保持为 $1$。拖动滑块改变可塑性 $\\eta$：默认关键期内的 $0.1$，几十步后右眼占据几乎全部连接；关键期过后 $\\eta$ 很小，同样的遮挡几乎不改变连接。', 'Cover the left eye so only the right eye has input. Each step the right eye’s connection grows by $\\eta\\, x_R\\, y$, then the pair is renormalized to sum to $1$. Drag the slider to change the plasticity $\\eta$: at the critical-period default of $0.1$ the right eye takes nearly all the connections within a few dozen steps; after the critical period $\\eta$ is small and the same covering barely changes anything.') },
      1: { Fig: WindowPlot, cap: b('示意：关键期中心 $t_0 = 8$ 个月、$\\sigma = 2$ 个月，$\\eta_{\\max} = 1$、$\\eta_{\\min} = 0.05$。拖动滑块改变年龄：8 个月时可塑性约 $1.05$，是成年人的约二十倍；12 个月时约 $0.19$；两岁以后就接近成年的 $0.05$。', 'Illustration: the critical period centers on $t_0 = 8$ months with $\\sigma = 2$ months, $\\eta_{\\max} = 1$ and $\\eta_{\\min} = 0.05$. Drag the slider to change the age: at 8 months plasticity is about $1.05$, some twenty times an adult’s; at 12 months about $0.19$; after age two it is close to the adult $0.05$.') },
    },
    comp: {
      0: { Fig: CurriculumPlot, cap: b('五个难度的样本，按 $\\exp(-d/\\lambda)$ 抽样。拖动滑块改变 $\\lambda$：默认 $\\lambda = 1$ 时难度 $1$ 与 $5$ 的抽样比约 $55 : 1$，几乎只练简单的；训练推进、$\\lambda$ 增大到 $10$ 时，比例降到约 $1.5 : 1$，难样本已经常被抽到。', 'Samples at five difficulties, drawn by $\\exp(-d/\\lambda)$. Drag the slider to change $\\lambda$: at the default $\\lambda = 1$ difficulty $1$ is drawn about $55$ times as often as $5$, so practice is almost all easy; as training advances and $\\lambda$ reaches $10$, the ratio drops to about $1.5 : 1$ and hard samples come up often.') },
      1: { Fig: CosineLrPlot, cap: b('学习率从 $10^{-3}$ 按余弦曲线降到 $10^{-5}$。拖动滑块改变训练进度：一半时约 $5 \\times 10^{-4}$，九成时约 $3.4 \\times 10^{-5}$，只有开始时的约三十分之一。早期的数据在大学习率下塑造网络，这与可塑性随发育下降在功能上相似。', 'The learning rate falls along a cosine from $10^{-3}$ to $10^{-5}$. Drag the slider to change the training progress: halfway it is about $5 \\times 10^{-4}$, at 90% about $3.4 \\times 10^{-5}$, roughly a thirtieth of the start. Early data shape the network under a large learning rate, functionally like plasticity falling with development.') },
    },
  },
}
