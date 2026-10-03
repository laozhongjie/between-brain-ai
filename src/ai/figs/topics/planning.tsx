import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** The hippocampus previews paths, orbitofrontal cortex and ventral striatum value them, prefrontal cortex chooses against habits; replay caches plans offline. */
function PlanningBrainArch({ t }: FigProps) {
  const id = 'f20b'
  return (
    <Svg id={id} w={380} h={314} label={t(b('海马预演与前额叶规划的结构与信息流：当前位置与目标、海马预演、评估、前额叶选择与剪枝、与习惯竞争、离线规划', 'Planning: current place and goal, hippocampal preview, evaluation, prefrontal choice and pruning, competition with habits, offline planning'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('海马与前额叶', 'Hippocampus and prefrontal cortex'))} sub={t(b('当前位置与目标', 'current place and goal'))} size={10.5} />
      <Mod x={14} y={72} w={170} h={40} side="bio" label={t(b('海马预演', 'Hippocampal preview'))} sub={t(b('每 125 毫秒扫过一条路径', 'sweeps one path per 125 ms'))} size={10.5} />
      <Mod x={196} y={72} w={170} h={40} side="bio" label={t(b('眶额皮层与腹侧纹状体', 'Orbitofrontal, ventral striatum'))} sub={t(b('评估每条路径的价值', 'value of each path'))} size={10} />
      <Mod x={14} y={134} w={352} h={40} side="bio" label={t(b('前额叶选择与剪枝', 'Prefrontal choice and pruning'))} sub={t(b('选出动作序列，放弃看起来糟糕的分支', 'picks an action sequence, drops bad-looking branches'))} size={10.5} />
      <Mod x={14} y={196} w={170} h={40} side="bio" label={t(b('动作', 'Action'))} sub={t(b('新情况：规划主导', 'new situation: planning wins'))} size={10.5} />
      <Mod x={196} y={196} w={170} h={40} side="bio" label={t(b('背外侧纹状体', 'Dorsolateral striatum'))} sub={t(b('习惯：熟悉时主导', 'habits: win when familiar'))} size={10.5} />
      <Mod x={14} y={260} w={352} h={40} side="bio" label={t(b('休息与睡眠中的回放', 'Replay in rest and sleep'))} sub={t(b('预先算好有用的路线', 'works out useful routes in advance'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 72]]} />
      <Flow id={id} side="bio" pts={[[184, 92], [196, 92]]} />
      <Flow id={id} side="bio" pts={[[281, 112], [281, 134]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[40, 134], [40, 112]]} label={t(b('换一条', 'next path'))} lx={24} ly={0} />
      <Flow id={id} side="bio" pts={[[99, 174], [99, 196]]} />
      <Flow id={id} side="bio" pts={[[196, 216], [184, 216]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 260], [281, 236]]} label={t(b('缓存进策略', 'cached into the policy'))} lx={-52} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={72} n={2} side="bio" />
      <Num x={196} y={72} n={3} side="bio" />
      <Num x={14} y={134} n={4} side="bio" />
      <Num x={196} y={196} n={5} side="bio" />
      <Num x={14} y={260} n={6} side="bio" />
    </Svg>
  )
}

