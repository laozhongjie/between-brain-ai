import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Store } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, Sub, Vec, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Complementary learning systems: a fast hippocampal store replays into a slow neocortical store. */
function ComplementaryArch({ t }: FigProps) {
  const id = 'f09b'
  return (
    <Svg id={id} w={380} h={284} label={t(b('互补学习系统与突触巩固的结构与信息流', 'Structure and information flow of complementary learning systems and synaptic consolidation'))}>
      <Mod x={14} y={14} w={352} h={30} side="bio" label={t(b('新经历', 'New experience'))} size={10.5} />
      <Store x={14} y={70} w={150} h={60} side="bio" label={t(b('海马', 'Hippocampus'))} sub={t(b('快速写入、稀疏编码', 'fast writes, sparse code'))} />
      <Store x={216} y={70} w={150} h={60} side="bio" label={t(b('新皮层', 'Neocortex'))} sub={t(b('缓慢学习、交错整合', 'slow, interleaved learning'))} />
      <Mod x={110} y={160} w={160} h={40} side="bio" label={t(b('睡眠回放', 'Sleep replay'))} sub={t(b('新旧内容交错', 'new and old interleaved'))} />
      <Mod x={14} y={230} w={150} h={40} side="bio" label={t(b('突触巩固', 'Synaptic consolidation'))} sub={t(b('重要连接稳定下来', 'key connections stabilize'))} size={10.5} />
      <Mod x={216} y={230} w={150} h={40} side="bio" label={t(b('干扰与修剪', 'Interference, pruning'))} sub={t(b('相似内容相互重叠', 'similar content overlaps'))} size={10.5} />

      <Flow id={id} side="bio" fast pts={[[89, 44], [89, 70]]} label={t(b('一次写入', 'one shot'))} lx={30} ly={0} />
      <Flow id={id} side="bio" pts={[[291, 44], [291, 70]]} label={t(b('缓慢', 'slowly'))} lx={22} ly={0} />
      <Flow id={id} side="bio" head="read" pts={[[89, 130], [89, 180], [110, 180]]} />
      <Flow id={id} side="bio" pts={[[270, 180], [291, 180], [291, 130]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[50, 230], [50, 130]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[330, 230], [330, 130]]} />
      <Num x={14} y={72} n={1} side="bio" />
      <Num x={14} y={230} n={2} side="bio" />
      <Num x={110} y={160} n={3} side="bio" />
      <Num x={216} y={72} n={4} side="bio" />
      <Num x={216} y={230} n={5} side="bio" />
    </Svg>
  )
}

