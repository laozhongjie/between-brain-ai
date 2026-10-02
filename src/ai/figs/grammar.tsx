import type { Bi } from '../../data/types'
import { C, T, type HeadColor } from './kit'

/**
 * The shared visual grammar of the topic figures (docs/atlas-v1-plan.md §6), so every architecture and
 * dynamics figure reads the same way:
 *  - Mod: a processing module (rounded rectangle) · Store: a memory store (cylinder) · Var: one variable
 *  - Flow: solid = feedforward information, dashed = feedback or modulation; thick = fast path
 *  - a filled head writes into a store, a hollow head reads out of one
 *  - Gap: a dashed empty box where the computational system has no counterpart
 */

export type Side = 'bio' | 'comp'
const SIDE = {
  bio: { fill: C.pink, stroke: C.pinkD, head: 'pink' as HeadColor },
  comp: { fill: C.sky, stroke: C.skyD, head: 'sky' as HeadColor },
}

/** Module: label, plus an optional smaller line under it. */
export function Mod({ x, y, w, h, label, sub, side, size = 11 }: { x: number; y: number; w: number; h: number; label: string; sub?: string; side: Side; size?: number }) {
  const s = SIDE[side]
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={s.fill} stroke={s.stroke} strokeWidth={1.3} />
      {sub ? (
        <>
          <T x={x + w / 2} y={y + h / 2 - 6.5} s={label} size={size} weight={600} />
          <T x={x + w / 2} y={y + h / 2 + 8} s={sub} size={9} color={C.dim} />
        </>
      ) : (
        <T x={x + w / 2} y={y + h / 2} s={label} size={size} weight={600} />
      )}
    </g>
  )
}

/** Store: a cylinder; things are written into it and read out of it. */
export function Store({ x, y, w, h, label, sub, side }: { x: number; y: number; w: number; h: number; label: string; sub?: string; side: Side }) {
  const s = SIDE[side]
  const ry = Math.min(8, h / 6)
  const body = `M${x},${y + ry} A${w / 2},${ry} 0 0 0 ${x + w},${y + ry} L${x + w},${y + h - ry} A${w / 2},${ry} 0 0 1 ${x},${y + h - ry} Z`
  return (
    <g>
      <path d={body} fill={s.fill} stroke={s.stroke} strokeWidth={1.3} />
      <ellipse cx={x + w / 2} cy={y + ry} rx={w / 2} ry={ry} fill={s.fill} stroke={s.stroke} strokeWidth={1.3} />
      <T x={x + w / 2} y={y + h / 2 + (sub ? -1 : 4)} s={label} size={11} weight={600} />
      {sub && <T x={x + w / 2} y={y + h / 2 + 14} s={sub} size={9} color={C.dim} />}
    </g>
  )
}

/** A single variable or signal. */
export function Var({ cx, cy, r = 13, label, side }: { cx: number; cy: number; r?: number; label: string; side: Side }) {
  const s = SIDE[side]
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={s.fill} stroke={s.stroke} strokeWidth={1.3} />
      <T x={cx} y={cy} s={label} size={9.5} />
    </g>
  )
}

/** Where the computational system has no counterpart: a dashed, empty box. */
export function Gap({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} fill="none" stroke={C.dim} strokeWidth={1.2} strokeDasharray="4 3" />
      <T x={x + w / 2} y={y + h / 2} s={label} size={9.5} color={C.dim} />
    </g>
  )
}

/**
 * A flow along a polyline. `kind`: ff = feedforward (solid), fb = feedback or modulation (dashed).
 * `fast` thickens it. `head`: write (filled), read (hollow), none. The label sits at segment `at`.
 */