/** Monte Carlo tree search: the network gives priors and values, the search descends, expands a leaf and backs up its value; self-play trains the network. */
function MctsArch({ t }: FigProps) {
  const id = 'f20c'
  const node = (cx: number, cy: number, label = '') => <Var cx={cx} cy={cy} r={11} side="comp" label={label} />
  return (
    <Svg id={id} w={380} h={268} label={t(b('搜索与学习型规划的结构与信息流：网络评估、沿树选择、扩展叶节点、回传、选择走法', 'Search-based planning: network evaluation, selection down the tree, leaf expansion, backup, move choice'))}>
      <Mod x={14} y={14} w={170} h={40} side="comp" label={t(b('神经网络', 'Neural network'))} sub={t(b('走法的先验与局面的价值', 'move priors, position value'))} size={10.5} />
      <Region x={6} y={72} w={252} h={182} side="comp" label={t(b('搜索树', 'Search tree'))} />
      {/* edges first, the chosen path thick */}
      <Flow id={id} side="comp" head="none" pts={[[124, 115], [80, 145]]} />
      <Flow id={id} side="comp" head="none" fast pts={[[131, 117], [131, 143]]} />
      <Flow id={id} side="comp" head="none" pts={[[140, 113], [198, 147]]} />
      <Flow id={id} side="comp" head="none" pts={[[125, 165], [106, 191]]} />
      <Flow id={id} side="comp" head="none" fast pts={[[137, 165], [156, 191]]} />
      {node(131, 106, t(b('根', 'root')))}
      {node(76, 154)}
      {node(131, 154)}
      {node(208, 154)}
      {node(104, 202)}
      {node(158, 202, t(b('新', 'new')))}
      <T x={178} y={214} s={t(b('网络评估', 'network value'))} size={9} color={C.dim} anchor="start" />
      <Flow id={id} side="comp" kind="fb" pts={[[166, 193], [142, 114]]} curve={[168, 150]} label={t(b('回传', 'backup'))} lx={14} ly={0} />
      <Mod x={268} y={110} w={100} h={46} side="comp" label={t(b('选择走法', 'Choose a move'))} sub={t(b('访问最多的', 'most visited'))} size={10.5} />
      <Gap x={268} y={186} w={100} h={56} label={t(b('大语言模型：\n每步之后的\n状态检查', 'LLMs: checking\nthe state after\neach step'))} />

      <Flow id={id} side="comp" pts={[[99, 54], [99, 84], [131, 84], [131, 95]]} label={t(b('先验、价值', 'priors, value'))} at={1} ly={-6} lx={22} />
      <Flow id={id} side="comp" pts={[[258, 133], [268, 133]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[318, 110], [318, 34], [184, 34]]} label={t(b('自我对弈训练', 'self-play training'))} at={1} ly={-7} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={116} y={130} n={2} side="comp" />
      <Num x={150} y={226} n={3} side="comp" />
      <Num x={186} y={118} n={4} side="comp" />
      <Num x={268} y={110} n={5} side="comp" />
      <Num x={268} y={186} n={6} side="comp" />
    </Svg>
  )
}

/** Model-based planning on the worked example's two-step maze (γ = 1), interactive: drag the better reward behind the
 * left branch; Q(left) = 0 + max(that, 1 or less), Q(right) = 2 + 0, and the choice flips at once. Starts at 3. */
function TreePlanPlot({ t }: FigProps) {
  const [v, setV] = useState(3)
  const col = SIDE_COLOR.bio
  const other = Math.min(1, v)
  const qL = Math.max(v, other), qR = 2
  const left = qL > qR
  const node = (x: number, y: number, s: string, on: boolean, sub?: string) => (
    <g>
      <rect x={x - 32} y={y - 14} width={64} height={28} rx={7} fill={on ? C.pink : C.ghost} stroke={on ? col : C.line} />
      <text x={x} y={sub ? y - 4 : y} fontSize={10} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{s}</text>
      {sub && <text x={x} y={y + 7} fontSize={9} textAnchor="middle" dominantBaseline="middle" fill={on ? col : C.dim}>{sub}</text>}
    </g>
  )
  const edge = (x1: number, y1: number, x2: number, y2: number, on: boolean, s: string) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? col : C.line} strokeWidth={on ? 2 : 1} />
      <Label x={(x1 + x2) / 2 + (x2 < x1 ? -8 : 8)} y={(y1 + y2) / 2} s={s} anchor={x2 < x1 ? 'end' : 'start'} size={9.5} color={on ? col : C.dim} />
    </g>
  )
  const readout = (r: number) => { const q = Math.max(r, Math.min(1, r)); return t(b(`左边最好 ${r.toFixed(1)}：$Q$(左) = ${q.toFixed(1)}，$Q$(右) = 2，选${q > 2 ? '左' : '右'}`, `best on the left ${r.toFixed(1)}: $Q$(left) = ${q.toFixed(1)}, $Q$(right) = 2, go ${q > 2 ? 'left' : 'right'}`)) }
  return (
    <>
      <Svg id="f20mb0" w={380} h={196} label={t(b('基于模型的规划：奖赏一变，只需在模型里重算，选择立刻改变', 'Model-based planning: when a reward changes, recomputing in the model changes the choice at once'))}>
        {edge(190, 40, 100, 96, left, t(b('左 +0', 'left +0')))}
        {edge(190, 40, 280, 96, !left, t(b('右 +2', 'right +2')))}
        {edge(100, 110, 50, 158, left && v >= other, `+${v.toFixed(1)}`)}
        {edge(100, 110, 150, 158, left && other > v, `+${other.toFixed(1)}`)}
        {edge(280, 110, 280, 158, !left, '+0')}
        {node(190, 40, t(b('起点', 'start')), true)}
        {node(100, 100, t(b('左', 'left')), left, `Q = ${qL.toFixed(1)}`)}
        {node(280, 100, t(b('右', 'right')), !left, 'Q = 2.0')}
        {node(50, 168, t(b('结局', 'end')), left && v >= other)}
        {node(150, 168, t(b('结局', 'end')), left && other > v)}
        {node(280, 168, t(b('结局', 'end')), !left)}
      </Svg>
      <FigSlider label={t(b('左边最好的奖赏', 'Best reward on the left'))} value={v} min={0} max={4} step={0.1} onChange={setV} readout={readout(v)} widest={[3, 0.5].map(readout)} />
    </>
  )
}

