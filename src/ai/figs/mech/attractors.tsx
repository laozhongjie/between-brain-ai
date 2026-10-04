import { useMemo, useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Line, Svg, T } from '../kit'
import { Flow, Num } from '../grammar'
import { FigSlider, Label, Vec, gauss, rng } from '../plot'
import type { FigProps, MechFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Left: a ring attractor, a bump at the top held by nearby excitation and distant inhibition, set by a brief input
 * and moved by angular velocity. Right: the two landscapes, discrete valleys (completion) and a flat trough (drift). */
function AttractorMech({ t }: FigProps) {
  const id = 'm07'
  const cx = 118, cy = 160, R = 82
  const act = [1, 0.6, 0.12, 0.05, 0.03, 0.02, 0.02, 0.02, 0.03, 0.05, 0.12, 0.6]
  const pos = (k: number) => { const a = Math.PI / 2 - (k * Math.PI) / 6; return [cx + R * Math.cos(a), cy - R * Math.sin(a)] as [number, number] }
  const arc = (deg: number) => { const a = (deg * Math.PI) / 180, rr = R + 20; return `${cx + rr * Math.cos(a)} ${cy - rr * Math.sin(a)}` }
  const valleys = Array.from({ length: 61 }, (_, i) => { const x = 252 + i * 2; return [x, 104 - 16 * Math.cos((2 * Math.PI * (x - 272)) / 40)] as [number, number] })
  return (
    <Svg id={id} w={380} h={290} label={t(b('环吸引子与两种吸引子地形', 'A ring attractor and the two attractor landscapes'))}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.line} strokeWidth={1} />
      {/* excitation to neighbours, inhibition to the far side */}
      <Line pts={[pos(0), pos(1)]} color={C.pinkD} width={1.6} />
      <Line pts={[pos(0), pos(11)]} color={C.pinkD} width={1.6} />
      <Line pts={[[cx, cy - R + 11], [cx, cy + R - 11]]} color={C.dim} width={1.2} dashed />
      <T x={cx + 8} y={cy + 8} s={t(b('远处抑制', 'far: inhibit'))} size={9.5} anchor="start" color={C.dim} />
      <T x={cx - 30} y={cy - R - 14} s={t(b('近处兴奋', 'near: excite'))} size={9.5} anchor="end" color={C.pinkD} />
      {act.map((a, k) => {
        const [x, y] = pos(k)
        return (
          <g key={k}>
            <circle cx={x} cy={y} r={11} fill={C.pink} stroke={C.pinkD} strokeWidth={1.2} />
            <circle cx={x} cy={y} r={11} fill={C.pinkD} fillOpacity={a * 0.85} />
          </g>
        )
      })}
      <T x={cx} y={cy - R + 30} s={t(b('活动包', 'bump'))} size={10} color={C.pinkD} weight={600} />
      <Flow id={id} side="bio" pts={[[cx, 22], [cx, cy - R - 12]]} />
      <T x={cx + 8} y={32} s={t(b('短暂输入', 'brief input'))} size={9.5} anchor="start" color={C.pinkD} />
      <path d={`M ${arc(18)} A ${R + 20} ${R + 20} 0 0 0 ${arc(62)}`} fill="none" stroke={C.dim} strokeWidth={1.3} strokeDasharray="5 4" markerEnd={`url(#${id}-a-dim)`} />
      <T x={212} y={78} s={t(b('角速度', 'angular\nvelocity'))} size={9.5} color={C.dim} />
      <Num x={cx - 50} y={cy - 18} n={1} side="bio" />
      <Num x={cx - 14} y={30} n={2} side="bio" />
      <Num x={cx - 28} y={cy - R + 30} n={3} side="bio" />
      <Num x={226} y={110} n={4} side="bio" />

      <line x1={238} x2={238} y1={20} y2={276} stroke={C.line} strokeWidth={1} />
      <T x={312} y={30} s={t(b('点吸引子', 'Point attractors'))} size={10.5} weight={600} />
      <Line pts={valleys} color={C.pinkD} width={1.5} />
      <circle cx={300} cy={96} r={6} fill={C.pinkD} />
      <Vec x1={303} y1={100} x2={310} y2={112} color={C.pinkD} width={1.4} />
      <T x={312} y={140} s={t(b('滑到最近的谷底', 'rolls into the nearest valley'))} size={9.5} color={C.dim} />
      <Num x={252} y={62} n={5} side="bio" />
      <T x={312} y={178} s={t(b('连续吸引子', 'Continuous attractor'))} size={10.5} weight={600} />
      <path d="M 252 200 Q 258 236 276 238 L 348 238 Q 366 236 372 200" fill="none" stroke={C.pinkD} strokeWidth={1.5} />
      <circle cx={312} cy={231} r={6} fill={C.pinkD} />
      <Vec x1={300} y1={224} x2={284} y2={224} color={C.dim} width={1.2} />
      <Vec x1={324} y1={224} x2={340} y2={224} color={C.dim} width={1.2} />
      <T x={312} y={258} s={t(b('平坦的沟：噪声漂移', 'flat trough: noise drift'))} size={9.5} color={C.dim} />
      <Num x={252} y={190} n={6} side="bio" />
    </Svg>
  )
}