/** Sequential tasks update shared parameters; replay, regularization and isolation protect old tasks. */
function ContinualMethodsArch({ t }: FigProps) {
  const id = 'f09c'
  return (
    <Svg id={id} w={380} h={288} label={t(b('持续学习方法的结构与信息流', 'Structure and information flow of continual learning methods'))}>
      <Mod x={14} y={14} w={352} h={30} side="comp" label={t(b('任务按顺序到来：A，然后 B……', 'Tasks in sequence: A, then B …'))} size={10.5} />
      <Store x={110} y={66} w={160} h={58} side="comp" label={t(b('共享参数', 'Shared parameters'))} />
      <Store x={14} y={150} w={110} h={56} side="comp" label={t(b('回放缓冲区', 'Replay buffer'))} sub={t(b('旧样本', 'old samples'))} />
      <Mod x={135} y={150} w={110} h={56} side="comp" label={t(b('正则化', 'Regularization'))} sub={t(b('重要参数拉回原位', 'pulls key weights back'))} size={10.5} />
      <Mod x={256} y={150} w={110} h={56} side="comp" label={t(b('参数隔离', 'Isolation'))} sub={t(b('新增适配器', 'new adapters'))} size={10.5} />
      <Gap x={110} y={236} w={160} h={40} label={t(b('离线自动整合', 'Automatic offline\nintegration'))} />

      <Flow id={id} side="comp" pts={[[190, 44], [190, 66]]} label={t(b('梯度下降', 'gradient descent'))} lx={36} ly={0} />
      <Flow id={id} side="comp" head="read" pts={[[69, 150], [69, 95], [110, 95]]} label={t(b('混入训练', 'mixed in'))} at={1} ly={-7} />
      <Flow id={id} side="comp" kind="fb" pts={[[190, 150], [190, 124]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[311, 150], [311, 95], [270, 95]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={110} y={68} n={2} side="comp" />
      <Num x={14} y={152} n={3} side="comp" />
      <Num x={135} y={150} n={4} side="comp" />
      <Num x={256} y={150} n={5} side="comp" />
      <Num x={110} y={236} n={6} side="comp" />
    </Svg>
  )
}

/** Interference, interactive: drag the overlap (cosine) between the inputs of memories A and B, of equal length; recalling
 * A returns y_A plus the overlap times y_B. Starts at the worked example's second case, overlap 0.5. */
function InterferencePlot({ t }: FigProps) {
  const [c, setC] = useState(0.5)
  const col = SIDE_COLOR.bio
  const ox = 52, oy = 150, len = 110
  const ang = Math.acos(c)
  const f: Frame = { x: 236, y: 34, w: 124, h: 124, xr: [0.4, 2.6], yr: [0, 1.1] }
  const readout = (v: number) => t(b(`重叠 ${v.toFixed(2)}：回忆 A 时混入 ${v.toFixed(2)} 倍的 B`, `overlap ${v.toFixed(2)}: recalling A brings in ${v.toFixed(2)} × B`))
  return (
    <>
      <Svg id="f09mb0" w={380} h={200} label={t(b('干扰：新旧记忆的输入越重叠，回忆旧记忆时混入的新内容越多', 'Interference: the more the inputs of new and old memories overlap, the more of the new comes back with the old'))}>
        <Vec x1={ox} y1={oy} x2={ox + len} y2={oy} color={col} width={2} />
        <Vec x1={ox} y1={oy} x2={ox + len * Math.cos(ang)} y2={oy - len * Math.sin(ang)} color={C.lemonD} width={2} />
        <path d={`M ${ox + 30} ${oy} A 30 30 0 0 0 ${ox + 30 * Math.cos(ang)} ${oy - 30 * Math.sin(ang)}`} fill="none" stroke={C.dim} />
        <Label x={ox + len + 6} y={oy} s={t(b('A 的输入', 'input of A'))} anchor="start" size={10} color={col} />
        <Label x={ox + len * Math.cos(ang)} y={oy - len * Math.sin(ang) - 14} s={t(b('B 的输入', 'input of B'))} size={10} color={C.lemonD} />
        <Label x={ox + 60} y={oy + 24} s={t(b('夹角越小，重叠越大', 'smaller angle, more overlap'))} size={10} />
        <Axes f={f} xTicks={[[1, 'A'], [2, 'B']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('回忆 A 得到的成分', 'What recalling A returns'))} anchor="start" />
        <Bar f={f} x={1} v={1} w={0.6} color={col} />
        <Bar f={f} x={2} v={c} w={0.6} color={C.lemonD} />
        <Label x={px(f, 2)} y={py(f, c) - 8} s={c.toFixed(2)} size={10} color={C.lemonD} />
      </Svg>
      <FigSlider label={t(b('输入的重叠', 'Overlap of inputs'))} value={c} min={0} max={1} step={0.01} onChange={setC}
        readout={readout(c)} widest={[0.5].map(readout)} />
    </>
  )
}

/** A two-state synaptic cascade (C₁ = 1, C₂ = 10, g = 1) after learning sets u₁ = 1: the fast variable falls, the slow
 * one rises, and both settle at 1/11. Exact: u₁ − u₂ = e^{−1.1t} and u₁ + 10u₂ = 1. */
function CascadePlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 30, w: 270, h: 124, xr: [0, 5], yr: [0, 1] }
  const u1 = (s: number) => 1 / 11 + (10 / 11) * Math.exp(-1.1 * s)
  const u2 = (s: number) => (1 - Math.exp(-1.1 * s)) / 11
  return (
    <Svg id="f09mb1" w={380} h={196} label={t(b('突触级联：快变量下降、慢变量上升，最后一部分记忆留在慢变量里', 'A synaptic cascade: the fast variable falls, the slow one rises, and part of the memory stays in the slow one'))}>
      <Axes f={f} xTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('学习之后的时间（任意单位）', 'Time after learning (arbitrary units)'))} yLabel={t(b('突触变量', 'Synaptic variable'))} />
      <Ref f={f} y={1 / 11} />
      <Path pts={trace(f, u1)} color={col} />
      <Path pts={trace(f, u2)} color={col} opacity={0.55} width={2.4} />
      <line x1={196} x2={214} y1={48} y2={48} stroke={col} strokeWidth={1.8} />
      <Label x={220} y={48} s={t(b('u₁ 快变量，C₁ = 1', 'u₁ fast, C₁ = 1'))} anchor="start" size={10} color={col} />
      <line x1={196} x2={214} y1={66} y2={66} stroke={col} strokeOpacity={0.55} strokeWidth={2.4} />
      <Label x={220} y={66} s={t(b('u₂ 慢变量，C₂ = 10', 'u₂ slow, C₂ = 10'))} anchor="start" size={10} color={col} />
      <Label x={f.x + f.w + 6} y={py(f, 1 / 11) - 9} s={t(b('都停在\n1/11 ≈ 0.09', 'both settle\nat 1/11 ≈ 0.09'))} anchor="start" size={10} />
    </Svg>
  )
}