/** Pruning with three choices per step, interactive: drag the share ρ of branches kept at each level; endings to consider
 * grow as b^d without pruning and (ρb)^d with it. Starts at the worked example's ρ = 0.5. */
function PruningPlot({ t }: FigProps) {
  const [rho, setRho] = useState(0.5)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 48, y: 30, w: 270, h: 124, xr: [1, 8], yr: [0, 4] }
  const lg = (v: number) => Math.log10(Math.max(v, 1))
  const readout = (r: number) => t(b(`保留 ${Math.round(r * 100)}%：5 步约 ${Math.pow(3 * r, 5).toFixed(1)} 个结局，不剪枝 243 个`, `keep ${Math.round(r * 100)}%: about ${Math.pow(3 * r, 5).toFixed(1)} endings at 5 steps vs 243`))
  return (
    <>
      <Svg id="f20mb1" w={380} h={198} label={t(b('剪枝：每层只保留一部分分支，要考虑的结局数指数级减少', 'Pruning: keeping only part of the branches at each level cuts the endings to consider exponentially'))}>
        <Axes f={f} xTicks={[[1, '1'], [3, '3'], [5, '5'], [8, '8']]} yTicks={[[0, '1'], [1, '10'], [2, '100'], [3, '1000'], [4, '10⁴']]} xLabel={t(b('向前想的步数 d', 'Steps ahead d'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('要考虑的结局数（对数）', 'Endings to consider (log)'))} anchor="start" />
        <Path pts={trace(f, (d) => lg(Math.pow(3, d)), 1, 8, 80)} color={C.dim} />
        <Path pts={trace(f, (d) => lg(Math.pow(3 * rho, d)), 1, 8, 80)} color={col} />
        <Dot f={f} x={5} y={lg(243)} color={C.dim} />
        <Dot f={f} x={5} y={lg(Math.pow(3 * rho, 5))} color={col} r={4} />
        <Label x={f.x + f.w + 6} y={py(f, lg(Math.pow(3, 8)))} s={t(b('不剪枝', 'no pruning'))} anchor="start" size={10} />
        {rho < 0.9 && <Label x={f.x + f.w + 6} y={Math.max(py(f, lg(Math.pow(3 * rho, 8))), py(f, lg(Math.pow(3, 8))) + 14)} s={t(b('剪枝', 'pruned'))} anchor="start" size={10} color={col} />}
      </Svg>
      <FigSlider label={t(b('每层保留', 'Kept per level'))} value={rho} min={0.34} max={1} step={0.01} onChange={setRho} readout={readout(rho)} widest={[1, 0.99, 0.5].map(readout)} />
    </>
  )
}

/** PUCT on the worked example (100 simulations, c = 1), interactive: move A fixed at Q = 0.6, P = 0.3, N = 50; drag how
 * often move B (Q = 0.5, P = 0.4) has been tried. Each bar is Q plus the exploration bonus. Starts at N(B) = 5. */
