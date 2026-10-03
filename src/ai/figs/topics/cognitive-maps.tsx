import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Mod, Num, Region, Store } from '../grammar'
import { Axes, Bar, FigSlider, Heat, Label, SIDE_COLOR, Vec, px, py, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Content through lateral entorhinal cortex, self-motion through grid cells, bound by hippocampal place cells. */
function CognitiveMapArch({ t }: FigProps) {
  const id = 'f16b'
  return (
    <Svg id={id} w={380} h={282} label={t(b('认知地图的结构与信息流：感觉与自身运动、内嗅皮层、海马位置细胞、前额叶', 'Cognitive map: senses and self-motion, entorhinal cortex, hippocampal place cells, prefrontal cortex'))}>
      <Mod x={14} y={14} w={170} h={36} side="bio" label={t(b('感觉与地标', 'Senses, landmarks'))} sub={t(b('这里有什么', 'what is here'))} />
      <Mod x={196} y={14} w={170} h={36} side="bio" label={t(b('自身运动', 'Self-motion'))} sub={t(b('速度与朝向', 'speed and heading'))} />
      <Region x={6} y={66} w={368} h={74} side="bio" label={t(b('内嗅皮层', 'Entorhinal cortex'))} />
      <Mod x={18} y={88} w={150} h={40} side="bio" label={t(b('外侧', 'Lateral'))} sub={t(b('内容', 'content'))} />
      <Mod x={212} y={88} w={150} h={40} side="bio" label={t(b('网格细胞', 'Grid cells'))} sub={t(b('内侧，路径积分', 'medial, path integration'))} />
      <Mod x={110} y={164} w={160} h={44} side="bio" label={t(b('海马位置细胞', 'Place cells'))} sub={t(b('结构与内容绑定', 'structure bound to content'))} />
      <Mod x={110} y={234} w={160} h={36} side="bio" label={t(b('前额叶', 'Prefrontal cortex'))} sub={t(b('选择路线', 'chooses a route'))} />
      <Mod x={290} y={234} w={76} h={36} side="bio" label={t(b('抽象关系', 'Abstract'))} sub={t(b('概念、社会', 'concepts'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 88]]} />
      <Flow id={id} side="bio" fast pts={[[281, 50], [281, 88]]} />
      <Flow id={id} side="bio" pts={[[93, 128], [93, 186], [110, 186]]} />
      <Flow id={id} side="bio" pts={[[287, 128], [287, 186], [270, 186]]} />
      <Flow id={id} side="bio" pts={[[190, 208], [190, 234]]} label={t(b('预演路径', 'preview paths'))} lx={-34} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[340, 234], [340, 140]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={212} y={88} n={2} side="bio" />
      <Num x={18} y={88} n={3} side="bio" />
      <Num x={110} y={164} n={4} side="bio" />
      <Num x={110} y={234} n={5} side="bio" />
      <Num x={290} y={234} n={6} side="bio" />
    </Svg>
  )
}

/** TEM: actions drive a shared structure code, observations a sensory code, bound in a fast memory that predicts what comes next. */
function TemArch({ t }: FigProps) {
  const id = 'f16c'
  return (
    <Svg id={id} w={380} h={290} label={t(b('TEM 与 Transformer 关系表示的结构与信息流', 'Structure and information flow of relational representations in TEM and transformers'))}>
      <Mod x={14} y={14} w={170} h={34} side="comp" label={t(b('动作', 'Action'))} sub={t(b('向右、向下……', 'right, down …'))} />
      <Mod x={196} y={14} w={170} h={34} side="comp" label={t(b('观察', 'Observation'))} sub={t(b('这一格看到什么', 'what this cell shows'))} />
      <Mod x={14} y={78} w={170} h={44} side="comp" label={t(b('结构模块', 'Structure module'))} sub={t(b('按动作更新抽象位置', 'position updated by action'))} />
      <Mod x={196} y={78} w={170} h={44} side="comp" label={t(b('感觉模块', 'Sensory module'))} sub={t(b('编码观察', 'encodes the observation'))} />
      <Store x={110} y={154} w={160} h={62} side="comp" label={t(b('绑定记忆', 'Binding memory'))} sub={t(b('位置与内容成对', 'position and content pairs'))} />
      <Mod x={110} y={244} w={160} h={36} side="comp" label={t(b('预测下一步', 'Predict next'))} sub={t(b('将会看到什么', 'what will be seen'))} />
      <Mod x={290} y={244} w={76} h={36} side="comp" label="Transformer" sub={t(b('类比', 'analog'))} size={10} />

      <Flow id={id} side="comp" pts={[[99, 48], [99, 78]]} />
      <Flow id={id} side="comp" pts={[[281, 48], [281, 78]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[40, 122], [40, 138], [8, 138], [8, 100], [14, 100]]} />
      <Flow id={id} side="comp" pts={[[93, 122], [93, 184], [110, 184]]} />
      <Flow id={id} side="comp" pts={[[287, 122], [287, 184], [270, 184]]} />
      <Flow id={id} side="comp" head="read" pts={[[190, 216], [190, 244]]} label={t(b('按位置检索', 'retrieve by position'))} lx={-46} ly={0} />
      <Flow id={id} side="comp" kind="fb" head="none" pts={[[328, 244], [328, 206], [270, 206]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={78} n={2} side="comp" />
      <Num x={196} y={78} n={3} side="comp" />
      <Num x={110} y={156} n={4} side="comp" />
      <Num x={110} y={244} n={5} side="comp" />
      <Num x={290} y={244} n={6} side="comp" />
    </Svg>
  )
}

/** A grid cell's firing map in a 1 m box, interactive: three plane waves 60° apart sum to a hexagonal grid; drag the
 * spacing λ. Starts at the worked example's 50 cm. */
function GridCellPlot({ t }: FigProps) {
  const [lam, setLam] = useState(50)
  const col = SIDE_COLOR.bio
  const n = 50, size = 100, cell = 3
  const k = (4 * Math.PI) / (Math.sqrt(3) * lam)
  const us = [0, 1, 2].map((i) => { const a = (i * 60 * Math.PI) / 180; return [k * Math.cos(a), k * Math.sin(a)] })
  const r = (x: number, y: number) => us.reduce((s, [a, c]) => s + Math.cos(a * (x - 50) + c * (y - 50)), 0)
  const vals = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Math.max(0, (r((j + 0.5) * (size / n), (i + 0.5) * (size / n)) + 1.5) / 4.5) ** 2))
  const x0 = 20, y0 = 26
  const readout = (v: number) => t(b(`间距 $\\lambda = ${v}$ 厘米`, `spacing $\\lambda = ${v}$ cm`))
  return (
    <>
      <Svg id="f16mb0" w={380} h={196} label={t(b('网格细胞：三组相隔 60 度的平面波叠加，在环境中形成六边形排列的放电点', 'A grid cell: three plane waves 60 degrees apart add up to firing fields arranged in hexagons'))}>
        <Heat x={x0} y={y0} cell={cell} vals={vals} pos={col} gap={0} />
        <rect x={x0} y={y0} width={n * cell} height={n * cell} fill="none" stroke={C.line} />
        <line x1={x0} x2={x0 + (lam / size) * n * cell} y1={y0 + n * cell + 10} y2={y0 + n * cell + 10} stroke={C.ink} strokeWidth={1.6} />
        <Label x={x0 + (lam / size) * n * cell + 6} y={y0 + n * cell + 10} s={`λ = ${lam} ${t(b('厘米', 'cm'))}`} anchor="start" size={10} color={C.ink} />
        <Label x={190} y={44} s={t(b('1 米 × 1 米的场地，\n颜色越亮放电越多', 'A 1 m × 1 m box;\nbrighter means more firing'))} anchor="start" size={10} />
        {us.map(([a, c], i) => <Vec key={i} x1={230} y1={120} x2={230 + (a / k) * 34} y2={120 - (c / k) * 34} color={C.dim} width={1.2} />)}
        <Label x={276} y={120} s={t(b('三组平面波的方向，\n相隔 60°', 'the three waves’\ndirections, 60° apart'))} anchor="start" size={10} />
        <Label x={190} y={168} s={t(b('相隔一个周期的位置，\n单个细胞分不出来', 'one cell cannot tell apart\nplaces a period apart'))} anchor="start" size={10} />
      </Svg>
      <FigSlider label="$\lambda$" value={lam} min={30} max={80} step={1} onChange={setLam} readout={readout(lam)} widest={[50].map(readout)} />
    </>
  )
}

/** The successor representation on the worked example's one-way corridor A → B → C (ending at C), interactive: drag γ.
 * M(A, ·) = (1, γ, γ²), and with reward at C, V = (γ², γ, 1). Starts at γ = 0.5. */
function SuccessorPlot({ t }: FigProps) {
  const [g, setG] = useState(0.5)
  const col = SIDE_COLOR.bio
  const M = [1, g, g * g], V = [g * g, g, 1]
  const f1: Frame = { x: 40, y: 34, w: 130, h: 120, xr: [0.4, 3.6], yr: [0, 1.1] }
  const f2: Frame = { x: 226, y: 34, w: 130, h: 120, xr: [0.4, 3.6], yr: [0, 1.1] }
  const ticks: [number, string][] = [[1, 'A'], [2, 'B'], [3, 'C']]
  const readout = (v: number) => t(b(`$\\gamma = ${v.toFixed(2)}$：$V(\\mathrm{A}) = ${(v * v).toFixed(2)}$`, `$\\gamma = ${v.toFixed(2)}$: $V(\\mathrm{A}) = ${(v * v).toFixed(2)}$`))
  return (
    <>
      <Svg id="f16mb1" w={380} h={196} label={t(b('后继表征：从 A 出发将来到访各处的折扣次数，乘以奖赏就得到价值', 'Successor representation: discounted future visits from A, times reward, give value'))}>
        <Axes f={f1} xTicks={ticks} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('将来到访的位置', 'Future position'))} grid />
        <Label x={f1.x - 4} y={f1.y - 14} s={t(b('M(A, ·)：从 A 出发', 'M(A, ·): starting at A'))} anchor="start" />
        {M.map((v, i) => <Bar key={i} f={f1} x={i + 1} v={v} w={0.55} color={col} opacity={0.7} />)}
        {M.map((v, i) => <Label key={i} x={px(f1, i + 1)} y={py(f1, v) - 8} s={v.toFixed(2)} size={10} color={col} />)}
        <Axes f={f2} xTicks={ticks} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('出发位置（奖赏在 C）', 'Start (reward at C)'))} grid />
        <Label x={f2.x - 4} y={f2.y - 14} s={t(b('V = M · R', 'V = M · R'))} anchor="start" />
        {V.map((v, i) => <Bar key={i} f={f2} x={i + 1} v={v} w={0.55} color={col} />)}
        {V.map((v, i) => <Label key={i} x={px(f2, i + 1)} y={py(f2, v) - 8} s={v.toFixed(2)} size={10} color={col} />)}
      </Svg>
      <FigSlider label="$\gamma$" value={g} min={0} max={0.95} step={0.01} onChange={setG} readout={readout(g)} widest={[0.5].map(readout)} />
    </>
  )
}

