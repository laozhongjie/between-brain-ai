import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store } from '../grammar'
import { Axes, Bar, FigSlider, Label, Ref, SIDE_COLOR, px, py, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Sleep consolidation: hippocampal ripples replay into neocortex in step with thalamic spindles and slow oscillations. */
function SleepReplayArch({ t }: FigProps) {
  const id = 'f15b'
  return (
    <Svg id={id} w={380} h={300} label={t(b('睡眠回放与系统巩固的结构与信息流', 'Structure and information flow of sleep replay and systems consolidation'))}>
      <Mod x={14} y={14} w={352} h={32} side="bio" label={t(b('清醒时编码', 'Encoding while awake'))} sub={t(b('位置细胞按顺序放电，突触被标记', 'place cells fire in order, synapses tagged'))} />
      <Region x={6} y={64} w={368} h={170} side="bio" label={t(b('深睡', 'Deep sleep'))} />
      <Mod x={18} y={90} w={150} h={40} side="bio" label={t(b('新皮层', 'Neocortex'))} sub={t(b('慢振荡，约每秒一次', 'slow oscillation, ~1 per second'))} />
      <Mod x={212} y={90} w={150} h={40} side="bio" label={t(b('丘脑', 'Thalamus'))} sub={t(b('纺锤波，12 到 15 赫兹', 'spindles, 12 to 15 Hz'))} />
      <Store x={110} y={158} w={160} h={62} side="bio" label={t(b('海马', 'Hippocampus'))} sub={t(b('涟漪中压缩回放', 'compressed replay in ripples'))} />
      <Mod x={14} y={250} w={170} h={40} side="bio" label={t(b('长期记忆', 'Long-term memory'))} sub={t(b('与已有知识合并', 'merged with prior knowledge'))} />
      <Mod x={200} y={250} w={166} h={40} side="bio" label={t(b('下调与遗忘', 'Downscaling, forgetting'))} sub={t(b('整体缩小，弱痕迹移除', 'scaled down, weak traces removed'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[190, 46], [190, 158]]} />
      <Flow id={id} side="bio" fast head="read" pts={[[130, 158], [130, 130]]} label={t(b('回放', 'replay'))} lx={-22} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[244, 130], [244, 158]]} label={t(b('与涟漪对齐', 'aligns with ripples'))} lx={44} ly={0} />
      <Flow id={id} side="bio" pts={[[40, 130], [40, 250]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[283, 250], [283, 234]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={18} y={90} n={2} side="bio" />
      <Num x={212} y={90} n={3} side="bio" />
      <Num x={110} y={160} n={4} side="bio" />
      <Num x={14} y={250} n={5} side="bio" />
      <Num x={200} y={250} n={6} side="bio" />
    </Svg>
  )
}

/** Experience replay: the agent fills a buffer, samples it to train, adds generated experience and acts again. */
function ExperienceReplayArch({ t }: FigProps) {
  const id = 'f15c'
  return (
    <Svg id={id} w={380} h={294} label={t(b('经验回放与模型更新的结构与信息流', 'Structure and information flow of experience replay and model updating'))}>
      <Mod x={14} y={14} w={150} h={36} side="comp" label={t(b('环境交互', 'Environment'))} sub={t(b('状态、动作、奖赏', 'state, action, reward'))} />
      <Store x={14} y={80} w={150} h={64} side="comp" label={t(b('回放缓冲区', 'Replay buffer'))} sub={t(b('数十万到数百万条', '10⁵ to 10⁶ experiences'))} />
      <Mod x={14} y={172} w={150} h={36} side="comp" label={t(b('抽样', 'Sampling'))} sub={t(b('随机或按误差优先', 'random or by error'))} />
      <Mod x={216} y={80} w={150} h={44} side="comp" label={t(b('生成与想象', 'Generate, imagine'))} sub={t(b('生成模型或世界模型', 'generative or world model'))} />
      <Mod x={216} y={172} w={150} h={36} side="comp" label={t(b('网络更新', 'Network update'))} sub={t(b('同一条经历反复使用', 'each experience reused'))} />
      <Gap x={216} y={240} w={150} h={40} label={t(b('精确遗忘', 'Precise forgetting'))} />

      <Flow id={id} side="comp" pts={[[89, 50], [89, 80]]} />
      <Flow id={id} side="comp" head="read" pts={[[89, 144], [89, 172]]} />
      <Flow id={id} side="comp" pts={[[164, 190], [216, 190]]} />
      <Flow id={id} side="comp" pts={[[291, 124], [291, 172]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[366, 190], [374, 190], [374, 32], [164, 32]]} label={t(b('按新策略行动', 'act with new policy'))} at={2} ly={-7} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={82} n={2} side="comp" />
      <Num x={14} y={172} n={3} side="comp" />
      <Num x={216} y={172} n={4} side="comp" />
      <Num x={216} y={80} n={5} side="comp" />
      <Num x={216} y={240} n={6} side="comp" />
    </Svg>
  )
}

/** Prioritized replay on a six-state corridor just after the reward at the end is found: only the step before the goal
 * has gain, so it is replayed first, then the one before it, and so on: reverse replay. */
function ReplayOrderPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const n = 6, w = 46, gap = 10, x0 = 22, y0 = 92
  const cx = (i: number) => x0 + i * (w + gap) + w / 2
  const gain = [0, 0, 0, 0, 1, 0], need = [0.8, 0.8, 0.8, 0.8, 0.8, 0]
  return (
    <Svg id="f15mb0" w={380} h={200} label={t(b('优先回放：刚发现奖赏时，只有终点前一步有收益，于是从终点倒着回放', 'Prioritized replay: just after the reward is found only the step before the goal has gain, so replay runs backward from the goal'))}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={y0} width={w} height={30} rx={6} fill={i === n - 1 ? C.lemon : C.pink} stroke={i === n - 1 ? C.lemonD : col} strokeOpacity={0.7} />
          <text x={cx(i)} y={y0 + 15} fontSize={10} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{i === n - 1 ? t(b('奖赏', 'reward')) : `S${i + 1}`}</text>
        </g>
      ))}
      {[4, 3, 2, 1, 0].map((i, k) => (
        <g key={i} opacity={1 - k * 0.15}>
          <path d={`M ${cx(i + 1) - 6} ${y0 - 6} Q ${(cx(i) + cx(i + 1)) / 2} ${y0 - 30} ${cx(i) + 6} ${y0 - 6}`} fill="none" stroke={col} strokeWidth={1.6} />
          <circle cx={(cx(i) + cx(i + 1)) / 2} cy={y0 - 24} r={8} fill={C.white} stroke={col} />
          <text x={(cx(i) + cx(i + 1)) / 2} y={y0 - 24} fontSize={9.5} textAnchor="middle" dominantBaseline="middle" fill={col}>{k + 1}</text>
        </g>
      ))}
      <Label x={190} y={30} s={t(b('回放顺序：从终点倒推回起点（倒放）', 'Replay order: backward from the goal (reverse replay)'))} color={col} size={10} />
      {[[t(b('收益', 'Gain')), gain], [t(b('需要', 'Need')), need], [t(b('乘积', 'Product')), gain.map((g, i) => g * need[i])]].map(([s, vs], r) => (
        <g key={r}>
          <Label x={x0 - 4} y={142 + r * 20} s={s as string} anchor="start" size={9.5} />
          {(vs as number[]).map((v, i) => i < n - 1 && <rect key={i} x={cx(i) - 14} y={148 + r * 20 - v * 12} width={28} height={Math.max(1, v * 12)} fill={r === 2 ? col : C.dim} fillOpacity={0.6} />)}
        </g>
      ))}
      <Label x={cx(5)} y={162} s={t(b('此刻只有 S5\n的乘积不为 0', 'only S5 has a\nnonzero product'))} size={9.5} />
    </Svg>
  )
}

