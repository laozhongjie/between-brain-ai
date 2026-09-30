import { useEffect, useRef, useState } from 'react'
import type { Pt } from './models'
import { FONT_MONO } from '../../theme'
import { Rich } from '../Tex'

export { SERIES } from '../../theme'

export interface Series {
  name: string
  color: string
  points: Pt[]
  dashed?: boolean
  /** draw dots at each point */
  dots?: boolean
}

interface Props {
  series: Series[]
  xLabel: string
  yLabel: string
  xDomain?: [number, number]
  yDomain?: [number, number]
  height?: number
  /** vertical reference line */
  vline?: { x: number; label: string }
  /** highlighted point */
  mark?: { x: number; y: number; label: string }
  fmtX?: (x: number) => string
  fmtY?: (y: number) => string
}

const M = { l: 58, r: 16, t: 12, b: 34 }
const INK = { axis: '#d4c8bd', grid: '#f1eae3', text: '#8a8194', strong: '#2f2a38' }

function niceTicks(lo: number, hi: number, n = 5) {
  const span = hi - lo || 1
  const step0 = span / n
  const mag = 10 ** Math.floor(Math.log10(step0))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0) ?? step0
  const out: number[] = []
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10))
  return out
}

const extent = (vals: number[]): [number, number] => {
  const lo = Math.min(...vals)
  const hi = Math.max(...vals)
  const pad = (hi - lo || 1) * 0.06
  return [lo - pad, hi + pad]
}