/** Path integration from the worked example: right, down, left, up from (0, 0) brings the position back to the start,
 * where a red door was seen at step 1. */
function PathIntegrationPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const sc = 70, ox = 100, oy = 56
  const P = (x: number, y: number) => [ox + x * sc, oy - y * sc] as const
  const pts: [number, number][] = [[0, 0], [1, 0], [1, -1], [0, -1], [0, 0]]
  return (
    <Svg id="f16mc0" w={380} h={196} label={t(b('路径积分：按动作更新位置，右下左上走一圈回到起点', 'Path integration: the position updates with each action, and right, down, left, up returns to the start'))}>
      {pts.slice(0, 4).map(([x, y], i) => {
        const [x1, y1] = P(x, y), [x2, y2] = P(pts[i + 1][0], pts[i + 1][1])
        const dx = Math.sign(x2 - x1) * 10, dy = Math.sign(y2 - y1) * 10
        return (
          <g key={i}>
            <Vec x1={x1 + dx} y1={y1 + dy} x2={x2 - dx} y2={y2 - dy} color={col} width={1.8} />
            <circle cx={(x1 + x2) / 2 + (dy ? (x === 1 ? 12 : -12) : 0)} cy={(y1 + y2) / 2 + (dx ? (y === 0 ? -12 : 12) : 0)} r={8} fill={C.white} stroke={col} />
            <text x={(x1 + x2) / 2 + (dy ? (x === 1 ? 12 : -12) : 0)} y={(y1 + y2) / 2 + (dx ? (y === 0 ? -12 : 12) : 0)} fontSize={9.5} textAnchor="middle" dominantBaseline="middle" fill={col}>{i + 1}</text>
          </g>
        )
      })}
      {([[0, 0, '(0, 0)'], [1, 0, '(1, 0)'], [1, -1, '(1, −1)'], [0, -1, '(0, −1)']] as [number, number, string][]).map(([x, y, s]) => {
        const [cx, cy] = P(x, y)
        return (
          <g key={s}>
            <circle cx={cx} cy={cy} r={5} fill={x === 0 && y === 0 ? C.pinkD : C.ink} />
            <text x={cx + (x ? 10 : -10)} y={cy + (y ? 14 : -10)} fontSize={10} textAnchor={x ? 'start' : 'end'} dominantBaseline="middle" fill={C.dim} fontFamily="var(--mono)">{s}</text>
          </g>
        )
      })}
      <Label x={ox - 12} y={oy + 18} s={t(b('红门：第 1 步看到', 'Red door,\nseen at step 1'))} anchor="end" size={10} color={C.pinkD} />
      <Label x={250} y={64} s={t(b('右 (1, 0)、下 (0, −1)、\n左 (−1, 0)、上 (0, 1)', 'right (1, 0), down (0, −1),\nleft (−1, 0), up (0, 1)'))} anchor="start" size={10} />
      <Label x={250} y={124} s={t(b('回到 (0, 0)：模型知道\n这里来过，可以取出\n当初看到的红门', 'back at (0, 0): the model\nknows it has been here\nand recalls the red door'))} anchor="start" size={10} color={col} />
    </Svg>
  )
}

