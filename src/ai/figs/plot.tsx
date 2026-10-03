import type { CSSProperties, ReactNode } from 'react'
import { Rich } from '../Tex'
import { FONT_MONO } from '../../theme'
import { C } from './kit'
import type { Side } from './grammar'

/* Plot grammar for the figures beside equations: they show what an equation computes (a curve, a time course, a
 * distribution), drawn from the equation itself with the numbers of the card's worked example.
 *  - one frame per panel, with left and bottom axes; numbers in the mono face
 *  - the side's color for the main quantity; compared parameter values in steps of opacity of that color
 *  - gray for reference lines (a baseline, the diagonal, an accuracy level)
 *  - at most one short note pointing at the property the consequences describe */

export const SIDE_COLOR: Record<Side, string> = { bio: C.pinkD, comp: C.skyD }
/** Opacity steps for two to four compared parameter values, weakest first. */
export const STEPS = [0.3, 0.55, 0.8, 1]

/** A panel: its pixel box and the data ranges it shows. */
export interface Frame { x: number; y: number; w: number; h: number; xr: [number, number]; yr: [number, number] }

export const px = (f: Frame, v: number) => f.x + ((v - f.xr[0]) / (f.xr[1] - f.xr[0])) * f.w
export const py = (f: Frame, v: number) => f.y + f.h - ((v - f.yr[0]) / (f.yr[1] - f.yr[0])) * f.h

/** Sample `fn` over [from, to] (default: the frame's x range) into pixel points. Where the curve leaves the frame's
 * y range it is cut at the edge rather than flattened along it. */
export function trace(f: Frame, fn: (x: number) => number, from = f.xr[0], to = f.xr[1], n = 160): [number, number][] {
  const [lo, hi] = f.yr
  const inside = (y: number) => y >= lo && y <= hi
  const pts: [number, number][] = []
  let prev: [number, number] | undefined
  for (let i = 0; i <= n; i++) {
    const x = from + ((to - from) * i) / n, y = fn(x)
    if (prev && inside(y) !== inside(prev[1])) {
      // the crossing with the edge, by linear interpolation
      const edge = inside(y) ? (prev[1] > hi ? hi : lo) : (y > hi ? hi : lo)
      const k = (edge - prev[1]) / (y - prev[1])
      pts.push([px(f, prev[0] + k * (x - prev[0])), py(f, edge)])
    }
    if (inside(y)) pts.push([px(f, x), py(f, y)])
    prev = [x, y]
  }
  return pts
}

/** Tick number or short tick text. */
export function Tick({ x, y, s, anchor = 'middle' }: { x: number; y: number; s: string; anchor?: 'start' | 'middle' | 'end' }) {
  return <text x={x} y={y} fontSize={10} textAnchor={anchor} dominantBaseline="middle" fill={C.dim} fontFamily={FONT_MONO}>{s}</text>
}

/** Left and bottom axes with ticks; the y label sits above the axis, the x label under the ticks. */
export function Axes({ f, xTicks = [], yTicks = [], xLabel, yLabel, grid }: {
  f: Frame; xTicks?: [number, string][]; yTicks?: [number, string][]; xLabel?: string; yLabel?: string; grid?: boolean
}) {
  const bottom = f.y + f.h
  return (
    <g>
      {grid && yTicks.map(([v]) => <line key={`g${v}`} x1={f.x} x2={f.x + f.w} y1={py(f, v)} y2={py(f, v)} stroke={C.line} strokeWidth={0.6} strokeDasharray="2 3" />)}
      <line x1={f.x} x2={f.x + f.w} y1={bottom} y2={bottom} stroke={C.dim} strokeWidth={1} />
      <line x1={f.x} x2={f.x} y1={f.y} y2={bottom} stroke={C.dim} strokeWidth={1} />
      {xTicks.map(([v, s]) => (
        <g key={`x${v}`}>
          <line x1={px(f, v)} x2={px(f, v)} y1={bottom} y2={bottom + 3} stroke={C.dim} strokeWidth={1} />
          {/* the first tick label leans right, clear of the y axis's lowest label */}
          {v === f.xr[0] ? <Tick x={px(f, v) - 3} y={bottom + 11} s={s} anchor="start" /> : <Tick x={px(f, v)} y={bottom + 11} s={s} />}
        </g>
      ))}
      {yTicks.map(([v, s]) => (
        <g key={`y${v}`}>
          <line x1={f.x - 3} x2={f.x} y1={py(f, v)} y2={py(f, v)} stroke={C.dim} strokeWidth={1} />
          <Tick x={f.x - 5} y={py(f, v)} s={s} anchor="end" />
        </g>
      ))}
      {xLabel && <Label x={f.x + f.w / 2} y={bottom + 27} s={xLabel} />}
      {yLabel && <Label x={f.x - 4} y={f.y - 12} s={yLabel} anchor="start" />}
    </g>
  )
}

