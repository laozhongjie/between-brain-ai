import { useEffect, useRef } from 'react'
import { homeState } from './chapters'
import { AI_LAYERS, BRAIN_N, morphTargets } from './morph'

const clamp = (x: number) => Math.max(0, Math.min(1, x))
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/** Canvas resolution relative to CSS px: the goo filter's blur hides the coarseness. */
const RES = 0.5
const BLOB = 7 // brain droplet radius, px
const STREAM = 5.5 // width of the liquid running along a link, px
const UNIT = 6 // droplet on a unit, px

/**
 * The white halves of the split disc turning into brain | AI as a thick white liquid. The canvas draws
 * plain white shapes; an SVG filter (#home-goo in Home.tsx) blurs their alpha and thresholds it again, so
 * nearby shapes melt into one fluid surface that necks, stretches and beads.
 *
 * As the disc opens, the liquid runs out of the slit as a band (leading edge homeState.flood, trailing edge
 * homeState.front): on the left it washes over the brain from right to left, droplets sliding over points
 * of its surface; on the right it runs along the network's links (to the nearest units of the next layer)
 * from left to right, pooling on the units it passes. Behind the band the real brain | AI are left washed
 * clean (the panels' mask in CSS follows the trailing edge). The white mass at the slit drains as the
 * band leaves it. Clipped to the growing disc.
 */
export function HomeMorph() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    // a fixed size and phase per brain droplet, so the surface wobbles a little and is not uniform
    const size = Float32Array.from({ length: BRAIN_N }, () => 0.7 + Math.random() * 0.6)
    const phase = Float32Array.from({ length: BRAIN_N }, () => Math.random() * 6.283)
    let raf = 0
    let shown = false

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      const m = homeState.morph
      const on = m > 0 && m < 1
      if (on !== shown) { cv.style.visibility = on ? 'visible' : 'hidden'; shown = on }
      if (!on) return
      const w = cv.clientWidth
      const h = cv.clientHeight
      if (cv.width !== Math.round(w * RES) || cv.height !== Math.round(h * RES)) {
        cv.width = Math.round(w * RES)
        cv.height = Math.round(h * RES)
      }
      ctx.setTransform(RES, 0, 0, RES, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#fff'
      ctx.strokeStyle = '#fff'
      ctx.lineCap = 'round'

      // the liquid is a band running out from the slit: its leading edge (flood) and, behind it, the edge
      // where it has washed past (front), both in fractions of a panel from the slit
      const { r0, gap, flood, front } = homeState
      const band = Math.max(0.01, flood - front)
      const t = now / 1000
      const cx = w / 2
      const cy = h / 2
      const pw = cx - gap // panel width

      // the white mass at the slit, draining as the liquid runs out of it
      const mass = r0 * (1 - smooth(0, 0.3, flood))
      if (mass > 0.5) { ctx.beginPath(); ctx.arc(cx, cy, mass, 0, 6.283); ctx.fill() }

      // brain: the band passes over points of its surface (q: distance out from the slit); each droplet
      // arrives sliding outward from the slit side, swells, then is washed away
      const B = morphTargets.brain
      for (let i = 0; i < BRAIN_N; i++) {
        const x = B[i * 2]
        if (Number.isNaN(x)) continue
        const q = clamp((pw - x) / pw)
        const k = smooth(q - 0.03, q + 0.03, flood) * (1 - smooth(q - 0.02, q + 0.06, front))
        if (k <= 0.02) continue
        const since = clamp((flood - q) / band) // 0 as the band arrives, 1 as it leaves
        const rad = BLOB * size[i] * k * (0.85 + 0.35 * Math.sin(Math.PI * since)) * (1 + 0.08 * Math.sin(t * 3 + phase[i]))
        ctx.beginPath(); ctx.arc(x + (1 - since) * 18, B[i * 2 + 1], rad, 0, 6.283); ctx.fill()
      }

      // network: within the band the liquid runs along each link, a bead at its head and one breaking off
      // its tail, and pools on the units it passes
      const A = morphTargets.ai
      const ox = cx + gap
      const lead = flood * pw
      const trail = front * pw
      let base = 0
      for (let l = 0; l < AI_LAYERS.length; l++) {
        const next = base + AI_LAYERS[l]
        for (let i = 0; i < AI_LAYERS[l]; i++) {
          const ax = A[(base + i) * 2]
          if (Number.isNaN(ax)) continue
          const ay = A[(base + i) * 2 + 1]
          const u = smooth(ax - 8, ax + 10, lead) * (1 - smooth(ax - 4, ax + 14, trail))
          if (u > 0.02) { ctx.beginPath(); ctx.arc(ox + ax, ay, UNIT * u, 0, 6.283); ctx.fill() }
          if (l === AI_LAYERS.length - 1) continue
          // only the links to the nearest units of the next layer: all of them would melt into one sheet
          const mid = (i * (AI_LAYERS[l + 1] - 1)) / Math.max(1, AI_LAYERS[l] - 1)
          for (let j = Math.max(0, Math.floor(mid - 1)); j <= Math.min(AI_LAYERS[l + 1] - 1, Math.ceil(mid + 1)); j++) {
            const bx = A[(next + j) * 2]
            const by = A[(next + j) * 2 + 1]
            const span = bx - ax || 1
            const f1 = clamp((lead - ax) / span) // head of the stream along the link
            const f0 = clamp((trail - ax) / span) // its tail
            if (f1 <= f0) continue
            const x0 = ox + ax + (bx - ax) * f0, y0 = ay + (by - ay) * f0
            const x1 = ox + ax + (bx - ax) * f1, y1 = ay + (by - ay) * f1
            ctx.lineWidth = STREAM
            ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
            if (f1 < 1) { ctx.beginPath(); ctx.arc(x1, y1, STREAM * 0.8, 0, 6.283); ctx.fill() }
            if (f0 > 0) {
              // a drop pinching off the tail, trailing a little behind it
              const d = 10 + 4 * Math.sin(t * 4 + i + j)
              ctx.beginPath(); ctx.arc(x0 - ((bx - ax) / Math.hypot(bx - ax, by - ay)) * d, y0 - ((by - ay) / Math.hypot(bx - ax, by - ay)) * d, STREAM * 0.45, 0, 6.283); ctx.fill()
            }
          }
        }
        base = next
      }
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} className="home-morph" aria-hidden />
}