export const COGNITIVE_MAP_FIGS: TopicFigs = {
  arch: { brain: CognitiveMapArch, ai: TemArch },
  math: {
    bio: {
      0: { Fig: GridCellPlot, cap: b('拖动滑块改变网格间距 $\\lambda$。三组方向相隔 $60°$ 的余弦平面波相加，波峰重合处是放电中心，排成六边形；默认 $\\lambda = 50$ 厘米。不同网格模块的间距不同，几个模块组合起来，才能唯一确定位置。', 'Drag the slider to change the grid spacing $\\lambda$. Three cosine plane waves $60°$ apart add up; where their crests meet are the firing centers, arranged in hexagons. The default is $\\lambda = 50$ cm. Grid modules differ in spacing, and only several together pin down a unique position.') },
      1: { Fig: SuccessorPlot, cap: b('小例子的单向走廊 A、B、C。拖动滑块改变折扣 $\\gamma$。左：从 A 出发将来到访各处的折扣次数 $(1, \\gamma, \\gamma^2)$；右：奖赏在 C 时的价值 $(\\gamma^2, \\gamma, 1)$。默认 $\\gamma = 0.5$ 时 $V(\\mathrm{A}) = 0.25$。奖赏换地方时只需重算乘积，$M$ 不变。', 'The worked example’s one-way corridor A, B, C. Drag the slider to change the discount $\\gamma$. Left: discounted future visits from A, $(1, \\gamma, \\gamma^2)$. Right: values with the reward at C, $(\\gamma^2, \\gamma, 1)$. At the default $\\gamma = 0.5$, $V(\\mathrm{A}) = 0.25$. If the reward moves, only the product is recomputed; $M$ stays.') },
    },
    comp: {
      0: { Fig: PathIntegrationPlot, cap: b('小例子：位置向量取二维坐标，每个动作加上一个固定的位移。依次走右、下、左、上，回到 $(0, 0)$。模型从未沿这条路走到这里，却能从位置知道「来过这里」，从绑定记忆中取出第 1 步看到的红门。', 'The worked example: the position vector is a 2D coordinate, and each action adds a fixed step. Right, down, left, up returns to $(0, 0)$. The model has never taken this route here, yet from the position it knows it has been here and recalls the red door seen at step 1.') },
    },
  },
}