/* The worked example's ring model: N = 36 neurons, W = J cos(Δθ), input at 90° for the first 5τ, a little noise. */
const N = 36, DT = 0.1, STEPS = 400, EVERY = 5, INPUT_END = 50
const TH = Array.from({ length: N }, (_, i) => (2 * Math.PI * i) / N)
const COS = TH.map((a) => TH.map((c) => Math.cos(a - c)))

const cache = new Map<number, number[][]>()

function simulate(J: number) {
  const hit = cache.get(J)
  if (hit) return hit
  const u = rng(7)
  let r = new Array<number>(N).fill(0)
  const cols: number[][] = []
  for (let s = 0; s < STEPS; s++) {
    const next = r.map((ri, i) => {
      let rec = 0
      for (let j = 0; j < N; j++) rec += COS[i][j] * r[j]
      const inp = s < INPUT_END ? 0.5 * Math.max(0, Math.cos(TH[i] - Math.PI / 2)) : 0
      const x = (J * rec) / N + inp + 0.04 * gauss(u)
      return ri + DT * (-ri + Math.tanh(Math.max(0, x)))
    })
    r = next
    if (s % EVERY === 0) cols.push(r.slice())
  }
  cache.set(J, cols)
  return cols
}

/** Interactive: drag the connection strength J and watch the bump after the input stops at 5τ: it fades below
 * J = 4 and holds (drifting a little with noise) above. Starts at J = 6 from the worked example. */
function RingPlot({ t }: FigProps) {
  const [J, setJ] = useState(6)
  const cols = useMemo(() => simulate(J), [J])
  const col = C.pinkD
  const x0 = 46, y0 = 22, w = 300, h = 144, cw = w / cols.length, ch = h / N
  const xOf = (tau: number) => x0 + (tau / (STEPS * DT)) * w
  const held = (v: number) => Math.max(...simulate(v)[cols.length - 1]) > 0.3
  const readout = (v: number) => t(b(`$J = ${v.toFixed(1)}$：${held(v) ? '输入撤去后活动包保持' : '输入撤去后活动包消失'}`, `$J = ${v.toFixed(1)}$: ${held(v) ? 'the bump holds after the input' : 'the bump fades after the input'}`))
  return (
    <>
      <Svg id="m07m0" w={380} h={200} label={t(b('环吸引子：输入撤去后，J 足够大时活动包保持，否则消失', 'Ring attractor: after the input stops the bump holds when J is large enough and fades otherwise'))}>
        {cols.map((c, k) => c.map((v, i) => (
          <rect key={`${k}-${i}`} x={x0 + k * cw} y={y0 + h - (i + 1) * ch} width={cw + 0.3} height={ch + 0.3} fill={col} fillOpacity={Math.min(1, v) ** 2.2} />
        )))}
        <rect x={x0} y={y0} width={w} height={h} fill="none" stroke={C.line} />
        <rect x={x0} y={y0 - 8} width={xOf(INPUT_END * DT) - x0} height={5} fill={C.lemonD} fillOpacity={0.8} />
        <Label x={xOf(INPUT_END * DT) + 4} y={y0 - 6} s={t(b('输入（90°）', 'input (90°)'))} anchor="start" size={9.5} color={C.lemonD} />
        {[0, 90, 180, 270, 360].map((d) => <Label key={d} x={x0 - 6} y={y0 + h - (d / 360) * h} s={`${d}°`} anchor="end" size={9.5} />)}
        {[0, 10, 20, 30, 40].map((tau) => <Label key={tau} x={xOf(tau)} y={y0 + h + 12} s={`${tau}τ`} size={9.5} />)}
        <Label x={x0 + w / 2} y={y0 + h + 28} s={t(b('时间', 'Time'))} size={10} />
        <Label x={x0 + w + 8} y={y0 + 8} s={t(b('偏好\n方向', 'preferred\ndirection'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$J$" value={J} min={0} max={8} step={0.5} onChange={setJ} readout={readout(J)} widest={[readout(6), readout(2)]} />
    </>
  )
}

export const ATTRACTOR_FIGS: MechFigs = {
  mech: AttractorMech,
  math: {
    0: { Fig: RingPlot, cap: b('$36$ 个神经元按偏好方向从下到上排列，颜色越亮活动越强。前 $5\\tau$ 在 $90^\\circ$ 处给一个输入（黄条），之后撤去，每一步加入少量噪声。$J = 6$ 时活动包一直留在 $90^\\circ$ 附近；拖动滑块到 $J = 2$，活动包在输入撤去后很快消失，分界在 $J = 4$ 附近。', '$36$ neurons ordered by preferred direction from bottom to top, brighter for stronger activity. An input at $90^\\circ$ (yellow bar) lasts for the first $5\\tau$ and then stops, and a little noise is added at every step. At $J = 6$ the bump stays near $90^\\circ$. Drag the slider to $J = 2$ and the bump fades soon after the input stops. The boundary is near $J = 4$.') },
  },
}