/** Gradient interference, interactive: g_A = (1, 0.5) is fixed; drag the direction of g_B (length √2). One step of B
 * (η = 0.1) changes A's loss by about −η g_A · g_B. Starts at the worked example's g_B = (−1, 1), 135°. */
function GradInterferencePlot({ t }: FigProps) {
  const [deg, setDeg] = useState(135)
  const col = SIDE_COLOR.comp
  const gA = [1, 0.5], r = Math.SQRT2, a = (deg * Math.PI) / 180
  const gB = [r * Math.cos(a), r * Math.sin(a)]
  const dotOf = (d: number) => { const k = (d * Math.PI) / 180; return gA[0] * r * Math.cos(k) + gA[1] * r * Math.sin(k) }
  const dot = dotOf(deg), dL = -0.1 * dot
  const ox = 110, oy = 118, sc = 52
  const f: Frame = { x: 268, y: 34, w: 80, h: 124, xr: [0.4, 1.6], yr: [-0.2, 0.2] }
  const readout = (d: number) => { const v = -0.1 * dotOf(d); return t(b(`点积 ${dotOf(d).toFixed(2)}：A 的损失每步 ${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(3)}`, `dot ${dotOf(d).toFixed(2)}: A’s loss ${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(3)} per step`)) }
  return (
    <>
      <Svg id="f09mc0" w={380} h={200} label={t(b('梯度干扰：两个梯度夹角超过 90 度时，学 B 的每一步都让 A 的损失增加', 'Gradient interference: when the two gradients are more than 90 degrees apart, each step on B raises A’s loss'))}>
        <circle cx={ox} cy={oy} r={r * sc} fill="none" stroke={C.line} strokeDasharray="2 3" />
        <line x1={ox - 80} x2={ox + 80} y1={oy} y2={oy} stroke={C.line} />
        <line x1={ox} x2={ox} y1={oy - 80} y2={oy + 80} stroke={C.line} />
        <Vec x1={ox} y1={oy} x2={ox + gA[0] * sc} y2={oy - gA[1] * sc} color={C.ink} width={2} />
        <Vec x1={ox} y1={oy} x2={ox + gB[0] * sc} y2={oy - gB[1] * sc} color={dot < 0 ? C.lemonD : col} width={2} />
        <Sub x={ox + gA[0] * sc + 6} y={oy - gA[1] * sc - 6} base="g" sub="A" color={C.ink} />
        <Sub x={ox + gB[0] * sc * 1.25} y={oy - gB[1] * sc * 1.25 - 4} base="g" sub="B" anchor="middle" color={dot < 0 ? C.lemonD : col} />
        <Axes f={f} yTicks={[[-0.2, '−0.2'], [0, '0'], [0.2, '+0.2']]} grid />
        <Label x={f.x - 30} y={f.y - 14} s={t(b('A 的损失变化', 'Change in A’s loss'))} anchor="start" />
        <Bar f={f} x={1} v={dL} w={0.6} color={dL > 0 ? C.lemonD : col} />
        <Label x={px(f, 1)} y={f.y + f.h + 12} s={dL > 0 ? t(b('增加：被覆盖', 'up: overwritten')) : t(b('减少：互相帮助', 'down: helps'))} size={10} color={dL > 0 ? C.lemonD : col} />
      </Svg>
      <FigSlider label={t(b('$\\mathbf{g}_B$ 的方向', 'Direction of $\\mathbf{g}_B$'))} value={deg} min={0} max={180} step={1} onChange={setDeg}
        readout={readout(deg)} widest={[0, 135, 160].map(readout)} />
    </>
  )
}