export function Flow({ id, pts, side, kind = 'ff', fast, head = 'write', label, at = 0, lx = 0, ly = -7, curve }: {
  id: string; pts: [number, number][]; side: Side; kind?: 'ff' | 'fb'; fast?: boolean; head?: 'write' | 'read' | 'none'
  label?: string; at?: number; lx?: number; ly?: number; curve?: [number, number]
}) {
  const s = SIDE[side]
  const color = kind === 'fb' ? C.dim : s.stroke
  const headColor: HeadColor = kind === 'fb' ? 'dim' : s.head
  const marker = head === 'write' ? `url(#${id}-a-${headColor})` : head === 'read' ? `url(#${id}-h-${headColor})` : undefined
  // a single quadratic curve through `curve` (a loop), or straight segments
  const d = curve
    ? `M${pts[0][0]},${pts[0][1]} Q${curve[0]},${curve[1]} ${pts[1][0]},${pts[1][1]}`
    : pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
  const [a, b] = curve ? [pts[0], curve] : [pts[at], pts[at + 1] ?? pts[at]]
  const mx = curve ? (pts[0][0] + 2 * curve[0] + pts[1][0]) / 4 : (a[0] + b[0]) / 2
  const my = curve ? (pts[0][1] + 2 * curve[1] + pts[1][1]) / 4 : (a[1] + b[1]) / 2
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={fast ? 2.4 : 1.3} strokeDasharray={kind === 'fb' ? '5 4' : undefined}
        strokeLinejoin="round" markerEnd={marker} />
      {label && <T x={mx + lx} y={my + ly} s={label} size={9} color={kind === 'fb' ? C.dim : s.stroke} />}
    </g>
  )
}

/** Legend entries for the grammar, shown once under the architecture figures. */
export const GRAMMAR_LEGEND: { key: 'ff' | 'fb' | 'fast' | 'write' | 'read' | 'gap'; label: Bi }[] = [
  { key: 'ff', label: { zh: '前馈信息流', en: 'Feedforward flow' } },
  { key: 'fb', label: { zh: '反馈或调制', en: 'Feedback or modulation' } },
  { key: 'fast', label: { zh: '快速路径', en: 'Fast path' } },
  { key: 'write', label: { zh: '写入存储', en: 'Write to a store' } },
  { key: 'read', label: { zh: '从存储读取', en: 'Read from a store' } },
  { key: 'gap', label: { zh: '计算系统中没有对应的部分', en: 'No counterpart in the computational system' } },
]

/** Tiny sample of one legend entry. */
export function LegendMark({ k }: { k: (typeof GRAMMAR_LEGEND)[number]['key'] }) {
  const stroke = C.ink
  return (
    <svg width="34" height="14" viewBox="0 0 34 14" aria-hidden>
      {k === 'gap' ? (
        <rect x="2" y="2" width="30" height="10" rx="3" fill="none" stroke={C.dim} strokeDasharray="3 2" />
      ) : (
        <>
          <line x1="2" y1="7" x2={k === 'write' || k === 'read' ? 24 : 32} y2="7" stroke={k === 'fb' ? C.dim : stroke}
            strokeWidth={k === 'fast' ? 2.6 : 1.3} strokeDasharray={k === 'fb' ? '4 3' : undefined} />
          {k === 'write' && <path d="M23,2.5 L32,7 L23,11.5 z" fill={stroke} />}
          {k === 'read' && <path d="M23,2.5 L32,7 L23,11.5 z" fill={C.white} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />}
        </>
      )}
    </svg>
  )
}

/** Step marker: the number of the matching point in the explanation under the figure. */
export function Num({ x, y, n, side }: { x: number; y: number; n: number; side: Side }) {
  const s = SIDE[side]
  return (
    <g>
      <circle cx={x} cy={y} r={8} fill={C.white} stroke={s.stroke} strokeWidth={1.4} />
      <T x={x} y={y + 0.5} s={String(n)} size={9.5} color={s.stroke} weight={700} />
    </g>
  )
}

/** A named region that holds several modules (e.g. the hippocampus around DG, CA3, CA1): thin solid outline. */
export function Region({ x, y, w, h, label, side }: { x: number; y: number; w: number; h: number; label: string; side: Side }) {
  const s = SIDE[side]
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={s.fill} fillOpacity={0.25} stroke={s.stroke} strokeOpacity={0.55} strokeWidth={1} />
      <T x={x + 10} y={y + 9} anchor="start" s={label} size={9.5} color={s.stroke} weight={600} />
    </g>
  )
}
