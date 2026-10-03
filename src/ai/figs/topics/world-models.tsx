import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import { Axes, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Efference copy to a cerebellar forward model, comparison with real feedback, and prediction between cortical levels. */
function ForwardModelArch({ t }: FigProps) {
  const id = 'f17b'
  return (
    <Svg id={id} w={380} h={296} label={t(b('大脑预测的结构与信息流：运动皮层、小脑前向模型、比较、皮层层级与心理模拟', 'Prediction in the brain: motor cortex, cerebellar forward model, comparison, cortical hierarchy and mental simulation'))}>
      <Mod x={14} y={14} w={150} h={36} side="bio" label={t(b('运动皮层', 'Motor cortex'))} sub={t(b('发出运动指令', 'issues the command'))} />
      <Mod x={216} y={14} w={150} h={36} side="bio" label={t(b('身体', 'Body'))} sub={t(b('动作产生真实感觉', 'movement makes real sensation'))} />
      <Mod x={14} y={86} w={150} h={44} side="bio" label={t(b('小脑前向模型', 'Cerebellar model'))} sub={t(b('预测感觉结果', 'predicts the sensation'))} />
      <Var cx={291} cy={108} side="bio" label={t(b('比较', 'Compare'))} r={20} />
      <Region x={6} y={172} w={368} h={64} side="bio" label={t(b('皮层层级', 'Cortical hierarchy'))} />
      <Mod x={18} y={190} w={150} h={34} side="bio" label={t(b('高级皮层', 'Higher cortex'))} sub={t(b('发送预测', 'sends predictions'))} size={10.5} />
      <Mod x={212} y={190} w={150} h={34} side="bio" label={t(b('低级皮层', 'Lower cortex'))} sub={t(b('上传误差', 'sends errors up'))} size={10.5} />
      <Mod x={110} y={252} w={160} h={34} side="bio" label={t(b('心理模拟', 'Mental simulation'))} sub={t(b('前额叶与海马', 'prefrontal, hippocampus'))} size={10.5} />

      <Flow id={id} side="bio" fast pts={[[164, 32], [216, 32]]} />
      <Flow id={id} side="bio" fast pts={[[89, 50], [89, 86]]} label={t(b('传出副本', 'efference copy'))} lx={34} ly={0} />
      <Flow id={id} side="bio" fast pts={[[164, 108], [271, 108]]} label={t(b('预测', 'prediction'))} ly={-7} />
      <Flow id={id} side="bio" pts={[[291, 50], [291, 88]]} label={t(b('真实感觉', 'real sensation'))} lx={34} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[291, 128], [291, 152], [40, 152], [40, 130]]} label={t(b('误差修正模型', 'error corrects the model'))} at={1} ly={-6} />
      <Flow id={id} side="bio" kind="fb" pts={[[168, 200], [212, 200]]} />
      <Flow id={id} side="bio" pts={[[212, 216], [168, 216]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[60, 224], [60, 269], [110, 269]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={86} n={2} side="bio" />
      <Num x={318} y={92} n={3} side="bio" />
      <Num x={110} y={152} n={4} side="bio" />
      <Num x={190} y={172} n={5} side="bio" />
      <Num x={110} y={252} n={6} side="bio" />
    </Svg>
  )
}

/** A Dreamer-style world model: encoder, latent dynamics, prediction heads, imagined rollouts and actor-critic learning. */
function DreamerArch({ t }: FigProps) {
  const id = 'f17c'
  return (
    <Svg id={id} w={380} h={322} label={t(b('学习型世界模型的结构与信息流', 'Structure and information flow of a learned world model'))}>
      <Mod x={14} y={14} w={110} h={32} side="comp" label={t(b('观测', 'Observation'))} size={10.5} />
      <Mod x={150} y={14} w={216} h={32} side="comp" label={t(b('预测头', 'Prediction heads'))} sub={t(b('重建观测、预测奖赏', 'reconstruct, predict reward'))} size={10.5} />
      <Mod x={14} y={70} w={110} h={40} side="comp" label={t(b('编码器', 'Encoder'))} sub={t(b('压缩为潜在状态', 'to a latent state'))} size={10.5} />
      <Mod x={150} y={70} w={216} h={40} side="comp" label={t(b('动态模型', 'Dynamics model'))} sub={t(b('由状态和动作预测下一步', 'next state from state and action'))} />
      <Region x={6} y={134} w={368} h={136} side="comp" label={t(b('在想象中学习', 'Learning in imagination'))} />
      <Mod x={18} y={158} w={344} h={40} side="comp" label={t(b('想象轨迹', 'Imagined trajectory'))} sub={t(b('在潜在空间中展开约 15 步', 'about 15 steps in latent space'))} />
      <Mod x={18} y={222} w={166} h={36} side="comp" label={t(b('行动者', 'Actor'))} sub={t(b('选择动作', 'chooses actions'))} size={10.5} />
      <Mod x={196} y={222} w={166} h={36} side="comp" label={t(b('评论家', 'Critic'))} sub={t(b('估计价值', 'estimates value'))} size={10.5} />
      <Gap x={110} y={282} w={160} h={32} label={t(b('可外推的物理规律', 'Extrapolating physical laws'))} />

      <Flow id={id} side="comp" pts={[[69, 46], [69, 70]]} />
      <Flow id={id} side="comp" pts={[[124, 90], [150, 90]]} />
      <Flow id={id} side="comp" pts={[[258, 70], [258, 46]]} />
      <Flow id={id} side="comp" pts={[[258, 110], [258, 158]]} />
      <Flow id={id} side="comp" pts={[[120, 198], [120, 222]]} />
      <Flow id={id} side="comp" pts={[[279, 198], [279, 222]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[60, 222], [60, 198]]} label={t(b('动作', 'actions'))} lx={-18} ly={0} />
      <Num x={14} y={70} n={1} side="comp" />
      <Num x={150} y={70} n={2} side="comp" />
      <Num x={150} y={14} n={3} side="comp" />
      <Num x={18} y={158} n={4} side="comp" />
      <Num x={18} y={222} n={5} side="comp" />
      <Num x={110} y={282} n={6} side="comp" />
    </Svg>
  )
}

/** Prism adaptation with a forward model, interactive: prisms shift the target 10° for 40 reaches, then come off. Each
 * reach corrects the internal estimate by η times the error. Drag η. Starts at 0.1. */
function PrismPlot({ t }: FigProps) {
  const [eta, setEta] = useState(0.1)
  const col = SIDE_COLOR.bio
  const on = 40, total = 60
  const errs: number[] = []
  let c = 0
  for (let i = 0; i < total; i++) { const e = (i < on ? 10 : 0) - c; errs.push(e); c += eta * e }
  const f: Frame = { x: 40, y: 30, w: 300, h: 128, xr: [0, total], yr: [-10, 10] }
  const within = (v: number) => Math.ceil(Math.log(0.1) / Math.log(1 - v))
  const readout = (v: number) => t(b(`$\\eta = ${v.toFixed(2)}$：约 ${within(v)} 次后误差小于 1°`, `$\\eta = ${v.toFixed(2)}$: under 1° after about ${within(v)} reaches`))
  return (
    <>
      <Svg id="f17mb0" w={380} h={200} label={t(b('棱镜适应：误差逐次减小；摘掉棱镜后出现反方向的后效', 'Prism adaptation: the error shrinks reach by reach, and removing the prisms brings an aftereffect the other way'))}>
        <rect x={px(f, 0)} y={f.y} width={px(f, on) - px(f, 0)} height={f.h} fill={C.lemonD} fillOpacity={0.06} />
        <Axes f={f} xTicks={[[0, '0'], [20, '20'], [40, '40'], [60, '60']]} yTicks={[[-10, '−10'], [0, '0'], [10, '10']]} xLabel={t(b('伸手的次数', 'Reach number'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('落点误差（度）', 'Landing error (°)'))} anchor="start" />
        <Label x={px(f, 20)} y={f.y + 10} s={t(b('戴着偏移 10° 的棱镜', 'wearing 10° prisms'))} size={10} color={C.lemonD} />
        <Label x={px(f, 50)} y={f.y + 10} s={t(b('摘掉棱镜', 'prisms off'))} size={10} />
        <Path pts={errs.map((v, i) => [px(f, i), py(f, v)] as [number, number])} color={col} width={1.4} opacity={0.6} />
        {errs.map((v, i) => <circle key={i} cx={px(f, i)} cy={py(f, v)} r={2} fill={col} />)}
        <Label x={px(f, on + 4)} y={py(f, -8.6)} s={t(b('反向后效', 'aftereffect'))} anchor="start" size={10} color={col} />
      </Svg>
      <FigSlider label={t(b('修正比例 $\\eta$', 'Correction rate $\\eta$'))} value={eta} min={0.02} max={0.5} step={0.01} onChange={setEta} readout={readout(eta)} widest={[0.02, 0.1].map(readout)} />
    </>
  )
}

/** Predictive coding in one dimension (W = 1, λ ignored, τ = 0.2 s): the input steps from 0 to 2, then to 3; the
 * representation follows and the error is large only right after each change. */
function PredictiveCodingPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 30, w: 278, h: 124, xr: [0, 3], yr: [0, 3.3] }
  const x = (s: number) => (s < 0.2 ? 0 : s < 1.6 ? 2 : 3)
  const pts: { s: number; x: number; r: number; e: number }[] = []
  let r = 0
  for (let i = 0; i <= 600; i++) { const s = (3 * i) / 600, xi = x(s); pts.push({ s, x: xi, r, e: xi - r }); r += ((xi - r) / 0.2) * (3 / 600) }
  const line = (k: 'x' | 'r' | 'e') => pts.map((p) => [px(f, p.s), py(f, p[k])] as [number, number])
  return (
    <Svg id="f17mb1" w={380} h={196} label={t(b('预测编码：表征跟上输入后误差归零，只有输入变化时才有误差向上传', 'Predictive coding: once the representation catches up the error falls to zero, so only changes send error upward'))}>
      <Axes f={f} xTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3']]} yTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3']]} xLabel={t(b('时间（秒）', 'Time (s)'))} grid />
      <Path pts={line('x')} color={C.dim} width={1.4} dashed />
      <Path pts={line('r')} color={col} />
      <Path pts={line('e')} color={C.lemonD} />
      <Label x={f.x + f.w + 6} y={py(f, 3) - 8} s={t(b('输入 x', 'input x'))} anchor="start" size={10} />
      <Label x={f.x + f.w + 6} y={py(f, 3) + 8} s={t(b('表征 r', 'model r'))} anchor="start" size={10} color={col} />
      <Label x={f.x + f.w + 6} y={py(f, 0) - 8} s={t(b('误差 ε', 'error ε'))} anchor="start" size={10} color={C.lemonD} />
      <Label x={px(f, 0.3) + 4} y={py(f, 2.05)} s="ε = 2" anchor="start" size={10} color={C.lemonD} />
      <Label x={px(f, 1.7) + 4} y={py(f, 1.05)} s="ε = 1" anchor="start" size={10} color={C.lemonD} />
    </Svg>
  )
}