/** Downscaling the worked example's synapses (4, 2, 0.5) to a total of 5, then removing what falls below θ = 0.4. */
function DownscalePlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const before = [4, 2, 0.5], k = 5 / 6.5, after = before.map((v) => v * k)
  const f: Frame = { x: 40, y: 30, w: 250, h: 124, xr: [0.4, 3.6], yr: [0, 4.4] }
  return (
    <Svg id="f15mb1" w={380} h={196} label={t(b('突触下调：按同一比例缩小，弱到阈值以下的被移除，强弱的比例不变', 'Downscaling: all shrink by one ratio, those below threshold are removed, and the ratio between the rest stays'))}>
      <Axes f={f} xTicks={[[1, '1'], [2, '2'], [3, '3']]} yTicks={[[0, '0'], [2, '2'], [4, '4']]} xLabel={t(b('突触', 'Synapse'))} yLabel={t(b('强度', 'Strength'))} grid />
      <Ref f={f} y={0.4} color={C.lemonD} />
      <Label x={f.x + f.w + 6} y={py(f, 0.4)} s={t(b('阈值 θ = 0.4', 'threshold θ = 0.4'))} anchor="start" size={10} color={C.lemonD} />
      {before.map((v, i) => <Bar key={`a${i}`} f={f} x={i + 0.82} v={v} w={0.3} color={C.dim} />)}
      {after.map((v, i) => <Bar key={`b${i}`} f={f} x={i + 1.18} v={v} w={0.3} color={col} opacity={i === 2 ? 0.35 : 0.85} />)}
      {after.map((v, i) => <Label key={i} x={px(f, i + 1.18)} y={py(f, v) - 8} s={i === 2 ? t(b('移除', 'removed')) : v.toFixed(1)} size={10} color={i === 2 ? C.lemonD : col} />)}
      <rect x={300} y={60} width={10} height={10} fill={C.dim} fillOpacity={0.35} stroke={C.dim} />
      <Label x={316} y={65} s={t(b('睡前', 'before'))} anchor="start" size={10} />
      <rect x={300} y={84} width={10} height={10} fill={col} fillOpacity={0.35} stroke={col} />
      <Label x={316} y={89} s={t(b('睡后', 'after'))} anchor="start" size={10} color={col} />
    </Svg>
  )
}