/** EWC with two parameters, interactive: A's optimum at the origin with importance F = (10, 0.1); B alone wants (0.5, 0.5).
 * With L_B = ½‖θ − θ_B‖², the optimum is θ_i = 0.5 / (1 + λF_i). Drag λ. Starts at the worked example's λ = 1. */
function EwcPlot({ t }: FigProps) {
  const [lam, setLam] = useState(1)
  const col = SIDE_COLOR.comp
  const F = [10, 0.1]
  const opt = (l: number) => [0.5 / (1 + l * F[0]), 0.5 / (1 + l * F[1])]
  const [o1, o2] = opt(lam)
  const f: Frame = { x: 44, y: 24, w: 150, h: 150, xr: [-0.1, 0.6], yr: [-0.1, 0.6] }
  const sx = f.w / 0.7
  const path = Array.from({ length: 81 }, (_, i) => { const p = opt(Math.pow(10, -2 + (i / 80) * 4)); return [px(f, p[0]), py(f, p[1])] as [number, number] })
  const readout = (l: number) => { const p = opt(l); return t(b(`$\\lambda = ${l.toFixed(1)}$：$\\theta = (${p[0].toFixed(2)}, ${p[1].toFixed(2)})$`, `$\\lambda = ${l.toFixed(1)}$: $\\theta = (${p[0].toFixed(2)}, ${p[1].toFixed(2)})$`)) }
  return (
    <>
      <Svg id="f09mc1" w={380} h={208} label={t(b('EWC：λ 越大，解越靠近 A 的最优点，而且主要靠移动对 A 不重要的参数', 'EWC: the larger λ, the closer the solution stays to A’s optimum, moving mainly the parameter A does not need'))}>
        <defs><clipPath id="f09mc1-clip"><rect x={f.x} y={f.y} width={f.w} height={f.h} /></clipPath></defs>
        <g clipPath="url(#f09mc1-clip)">
          {[0.004, 0.02, 0.06].map((cst) => <ellipse key={cst} cx={px(f, 0)} cy={py(f, 0)} rx={Math.sqrt((2 * cst) / F[0]) * sx} ry={Math.sqrt((2 * cst) / F[1]) * sx} fill="none" stroke={C.ink} strokeOpacity={0.35} />)}
          {[0.1, 0.2, 0.3].map((rad) => <circle key={rad} cx={px(f, 0.5)} cy={py(f, 0.5)} r={rad * sx} fill="none" stroke={col} strokeOpacity={0.35} />)}
          <Path pts={path} color={C.lemonD} width={1.2} dashed />
        </g>
        <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5']]} yTicks={[[0, '0'], [0.5, '0.5']]} xLabel={t(b('参数 1（对 A 重要）', 'Parameter 1 (A needs it)'))} />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('参数 2（对 A 不重要）', 'Parameter 2 (A does not)'))} anchor="start" />
        <circle cx={px(f, 0)} cy={py(f, 0)} r={3.5} fill={C.ink} />
        <circle cx={px(f, 0.5)} cy={py(f, 0.5)} r={3.5} fill={col} />
        <Dot f={f} x={o1} y={o2} color={C.lemonD} r={4.5} />
        <Label x={214} y={44} s={t(b('白点：A 的最优，椭圆是\nEWC 惩罚的等高线', 'White: A’s optimum; ellipses\nare EWC penalty contours'))} anchor="start" size={10} color={C.ink} />
        <Label x={214} y={86} s={t(b('蓝点：只学 B 的最优，\n圆是 B 的损失', 'Blue: B alone; circles\nare B’s loss'))} anchor="start" size={10} color={col} />
        <Label x={214} y={128} s={t(b('黄点：两者合起来的解；\n虚线是 λ 从 0 到很大的轨迹', 'Yellow: the joint solution;\ndashed: its path as λ grows'))} anchor="start" size={10} color={C.lemonD} />
      </Svg>
      <FigSlider label="$\lambda$" value={lam} min={0} max={10} step={0.1} onChange={setLam}
        readout={readout(lam)} widest={[1, 10].map(readout)} />
    </>
  )
}

