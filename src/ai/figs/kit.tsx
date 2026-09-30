import type { ReactNode } from 'react'
import { FONT } from '../../theme'

/** Dark diagram palette: deep tinted fills with a bright tone of the same hue for strokes and arrows. */
export const C = {
  pink: '#3a1f2b', pinkD: '#ff8fa8',
  peach: '#3a2a20', peachD: '#f7b08a',
  mint: '#15332b', mintD: '#5ee0b5',
  lav: '#1c2433', lavD: '#9fb0c8',
  sky: '#142a3d', skyD: '#7dd3fc',
  lemon: '#33301a', lemonD: '#e8c267',
  ink: '#e6ebf2', dim: '#8793a6', line: '#3a4658', white: '#0b1019', ghost: '#121925',
}

const HEADS = { ink: C.ink, dim: C.dim, pink: C.pinkD, lav: C.lavD, mint: C.mintD, sky: C.skyD, peach: C.peachD, lemon: C.lemonD }
export type HeadColor = keyof typeof HEADS

/** SVG canvas with arrow markers in every palette colour (ids are namespaced per figure). */
export function Svg({ id, w = 360, h = 230, label, children }: { id: string; w?: number; h?: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className="fig-svg" fontFamily={FONT}>
      <defs>
        {Object.entries(HEADS).map(([k, col]) => (
          <marker key={k} id={`${id}-a-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9 z" fill={col} />
          </marker>
        ))}
        {Object.entries(HEADS).map(([k, col]) => (
          <marker key={`b${k}`} id={`${id}-b-${k}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M5,0 L5,10" stroke={col} strokeWidth="2.4" />
          </marker>
        ))}
      </defs>
      {children}
    </svg>
  )
}

/** Text; `\n` splits lines. */
export function T({ x, y, s, size = 11, anchor = 'middle', color = C.ink, weight, italic }: {
  x: number; y: number; s: string; size?: number; anchor?: 'start' | 'middle' | 'end'; color?: string; weight?: number; italic?: boolean
}) {
  const lines = s.split('\n')
  const y0 = y - ((lines.length - 1) * size * 1.2) / 2
  return (
    <text x={x} y={y0} fontSize={size} textAnchor={anchor} fill={color} fontWeight={weight} fontStyle={italic ? 'italic' : undefined} dominantBaseline="middle">
      {lines.map((l, i) => <tspan key={i} x={x} dy={i ? size * 1.2 : 0}>{l}</tspan>)}
    </text>
  )
}

export function Box({ x, y, w, h, label, fill = C.lav, stroke = C.lavD, r = 8, size = 11, dashed, color = C.ink, weight }: {
  x: number; y: number; w: number; h: number; label?: string; fill?: string; stroke?: string; r?: number; size?: number; dashed?: boolean; color?: string; weight?: number
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={1.4} strokeDasharray={dashed ? '4 3' : undefined} />
      {label && <T x={x + w / 2} y={y + h / 2} s={label} size={size} color={color} weight={weight} />}
    </g>
  )
}

export function Dot({ cx, cy, r = 10, fill = C.pink, stroke = C.pinkD, label, size = 10 }: { cx: number; cy: number; r?: number; fill?: string; stroke?: string; label?: string; size?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={1.4} />
      {label && <T x={cx} y={cy} s={label} size={size} />}
    </g>
  )
}

/**
 * Arrow from (x1,y1) to (x2,y2). `bend` curves it sideways; `head` = arrow | bar (inhibition ⊣) | none.
 * Label sits at the midpoint, offset by (lx, ly).
 */
export function Arrow({ id, x1, y1, x2, y2, color = 'ink', bend = 0, head = 'arrow', dashed, width = 1.6, label, lx = 0, ly = -8, size = 10, both }: {
  id: string; x1: number; y1: number; x2: number; y2: number; color?: HeadColor; bend?: number; head?: 'arrow' | 'bar' | 'none'
  dashed?: boolean; width?: number; label?: string; lx?: number; ly?: number; size?: number; both?: boolean
}) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const cx = mx - (dy / len) * bend
  const cy = my + (dx / len) * bend
  const col = HEADS[color]
  const marker = head === 'arrow' ? `url(#${id}-a-${color})` : head === 'bar' ? `url(#${id}-b-${color})` : undefined
  return (
    <g>
      <path
        d={bend ? `M${x1},${y1} Q${cx},${cy} ${x2},${y2}` : `M${x1},${y1} L${x2},${y2}`}
        fill="none" stroke={col} strokeWidth={width} strokeDasharray={dashed ? '5 4' : undefined}
        markerEnd={marker} markerStart={both ? `url(#${id}-a-${color})` : undefined}
      />
      {label && <T x={(bend ? (mx + cx) / 2 : mx) + lx} y={(bend ? (my + cy) / 2 : my) + ly} s={label} size={size} color={col} />}
    </g>
  )
}