/** Axis label or note text. */
export function Label({ x, y, s, anchor = 'middle', color = C.dim, size = 11, weight }: {
  x: number; y: number; s: string; anchor?: 'start' | 'middle' | 'end'; color?: string; size?: number; weight?: number
}) {
  const lines = s.split('\n')
  const y0 = y - ((lines.length - 1) * size * 1.2) / 2
  return (
    <text x={x} y={y0} fontSize={size} textAnchor={anchor} dominantBaseline="middle" fill={color} fontWeight={weight}>
      {lines.map((l, i) => <tspan key={i} x={x} dy={i ? size * 1.2 : 0}>{l}</tspan>)}
    </text>
  )
}

export function Path({ pts, color, width = 1.8, dashed, opacity = 1 }: { pts: [number, number][]; color: string; width?: number; dashed?: boolean; opacity?: number }) {
  return <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={width} strokeOpacity={opacity} strokeDasharray={dashed ? '4 3' : undefined} strokeLinejoin="round" strokeLinecap="round" />
}

/** A horizontal or vertical reference line across a frame. */
export function Ref({ f, y, x, color = C.dim }: { f: Frame; y?: number; x?: number; color?: string }) {
  if (y !== undefined) return <line x1={f.x} x2={f.x + f.w} y1={py(f, y)} y2={py(f, y)} stroke={color} strokeWidth={1} strokeDasharray="3 3" />
  return <line x1={px(f, x!)} x2={px(f, x!)} y1={f.y} y2={f.y + f.h} stroke={color} strokeWidth={1} strokeDasharray="3 3" />
}

/** A marked point in data coordinates. */
export function Dot({ f, x, y, color, r = 3 }: { f: Frame; x: number; y: number; color: string; r?: number }) {
  return <circle cx={px(f, x)} cy={py(f, y)} r={r} fill={C.white} stroke={color} strokeWidth={1.6} />
}

/** A bar from the baseline to `v`, centered on `x` in data units. */
export function Bar({ f, x, v, w, color, opacity = 0.85 }: { f: Frame; x: number; v: number; w: number; color: string; opacity?: number }) {
  const x0 = px(f, x - w / 2), x1 = px(f, x + w / 2), y0 = py(f, Math.max(f.yr[0], 0)), y1 = py(f, v)
  return <rect x={x0} y={Math.min(y0, y1)} width={x1 - x0} height={Math.abs(y0 - y1)} rx={1.5} fill={color} fillOpacity={opacity * 0.35} stroke={color} strokeOpacity={opacity} strokeWidth={1.2} />
}

/** Panel title, top left of a frame. */
export function Title({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return <text x={x} y={y} fontSize={11} fontWeight={600} fill={C.ink} dominantBaseline="middle">{children}</text>
}

/** A small seeded random generator, so sampled paths are the same on every render. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A standard normal sample from a uniform generator. */
export const gauss = (u: () => number) => Math.sqrt(-2 * Math.log(1 - u())) * Math.cos(2 * Math.PI * u())

/** A heatmap of values in [−1, 1] (or [0, 1]): positive cells in `pos`, negative cells in `neg`, opacity by size. */
export function Heat({ x, y, cell, vals, pos, neg = C.lavD, gap = 0.6 }: { x: number; y: number; cell: number; vals: number[][]; pos: string; neg?: string; gap?: number }) {
  return (
    <g>
      {vals.map((row, r) => row.map((v, c) => (
        <rect key={`${r}-${c}`} x={x + c * cell} y={y + r * cell} width={cell - gap} height={cell - gap} fill={v >= 0 ? pos : neg} fillOpacity={0.06 + 0.86 * Math.min(1, Math.abs(v))} />
      )))}
    </g>
  )
}

/** An arrow in pixel space, with a head drawn inline so it takes any color. */
export function Vec({ x1, y1, x2, y2, color, width = 1.6, opacity = 1, dashed }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number; opacity?: number; dashed?: boolean }) {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 4 + width * 1.5
  const p = (d: number) => `${x2 - h * Math.cos(a + d)},${y2 - h * Math.sin(a + d)}`
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2 - h * 0.6 * Math.cos(a)} y2={y2 - h * 0.6 * Math.sin(a)} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '4 3' : undefined} />
      <polygon points={`${x2},${y2} ${p(0.45)} ${p(-0.45)}`} fill={color} />
    </g>
  )
}

/** A slider under an interactive figure: what it changes, the control, and a live readout. Starts at the worked
 * example's value, so the figure as first shown matches the caption. `widest` lists readouts at the values where the
 * text is longest; they are laid invisibly under the live one, so the readout keeps one width and the slider never
 * shifts while dragging. */
export function FigSlider({ label, value, min, max, step, onChange, readout, widest = [] }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; readout: string; widest?: string[]
}) {
  return (
    <label className="fig-slider">
      <span><Rich text={label} /></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)}
        style={{ '--v': `${((value - min) / (max - min)) * 100}%` } as CSSProperties} />
      <output>
        {widest.map((w, i) => <span key={i} className="fig-slider-sizer" aria-hidden="true"><Rich text={w} /></span>)}
        <span><Rich text={readout} /></span>
      </output>
    </label>
  )
}