/** Prioritized experience replay over three experiences with errors 2, 1 and 0.1, interactive: drag α from uniform
 * sampling (0) to sampling in proportion to error (1). Starts at the worked example's α = 1. */
function PerPlot({ t }: FigProps) {
  const [alpha, setAlpha] = useState(1)
  const col = SIDE_COLOR.comp
  const err = [2, 1, 0.1]
  const pOf = (a: number) => { const p = err.map((e) => Math.pow(e, a)); const z = p.reduce((s, v) => s + v, 0); return p.map((v) => v / z) }
  const p = pOf(alpha)
  const f: Frame = { x: 44, y: 34, w: 220, h: 124, xr: [0.4, 3.6], yr: [0, 1] }
  const readout = (a: number) => { const q = pOf(a); return t(b(`$\\alpha = ${a.toFixed(2)}$：${q.map((v) => v.toFixed(2)).join('、')}`, `$\\alpha = ${a.toFixed(2)}$: ${q.map((v) => v.toFixed(2)).join(', ')}`)) }
  return (
    <>
      <Svg id="f15mc0" w={380} h={200} label={t(b('优先经验回放：α 越大，误差大的经历被抽到得越多', 'Prioritized experience replay: the larger α, the more often high-error experiences are drawn'))}>
        <Axes f={f} xTicks={err.map((e, i) => [i + 1, String(e)] as [number, string])} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('经历的误差 |δ|', 'Error |δ| of the experience'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('被抽到的概率', 'Chance of being drawn'))} anchor="start" />
        {p.map((v, i) => <Bar key={i} f={f} x={i + 1} v={v} w={0.55} color={col} opacity={1 - i * 0.25} />)}
        {p.map((v, i) => <Label key={i} x={px(f, i + 1)} y={py(f, v) - 8} s={v.toFixed(2)} size={10} color={col} />)}
        <Label x={282} y={70} s={t(b('α = 0：均匀抽样', 'α = 0: uniform'))} anchor="start" size={10} />
        <Label x={282} y={96} s={t(b('α = 1：按误差\n成比例抽样', 'α = 1: in proportion\nto error'))} anchor="start" size={10} color={col} />
        <Label x={282} y={140} s={t(b(`最大与最小相差\n${Math.pow(20, alpha).toFixed(1)} 倍`, `largest vs smallest:\n${Math.pow(20, alpha).toFixed(1)} ×`))} anchor="start" size={10} color={col} />
      </Svg>
      <FigSlider label="$\alpha$" value={alpha} min={0} max={1} step={0.01} onChange={setAlpha} readout={readout(alpha)} widest={[0.5].map(readout)} />
    </>
  )
}

export const CONSOLIDATION_FIGS: TopicFigs = {
  arch: { brain: SleepReplayArch, ai: ExperienceReplayArch },
  math: {
    bio: {
      0: { Fig: ReplayOrderPlot, cap: b('迷宫简化成一条走廊，刚在终点发现奖赏。此刻只有终点前一步的收益不为 $0$，乘以「以后会经过」的需要，乘积最大，所以先回放它（①）。更新之后，再前一步的收益变大，于是接着回放（②），形成从终点倒推回起点的倒放。', 'The maze simplified to a corridor, just after the reward at the end is found. Right now only the step before the goal has nonzero gain; times the need of passing there again, its product is the largest, so it is replayed first (1). Once updated, the step before it gains, so it comes next (2): reverse replay from the goal back to the start.') },
      1: { Fig: DownscalePlot, cap: b('小例子的三个突触 $(4, 2, 0.5)$ 都乘以 $5/6.5 \\approx 0.77$，变为约 $(3.1, 1.5, 0.38)$。第三个落到阈值 $0.4$ 以下被移除，前两个的比例仍是 $2 : 1$。', 'The worked example’s three synapses $(4, 2, 0.5)$ are all multiplied by $5/6.5 \\approx 0.77$, giving about $(3.1, 1.5, 0.38)$. The third falls below the threshold of $0.4$ and is removed, while the first two keep their $2 : 1$ ratio.') },
    },
    comp: {
      0: { Fig: PerPlot, cap: b('三条经历的误差为 $2$、$1$、$0.1$。拖动滑块改变 $\\alpha$：$\\alpha = 0$ 时三者各 $\\tfrac13$，$\\alpha = 1$ 时按误差成比例，约为 $0.65$、$0.32$、$0.03$，误差最大的被抽到的次数是最小者的 20 倍。', 'Three experiences have errors $2$, $1$ and $0.1$. Drag the slider to change $\\alpha$: at $\\alpha = 0$ each is drawn a third of the time; at $\\alpha = 1$ in proportion to error, about $0.65$, $0.32$ and $0.03$, so the largest is drawn 20 times as often as the smallest.') },
    },
  },
}