/** The compounding bound ε Σ L^k with ε = 0.01, interactive: drag L. Starts at the worked example's L = 1.2. */
function CompoundingPlot({ t }: FigProps) {
  const [L, setL] = useState(1.2)
  const col = SIDE_COLOR.comp
  const bound = (l: number, H: number) => 0.01 * (Math.abs(l - 1) < 1e-9 ? H : (Math.pow(l, H) - 1) / (l - 1))
  const f: Frame = { x: 44, y: 30, w: 296, h: 128, xr: [0, 30], yr: [-2, 2] }
  const lg = (v: number) => Math.log10(Math.max(v, 1e-6))
  const readout = (l: number) => { const v = bound(l, 30); return t(b(`$L = ${l.toFixed(2)}$：30 步后上界 ${v < 10 ? v.toFixed(2) : v.toFixed(0)}`, `$L = ${l.toFixed(2)}$: bound after 30 steps ${v < 10 ? v.toFixed(2) : v.toFixed(0)}`)) }
  return (
    <>
      <Svg id="f17mc1" w={380} h={202} label={t(b('想象中的误差累积：L 大于 1 时误差上界随步数指数增长', 'Error compounding in imagination: with L above 1 the bound grows exponentially with the number of steps'))}>
        <Axes f={f} xTicks={[[0, '0'], [5, '5'], [15, '15'], [30, '30']]} yTicks={[[-2, '0.01'], [-1, '0.1'], [0, '1'], [1, '10'], [2, '100']]} xLabel={t(b('想象的步数 H', 'Imagined steps H'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('误差上界（对数）', 'Error bound (log)'))} anchor="start" />
        <Ref f={f} y={0} color={C.lemonD} />
        <Label x={f.x + 6} y={py(f, 0) - 8} s={t(b('误差与状态本身一样大', 'error as large as the state'))} anchor="start" size={10} color={C.lemonD} />
        <Path pts={trace(f, (H) => lg(bound(L, H)), 1, 30, 120)} color={col} />
        {[5, 15, 30].map((H) => bound(L, H) <= 100 && <Dot key={H} f={f} x={H} y={lg(bound(L, H))} color={col} />)}
      </Svg>
      <FigSlider label="$L$" value={L} min={0.8} max={1.4} step={0.01} onChange={setL} readout={readout(L)} widest={[1.39, 1.25, 0.8].map(readout)} />
    </>
  )
}

export const WORLD_MODEL_FIGS: TopicFigs = {
  arch: { brain: ForwardModelArch, ai: DreamerArch },
  math: {
    bio: {
      0: { Fig: PrismPlot, cap: b('拖动滑块改变每次修正误差的比例 $\\eta$。戴上偏移 $10°$ 的棱镜，落点误差起初为 $10°$，每次按误差修正一部分，逐次减小；默认 $\\eta = 0.1$ 时约 22 次后小于 $1°$。摘掉棱镜后，已经学会的修正还在，出现反方向的后效，再逐渐消退。', 'Drag the slider to change the share $\\eta$ of each error that is corrected. With $10°$ prisms the first reach misses by $10°$, and each reach corrects part of the error; at the default $\\eta = 0.1$ it drops below $1°$ after about 22 reaches. When the prisms come off, the learned correction remains and produces an aftereffect the other way, which then fades.') },
      1: { Fig: PredictiveCodingPlot, cap: b('一维的小例子：输入从 $0$ 跳到 $2$，表征 $r$ 随即追上，误差 $\\varepsilon$ 从 $2$ 降到 $0$。之后输入跳到 $3$，误差只剩 $1$，又很快归零。输入不变时没有误差向上传，只有「变化」被传上去。', 'The worked example in one dimension: the input jumps from $0$ to $2$, the representation $r$ catches up, and the error $\\varepsilon$ falls from $2$ to $0$. When the input then jumps to $3$, the error is only $1$ and soon returns to zero. A steady input sends no error upward; only change is passed on.') },
    },
    comp: {
      1: { Fig: CompoundingPlot, cap: b('拖动滑块改变 $L$，单步误差 $\\varepsilon = 0.01$，纵轴为对数。默认 $L = 1.2$：5 步约 $0.07$，15 步约 $0.72$，30 步约 $12$，远超状态本身的大小。$L = 1$ 时误差只按步数线性增长；$L < 1$ 时误差会停在 $\\varepsilon/(1 - L)$。', 'Drag the slider to change $L$; the one-step error is $\\varepsilon = 0.01$, on a log axis. At the default $L = 1.2$: about $0.07$ after 5 steps, $0.72$ after 15 and $12$ after 30, far larger than the state itself. At $L = 1$ the error only grows linearly with steps; with $L < 1$ it levels off at $\\varepsilon/(1 - L)$.') },
    },
  },
}