function PuctPlot({ t }: FigProps) {
  const [nb, setNb] = useState(5)
  const col = SIDE_COLOR.comp
  const bonus = (p: number, n: number) => (p * 10) / (1 + n)
  const A = { q: 0.6, u: bonus(0.3, 50) }, B = { q: 0.5, u: bonus(0.4, nb) }
  const pickB = B.q + B.u > A.q + A.u
  const f: Frame = { x: 44, y: 34, w: 160, h: 124, xr: [0.4, 2.6], yr: [0, 4.6] }
  const stack = (x: number, m: { q: number; u: number }, on: boolean) => (
    <g>
      <Bar f={f} x={x} v={m.q} w={0.55} color={on ? col : C.dim} />
      <rect x={px(f, x - 0.275)} y={py(f, m.q + m.u)} width={px(f, x + 0.275) - px(f, x - 0.275)} height={py(f, m.q) - py(f, m.q + m.u)} fill={C.lemonD} fillOpacity={on ? 0.45 : 0.2} stroke={C.lemonD} strokeOpacity={on ? 1 : 0.5} />
      <Label x={px(f, x)} y={py(f, m.q + m.u) - 8} s={(m.q + m.u).toFixed(2)} size={10} color={on ? C.ink : C.dim} />
    </g>
  )
  const readout = (n: number) => { const sb = 0.5 + bonus(0.4, n); return t(b(`B 已试 ${n} 次：A ${(A.q + A.u).toFixed(2)}，B ${sb.toFixed(2)}，选 ${sb > A.q + A.u ? 'B' : 'A'}`, `B tried ${n}×: A ${(A.q + A.u).toFixed(2)}, B ${sb.toFixed(2)}, pick ${sb > A.q + A.u ? 'B' : 'A'}`)) }
  return (
    <>
      <Svg id="f20mc0" w={380} h={200} label={t(b('PUCT：试得少的走法有更大的探索加分，试多了加分变小，搜索回到看起来更好的走法', 'PUCT: rarely tried moves get a larger exploration bonus that shrinks with visits, and search returns to the move that looks best'))}>
        <Axes f={f} xTicks={[[1, 'A'], [2, 'B']]} yTicks={[[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4']]} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('PUCT 得分', 'PUCT score'))} anchor="start" />
        {stack(1, A, !pickB)}
        {stack(2, B, pickB)}
        <rect x={226} y={60} width={10} height={10} fill={col} fillOpacity={0.35} stroke={col} />
        <Label x={242} y={65} s={t(b('Q：目前的平均结果', 'Q: average result so far'))} anchor="start" size={10} />
        <rect x={226} y={84} width={10} height={10} fill={C.lemonD} fillOpacity={0.45} stroke={C.lemonD} />
        <Label x={242} y={89} s={t(b('探索加分：先验高、\n试得少就大', 'bonus: large for high\nprior, few tries'))} anchor="start" size={10} />
        <Label x={226} y={134} s={t(b('A：Q 0.6，先验 0.3，试 50 次\nB：Q 0.5，先验 0.4', 'A: Q 0.6, prior 0.3, 50 tries\nB: Q 0.5, prior 0.4'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label={t(b('B 已试的次数', 'Times B tried'))} value={nb} min={0} max={50} step={1} onChange={setNb} readout={readout(nb)} widest={[0, 10, 25].map(readout)} />
    </>
  )
}

export const PLANNING_FIGS: TopicFigs = {
  arch: { brain: PlanningBrainArch, ai: MctsArch },
  math: {
    bio: {
      0: { Fig: TreePlanPlot, cap: b('小例子的两步迷宫，$\\gamma = 1$。拖动滑块改变左边之后最好的奖赏（默认 $3$）。向左的价值等于它，向右固定为 $2 + 0 = 2$；一旦左边低于 $2$，最优选择立刻变成右，不需要再走一遍迷宫。这就是「基于模型」的标志。', 'The worked example’s two-step maze, with $\\gamma = 1$. Drag the slider to change the best reward behind the left branch (default $3$). The left branch is worth that much; the right is fixed at $2 + 0 = 2$. As soon as the left drops below $2$, the best choice switches to the right without walking the maze again: the mark of model-based control.') },
      1: { Fig: PruningPlot, cap: b('每步 3 个选择，纵轴为对数。拖动滑块改变每层保留的比例。不剪枝时向前想 5 步要考虑 $3^5 = 243$ 个结局；默认每层保留一半，只剩约 $1.5^5 \\approx 7.6$ 个。步数越多，差距越大，代价是被剪掉的分支里偶尔藏着更好的结果。', 'Three choices per step, on a log axis. Drag the slider to change the share kept at each level. Without pruning, looking 5 steps ahead means $3^5 = 243$ endings; keeping half per level, the default, leaves about $1.5^5 \\approx 7.6$. The deeper the search, the larger the gap, at the cost of sometimes cutting a better outcome.') },
    },
    comp: {
      0: { Fig: PuctPlot, cap: b('小例子：总共模拟 100 次，$c = 1$。蓝色是目前的平均结果 $Q$，黄色是探索加分。拖动滑块改变 B 已试的次数：默认 5 次时 B 的加分很大，得分 $1.17$ 高于 A 的 $0.66$，这次去探索 B；试到约 25 次后加分变小，选择回到 A。', 'The worked example: 100 simulations in all, $c = 1$. Blue is the average result $Q$ so far, yellow the exploration bonus. Drag the slider to change how often B has been tried. At the default 5 tries B’s bonus is large and its score, $1.17$, beats A’s $0.66$, so this simulation explores B; after about 25 tries the bonus has shrunk and the choice returns to A.') },
    },
  },
}
