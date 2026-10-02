import { useEffect, useRef } from 'react'
import { FONT_LABEL } from '../theme'
import { homeState } from './chapters'

const LAYERS = [4, 7, 9, 9, 7, 3]
const INK = '230,235,242'
const ICE = '125,211,252'

interface Pulse { layer: number; from: number; to: number; t: number }

/**
 * The AI side of the landing page: a layered network with signals flowing through it. What is emphasised
 * follows the chapter: weights (1), unit activations (2), blocks (3), modules (4), the agent loop (5).
 */
export function HomeAI() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    // fixed random weights (with a slow phase each) and activations
    const W = LAYERS.slice(0, -1).map((n, l) => Array.from({ length: n }, () => Array.from({ length: LAYERS[l + 1] }, () => ({ w: Math.random() * 2 - 1, ph: Math.random() * 6.28 }))))
    const act = LAYERS.map((n) => new Float32Array(n))
    let pulses: Pulse[] = []
    let raf = 0
    let last = performance.now()
    let spawn = 0
    let t = 0

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += reduced ? 0 : dt
      const dpr = Math.min(devicePixelRatio, 2)
      const w = cv.clientWidth
      const h = cv.clientHeight
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
        cv.width = Math.round(w * dpr)
        cv.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const ch = Math.max(0, homeState.chapter)

      // geometry: the network sits in the middle of the panel
      // while the disc opens the network hugs the slit (this panel's left edge), then settles in the middle
      const shift = (1 - homeState.open) * w * 0.3
      const x0 = w * 0.2 - shift
      const x1 = w * 0.8 - shift
      const cy = h * 0.5
      const span = Math.min(h * 0.46, w * 0.62)
      const px = (l: number) => x0 + ((x1 - x0) * l) / (LAYERS.length - 1)
      const py = (l: number, i: number) => cy + (i - (LAYERS[l] - 1) / 2) * (span / 8)

      // edges
      for (let l = 0; l < W.length; l++) {
        for (let i = 0; i < LAYERS[l]; i++) {
          for (let j = 0; j < LAYERS[l + 1]; j++) {
            const e = W[l][i][j]
            let a = 0.05
            let lw = 0.6
            if (ch === 0) {
              // chapter 1: the weights themselves, slowly changing strength
              const s = Math.abs(Math.sin(t * 0.6 + e.ph)) * Math.abs(e.w)
              a = 0.04 + s * 0.4
              lw = 0.4 + s * 1.8
            }
            ctx.strokeStyle = `rgba(${ch === 0 && e.w > 0 ? ICE : INK},${a})`
            ctx.lineWidth = lw
            ctx.beginPath()
            ctx.moveTo(px(l), py(l, i))
            ctx.lineTo(px(l + 1), py(l + 1, j))
            ctx.stroke()
          }
        }
      }

      // signals: spawn at the input, hop layer to layer
      spawn += dt
      if (!reduced && spawn > 0.09) {
        spawn = 0
        pulses.push({ layer: 0, from: (Math.random() * LAYERS[0]) | 0, to: (Math.random() * LAYERS[1]) | 0, t: 0 })
      }
      const next: Pulse[] = []
      for (const p of pulses) {
        p.t += dt * 2.6
        if (p.t >= 1) {
          act[p.layer + 1][p.to] = 1
          if (p.layer + 2 < LAYERS.length && Math.random() < 0.8) next.push({ layer: p.layer + 1, from: p.to, to: (Math.random() * LAYERS[p.layer + 2]) | 0, t: 0 })
          continue
        }
        next.push(p)
        const ax = px(p.layer), ay = py(p.layer, p.from)
        const bx = px(p.layer + 1), by = py(p.layer + 1, p.to)
        const x = ax + (bx - ax) * p.t
        const y = ay + (by - ay) * p.t
        ctx.fillStyle = `rgba(${ICE},0.18)`
        ctx.beginPath(); ctx.arc(x, y, 5, 0, 6.283); ctx.fill()
        ctx.fillStyle = `rgba(${ICE},0.95)`
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, 6.283); ctx.fill()
      }
      pulses = next.slice(-160)

      // units
      for (let l = 0; l < LAYERS.length; l++) {
        for (let i = 0; i < LAYERS[l]; i++) {
          act[l][i] *= Math.exp(-dt * 2.2)
          const a = act[l][i]
          const x = px(l), y = py(l, i)
          const r = ch === 1 ? 4.5 + a * 5 : 4
          if (a > 0.05) {
            ctx.fillStyle = `rgba(${ICE},${(ch === 1 ? 0.35 : 0.15) * a})`
            ctx.beginPath(); ctx.arc(x, y, r + 7 * a, 0, 6.283); ctx.fill()
          }
          ctx.fillStyle = '#05070b'
          ctx.strokeStyle = `rgba(${a > 0.3 ? ICE : INK},${0.5 + 0.5 * a})`
          ctx.lineWidth = 1.2
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.stroke()
        }
      }

      // chapter overlays
      ctx.font = `11px ${FONT_LABEL}`
      ctx.textAlign = 'center'
      const box = (la: number, lb: number, label: string) => {
        const pad = 22
        const top = cy - span / 2 - pad
        const bx = px(la) - pad, bw = px(lb) - px(la) + pad * 2, bh = span + pad * 2
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = `rgba(${ICE},0.45)`
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.roundRect(bx, top, bw, bh, 10); ctx.stroke()
        ctx.setLineDash([])
        ctx.fillStyle = `rgba(${ICE},0.85)`
        ctx.fillText(label, bx + bw / 2, top - 8)
      }
      if (ch === 2) { box(1, 2, 'NORM · ATTENTION'); box(3, 4, 'NORM · ATTENTION') }
      if (ch === 3) { box(0, 1, 'ENCODER'); box(2, 3, 'MEMORY'); box(4, 5, 'POLICY') }
      if (ch === 4) {
        // the agent loop: output acts on the environment, which feeds the input again
        const yb = cy + span / 2 + 34
        ctx.strokeStyle = `rgba(${ICE},0.55)`
        ctx.lineWidth = 1.2
        ctx.setLineDash([5, 5])
        ctx.lineDashOffset = -t * 20
        ctx.beginPath()
        ctx.moveTo(px(5) + 10, cy)
        ctx.bezierCurveTo(px(5) + 60, cy, px(5) + 50, yb, px(5) - 20, yb)
        ctx.lineTo(px(0) + 20, yb)
        ctx.bezierCurveTo(px(0) - 50, yb, px(0) - 60, cy, px(0) - 10, cy)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.fillStyle = `rgba(${ICE},0.85)`
        ctx.fillText('ENVIRONMENT · REWARD', (px(0) + px(5)) / 2, yb + 18)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} className="home-ai-canvas" aria-hidden />
}