/** Canvas line chart: thin 2px lines, recessive axes, legend for ≥2 series, hover crosshair with values. */
export function LinePlot({ series, xLabel, yLabel, xDomain, yDomain, height = 200, vline, mark, fmtX = (x) => x.toFixed(0), fmtY = (y) => y.toFixed(2) }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [hover, setHover] = useState<{ px: number; py: number; x: number } | null>(null)
  const all = series.flatMap((s) => s.points)
  const xd = xDomain ?? extent(all.map((p) => p[0]))
  const yd = yDomain ?? extent(all.map((p) => p[1]))

  useEffect(() => {
    const cv = ref.current!
    const dpr = devicePixelRatio
    const W = cv.clientWidth
    const H = cv.clientHeight
    cv.width = W * dpr
    cv.height = H * dpr
    const ctx = cv.getContext('2d')!
    ctx.scale(dpr, dpr)
    const sx = (x: number) => M.l + ((x - xd[0]) / (xd[1] - xd[0])) * (W - M.l - M.r)
    const sy = (y: number) => H - M.b - ((y - yd[0]) / (yd[1] - yd[0])) * (H - M.t - M.b)

    ctx.font = `11px ${FONT_MONO}`
    ctx.fillStyle = INK.text
    ctx.strokeStyle = INK.grid
    ctx.lineWidth = 1
    for (const y of niceTicks(yd[0], yd[1])) {
      ctx.beginPath()
      ctx.moveTo(M.l, sy(y))
      ctx.lineTo(W - M.r, sy(y))
      ctx.stroke()
      ctx.textAlign = 'right'
      ctx.fillText(fmtY(y), M.l - 6, sy(y) + 4)
    }
    ctx.textAlign = 'center'
    for (const x of niceTicks(xd[0], xd[1], 6)) ctx.fillText(fmtX(x), sx(x), H - M.b + 15)
    ctx.strokeStyle = INK.axis
    ctx.beginPath()
    ctx.moveTo(M.l, M.t)
    ctx.lineTo(M.l, H - M.b)
    ctx.lineTo(W - M.r, H - M.b)
    ctx.stroke()
    ctx.fillText(xLabel, M.l + (W - M.l - M.r) / 2, H - 4)
    ctx.save()
    ctx.translate(12, M.t + (H - M.t - M.b) / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(yLabel, 0, 0)
    ctx.restore()

    if (vline) {
      ctx.strokeStyle = INK.axis
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(sx(vline.x), M.t)
      ctx.lineTo(sx(vline.x), H - M.b)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.textAlign = 'left'
      ctx.fillText(vline.label, sx(vline.x) + 4, M.t + 10)
    }

    ctx.save()
    ctx.beginPath()
    ctx.rect(M.l, M.t, W - M.l - M.r, H - M.t - M.b)
    ctx.clip()
    for (const s of series) {
      ctx.strokeStyle = s.color
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.setLineDash(s.dashed ? [6, 4] : [])
      ctx.beginPath()
      s.points.forEach(([x, y], i) => (i ? ctx.lineTo(sx(x), sy(y)) : ctx.moveTo(sx(x), sy(y))))
      ctx.stroke()
      if (s.dots) {
        ctx.fillStyle = s.color
        for (const [x, y] of s.points) {
          ctx.beginPath()
          ctx.arc(sx(x), sy(y), 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    ctx.setLineDash([])
    ctx.restore()

    if (mark) {
      ctx.fillStyle = INK.strong
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(sx(mark.x), sy(mark.y), 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.textAlign = 'left'
      ctx.fillText(mark.label, sx(mark.x) + 8, sy(mark.y) - 6)
    }

    if (hover) {
      ctx.strokeStyle = 'rgba(74,68,83,0.35)'
      ctx.beginPath()
      ctx.moveTo(hover.px, M.t)
      ctx.lineTo(hover.px, H - M.b)
      ctx.stroke()
    }
  }, [series, xd, yd, xLabel, yLabel, vline, mark, hover, fmtX, fmtY])

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - r.left
    if (px < M.l || px > r.width - M.r) return setHover(null)
    const x = xd[0] + ((px - M.l) / (r.width - M.l - M.r)) * (xd[1] - xd[0])
    setHover({ px, py: e.clientY - r.top, x })
  }

  const nearest = (s: Series, x: number) => {
    let best = s.points[0]
    for (const p of s.points) if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p
    return best
  }

  return (
    <div className="plot">
      {series.length === 1 && <div className="plot-legend plot-title"><Rich text={series[0].name} /></div>}
      {series.length > 1 && (
        <div className="plot-legend">
          {series.map((s) => (
            <span key={s.name}><i style={{ background: s.color, opacity: s.dashed ? 0.7 : 1 }} /><Rich text={s.name} /></span>
          ))}
        </div>
      )}
      <div className="plot-area" style={{ height }}>
        <canvas ref={ref} onPointerMove={onMove} onPointerLeave={() => setHover(null)} />
        {hover && (
          <div className="plot-tip" style={{ left: Math.min(hover.px + 12, 9999), top: 8 }}>
            <div className="plot-tip-x">{xLabel}: {fmtX(nearest(series[0], hover.x)[0])}</div>
            {series.map((s) => (
              <div key={s.name}><i style={{ background: s.color }} /><Rich text={s.name} />: <b>{fmtY(nearest(s, hover.x)[1])}</b></div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Sequential terracotta ramp (light surface): low values recede toward the ground, high values are deep.
const RAMP = ['#fbf5ef', '#f3dfcc', '#e9c2a2', '#d99f79', '#bf7a56', '#935539'].map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)))
function rampColor(v: number) {
  const x = Math.max(0, Math.min(1, v)) * (RAMP.length - 1)
  const i = Math.min(RAMP.length - 2, Math.floor(x))
  const f = x - i
  const c = RAMP[i].map((a, k) => Math.round(a + (RAMP[i + 1][k] - a) * f))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

/** Heatmap over the unit square: values[j][i] at (x = i/(n-1), y = j/(n-1)), with a hover readout. */
export function Heatmap({ values, title, xLabel, yLabel }: { values: number[][]; title: string; xLabel: string; yLabel: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [tip, setTip] = useState<{ x: number; y: number; v: number; px: number; py: number } | null>(null)
  const n = values.length

  useEffect(() => {
    const cv = ref.current!
    const dpr = devicePixelRatio
    const S = cv.clientWidth
    cv.width = S * dpr
    cv.height = S * dpr
    const ctx = cv.getContext('2d')!
    ctx.scale(dpr, dpr)
    const cell = S / n
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = rampColor(values[j][i])
        ctx.fillRect(i * cell, S - (j + 1) * cell, cell + 0.5, cell + 0.5)
      }
  }, [values, n])

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const i = Math.min(n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * n)))
    const j = Math.min(n - 1, Math.max(0, Math.floor(((r.bottom - e.clientY) / r.height) * n)))
    setTip({ x: i / (n - 1), y: j / (n - 1), v: values[j][i], px: e.clientX - r.left, py: e.clientY - r.top })
  }

  return (
    <figure className="heatmap">
      <figcaption>{title}</figcaption>
      <div className="heatmap-box">
        <span className="hm-y">{yLabel}</span>
        <div className="hm-canvas">
          <canvas ref={ref} onPointerMove={onMove} onPointerLeave={() => setTip(null)} />
          {tip && (
            <div className="plot-tip" style={{ left: tip.px + 10, top: tip.py + 10 }}>
              x₁ {tip.x.toFixed(2)} · x₂ {tip.y.toFixed(2)} → <b>{tip.v.toFixed(2)}</b>
            </div>
          )}
          <span className="hm-tick hm-0">0</span>
          <span className="hm-tick hm-1x">1</span>
          <span className="hm-tick hm-1y">1</span>
        </div>
      </div>
      <div className="hm-x">{xLabel}</div>
    </figure>
  )
}

export function RampLegend({ lo, hi }: { lo: string; hi: string }) {
  return (
    <div className="ramp-legend">
      <span>{lo}</span>
      <i style={{ background: `linear-gradient(90deg, ${[0, 0.2, 0.4, 0.6, 0.8, 1].map(rampColor).join(',')})` }} />
      <span>{hi}</span>
    </div>
  )
}