/** Reservoir sampling with a buffer of M = 1000: sample n is kept with probability M / n. */
function ReservoirPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 40, y: 30, w: 300, h: 124, xr: [0, 10000], yr: [0, 1] }
  const keep = (n: number) => Math.min(1, 1000 / Math.max(n, 1))
  return (
    <Svg id="f09mc2" w={380} h={196} label={t(b('蓄水池抽样：第 n 个样本被留下的概率是 M / n', 'Reservoir sampling: sample n is kept with probability M / n'))}>
      <Axes f={f} xTicks={[[0, '0'], [1000, '1k'], [2000, '2k'], [5000, '5k'], [10000, '10k']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('见到的第 n 个样本', 'Sample number n'))} yLabel={t(b('被留在缓冲区的概率', 'Chance of being kept'))} grid />
      <Path pts={trace(f, keep, 0, 10000, 400)} color={col} />
      <Dot f={f} x={2000} y={0.5} color={col} />
      <Dot f={f} x={10000} y={0.1} color={col} />
      <Label x={px(f, 2000) + 8} y={py(f, 0.5) - 6} s="0.5" anchor="start" size={10} color={col} />
      <Label x={px(f, 10000)} y={py(f, 0.1) - 12} s="0.1" size={10} color={col} />
      <Label x={px(f, 1250)} y={py(f, 0.95)} s={t(b('前 1000 个全部留下', 'first 1000 all kept'))} anchor="start" size={10} />
    </Svg>
  )
}