/** Matrix of cells; `vals` in 0..1 shade the cells. */
export function Grid({ x, y, rows, cols, cell = 12, vals, color = C.lavD, stroke = C.line }: {
  x: number; y: number; rows: number; cols: number; cell?: number; vals?: number[][]; color?: string; stroke?: string
}) {
  const cells = []
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const v = vals?.[r]?.[c] ?? 0
      cells.push(<rect key={`${r}-${c}`} x={x + c * cell} y={y + r * cell} width={cell} height={cell} fill={color} fillOpacity={0.08 + 0.8 * v} stroke={stroke} strokeWidth={0.6} />)
    }
  return <g>{cells}</g>
}

/** Spike train: vertical ticks at the given x positions. */
export function Spikes({ xs, y, h = 14, color = C.pinkD }: { xs: number[]; y: number; h?: number; color?: string }) {
  return <g>{xs.map((x, i) => <line key={i} x1={x} x2={x} y1={y} y2={y - h} stroke={color} strokeWidth={1.8} strokeLinecap="round" />)}</g>
}

export function Line({ pts, color = C.ink, width = 1.6, dashed, fill }: { pts: [number, number][]; color?: string; width?: number; dashed?: boolean; fill?: string }) {
  return <polyline points={pts.map((p) => p.join(',')).join(' ')} fill={fill ?? 'none'} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '4 3' : undefined} strokeLinejoin="round" strokeLinecap="round" />
}

/** Sample a function into polyline points over [x0, x1] mapped to pixel space. */
export function plot(f: (u: number) => number, px0: number, px1: number, py0: number, pyScale: number, n = 60): [number, number][] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const u = i / n
    return [px0 + u * (px1 - px0), py0 - f(u) * pyScale] as [number, number]
  })
}

/** Small side badge used to title the two halves of a figure. */
export function Tag({ x, y, s, fill = C.lav, color = C.lavD }: { x: number; y: number; s: string; fill?: string; color?: string }) {
  const w = s.length * 11 + 14
  return (
    <g>
      <rect x={x} y={y} width={w} height={18} rx={9} fill={fill} />
      <T x={x + w / 2} y={y + 9} s={s} size={10.5} color={color} weight={600} />
    </g>
  )
}

export interface ChainItem {
  label: string
  fill?: string
  stroke?: string
}

/** Boxes in a row joined by arrows (a processing pipeline). Returns the box centres for further wiring. */
export function Chain({ id, items, x, y, w = 54, h = 30, gap = 14, color = 'ink', size = 10, labels }: {
  id: string; items: ChainItem[]; x: number; y: number; w?: number; h?: number; gap?: number; color?: HeadColor; size?: number; labels?: string[]
}) {
  return (
    <g>
      {items.map((it, i) => (
        <g key={i}>
          <Box x={x + i * (w + gap)} y={y} w={w} h={h} label={it.label} fill={it.fill ?? C.lav} stroke={it.stroke ?? C.lavD} size={size} />
          {i < items.length - 1 && (
            <Arrow id={id} x1={x + i * (w + gap) + w} y1={y + h / 2} x2={x + (i + 1) * (w + gap) - 1} y2={y + h / 2} color={color} width={1.4} label={labels?.[i]} ly={-8} size={9} />
          )}
        </g>
      ))}
    </g>
  )
}