export const CONTINUAL_FIGS: TopicFigs = {
  arch: { brain: ComplementaryArch, ai: ContinualMethodsArch },
  math: {
    bio: {
      0: { Fig: InterferencePlot, cap: b('拖动滑块改变两段记忆输入的重叠（两个输入长度相同，重叠取它们夹角的余弦）。回忆 A 时得到 $\\mathbf{y}_A$ 加上「重叠 × $\\mathbf{y}_B$」。默认 $0.5$ 对应小例子的第二种情况：B 以一半的强度混进来。拖到 $0$，两个输入互相垂直，完全没有干扰，这就是稀疏编码要达到的效果。', 'Drag the slider to change the overlap of the two memories’ inputs (equal length; the overlap is the cosine of their angle). Recalling A returns $\\mathbf{y}_A$ plus overlap $\\times\\, \\mathbf{y}_B$. The default $0.5$ is the worked example’s second case: B comes back at half strength. At $0$ the inputs are perpendicular and nothing interferes, which is what sparse coding aims for.') },
      1: { Fig: CascadePlot, cap: b('小例子的两个状态：学习把快变量 $u_1$ 推到 $1$，它随后流向容量大十倍的慢变量 $u_2$。$u_1$ 很快下降，$u_2$ 缓慢上升，两者最终都停在 $1/11 \\approx 0.09$。这部分留在慢变量里的记忆，不会再随 $u_1$ 的快速波动消失。', 'The worked example’s two states: learning pushes the fast variable $u_1$ to $1$, and it flows into the slow variable $u_2$, ten times larger. $u_1$ falls quickly, $u_2$ rises slowly, and both settle at $1/11 \\approx 0.09$. The memory kept in the slow variable no longer vanishes with fast swings of $u_1$.') },
    },
    comp: {
      0: { Fig: GradInterferencePlot, cap: b('拖动滑块转动 $\\mathbf{g}_B$，$\\mathbf{g}_A = (1, 0.5)$ 固定，$\\eta = 0.1$。默认是小例子的 $\\mathbf{g}_B = (-1, 1)$：点积 $-0.5$，学 B 的每一步让 A 的损失增加约 $0.05$。两个梯度夹角小于 $90°$ 时点积为正，学 B 反而帮助 A；超过 $90°$ 才互相覆盖。GEM 正是在点积为负时修改 $\\mathbf{g}_B$ 的方向。', 'Drag the slider to turn $\\mathbf{g}_B$; $\\mathbf{g}_A = (1, 0.5)$ stays fixed and $\\eta = 0.1$. The default is the worked example’s $\\mathbf{g}_B = (-1, 1)$: the dot product is $-0.5$, so each step on B raises A’s loss by about $0.05$. Within $90°$ of each other the dot product is positive and learning B helps A; only beyond $90°$ do they overwrite. GEM changes the direction of $\\mathbf{g}_B$ exactly when the dot product is negative.') },
      1: { Fig: EwcPlot, cap: b('拖动滑块改变 $\\lambda$。A 的最优点在原点，参数 1 对 A 重要（$F = 10$），所以惩罚的等高线在这个方向很窄；只学 B 想把两个参数都移到 $0.5$。$\\lambda = 1$ 时解为 $(0.05, 0.45)$：参数 1 几乎不动，学习主要靠参数 2 完成。$\\lambda = 0$ 时退回只学 B，$\\lambda$ 很大时两者都被拉回 A。', 'Drag the slider to change $\\lambda$. A’s optimum is at the origin and parameter 1 matters to A ($F = 10$), so the penalty contours are narrow in that direction; B alone wants both parameters at $0.5$. At $\\lambda = 1$ the solution is $(0.05, 0.45)$: parameter 1 barely moves and learning happens through parameter 2. At $\\lambda = 0$ it is B alone; at large $\\lambda$ both are pulled back to A.') },
      2: { Fig: ReservoirPlot, cap: b('缓冲区容量 $M = 1000$。前 1000 个样本全部留下，之后第 $n$ 个样本以 $M/n$ 的概率替换缓冲区中随机的一个：第 $2000$ 个是 $0.5$，第 $10000$ 个是 $0.1$。这样无论数据流多长，缓冲区始终是至今所有样本的均匀抽样。', 'With a buffer of $M = 1000$, the first 1000 samples are all kept; after that, sample $n$ replaces a random one with probability $M/n$: $0.5$ for sample $2000$, $0.1$ for sample $10000$. However long the stream, the buffer stays a uniform sample of everything seen so far.') },
    },
  },
}
