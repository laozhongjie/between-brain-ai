import { useEffect, useRef } from 'react'
import { onFrame } from '../sim/loop'
import { homeState } from './chapters'

const INK = '230,235,242'
const ICE = '125,211,252'

/**
 * The hero's backdrop, two textures meeting at the centre slit: on the left, neurons drifting on a smooth
 * flow field with soft links and the odd spike; on the right, an ordered lattice with signals running along
 * its lines. Both fade toward the centre and the edges. Stops drawing once the hero has scrolled away.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = 110
    const cells = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), fire: 0, seed: Math.random() * 100 }))
    type Run = { x: number; y: number; dx: number; dy: number; left: number }
    let runs: Run[] = []
    let last = performance.now()
    let t = 0

    const draw = (now: number) => {
      if (homeState.hero >= 1) return // hero gone: idle
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!reduced) t += dt
      const dpr = Math.min(devicePixelRatio, 2)
      const w = cv.clientWidth
      const h = cv.clientHeight
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
        cv.width = Math.round(w * dpr)
        cv.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      // fade toward the centre slit and the outer edges
      const fade = (x: number, y: number) => {
        const dc = Math.abs(x - cx) / (w / 2)
        const centre = Math.min(1, Math.max(0, (dc - 0.12) / 0.25))
        const edge = Math.min(1, Math.max(0, (1 - dc) / 0.12))
        const vy = Math.min(1, Math.max(0, Math.min(y, h - y) / (h * 0.22)))
        return centre * edge * vy
      }

      // left: biological, organic motion
      const L = cells.map((c) => {
        const fx = Math.sin(c.y * 6 + t * 0.21 + c.seed) + Math.sin(c.x * 3.1 - t * 0.13)
        const fy = Math.cos(c.x * 5 - t * 0.17 + c.seed) + Math.sin(c.y * 2.3 + t * 0.11)
        c.x = (c.x + fx * dt * 0.006 + 1) % 1
        c.y = (c.y + fy * dt * 0.006 + 1) % 1
        if (!reduced && Math.random() < dt * 0.05) c.fire = 1
        c.fire *= Math.exp(-dt * 2.5)
        return { x: c.x * (w * 0.46), y: c.y * h, f: c.fire }
      })
      ctx.lineWidth = 0.7
      for (let i = 0; i < L.length; i++) {
        for (let j = i + 1; j < L.length; j++) {
          const d = Math.hypot(L[i].x - L[j].x, L[i].y - L[j].y)
          if (d > 92) continue
          const a = (1 - d / 92) * 0.16 * Math.min(fade(L[i].x, L[i].y), fade(L[j].x, L[j].y))
          const hot = Math.max(L[i].f, L[j].f)
          ctx.strokeStyle = `rgba(${hot > 0.2 ? ICE : INK},${a * (1 + hot * 3)})`
          ctx.beginPath(); ctx.moveTo(L[i].x, L[i].y); ctx.lineTo(L[j].x, L[j].y); ctx.stroke()
        }
      }
      for (const p of L) {
        const a = fade(p.x, p.y)
        if (p.f > 0.05) {
          ctx.fillStyle = `rgba(${ICE},${0.25 * p.f * a})`
          ctx.beginPath(); ctx.arc(p.x, p.y, 3 + 9 * p.f, 0, 6.283); ctx.fill()
        }
        ctx.fillStyle = `rgba(${p.f > 0.2 ? ICE : INK},${(0.45 + 0.5 * p.f) * a})`
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.3 + p.f, 0, 6.283); ctx.fill()
      }

      // right: computational, an ordered lattice with signals on its lines
      const S = 34
      const gx0 = Math.ceil((w * 0.54) / S) * S
      for (let x = gx0; x < w; x += S) {
        for (let y = S; y < h; y += S) {
          const a = fade(x, y)
          if (a <= 0) continue
          ctx.fillStyle = `rgba(${INK},${0.55 * a})`
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
      }
      if (!reduced && Math.random() < dt * 2.2 && runs.length < 14) {
        const horiz = Math.random() < 0.6
        const col = gx0 + Math.floor(Math.random() * ((w - gx0) / S)) * S
        const row = S + Math.floor(Math.random() * ((h - S) / S)) * S
        runs.push({ x: col, y: row, dx: horiz ? (Math.random() < 0.5 ? -1 : 1) : 0, dy: horiz ? 0 : Math.random() < 0.5 ? -1 : 1, left: S * (3 + Math.floor(Math.random() * 6)) })
      }
      runs = runs.filter((r) => r.left > 0)
      for (const r of runs) {
        const step = Math.min(r.left, dt * 140)
        r.x += r.dx * step
        r.y += r.dy * step
        r.left -= step
        const a = fade(r.x, r.y)
        const g = ctx.createLinearGradient(r.x - r.dx * 40, r.y - r.dy * 40, r.x, r.y)
        g.addColorStop(0, `rgba(${ICE},0)`)
        g.addColorStop(1, `rgba(${ICE},${0.8 * a})`)
        ctx.strokeStyle = g
        ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.moveTo(r.x - r.dx * 40, r.y - r.dy * 40); ctx.lineTo(r.x, r.y); ctx.stroke()
        ctx.fillStyle = `rgba(${ICE},${a})`
        ctx.fillRect(r.x - 1.25, r.y - 1.25, 2.5, 2.5)
      }
    }
    return onFrame(draw)
  }, [])

  return <canvas ref={ref} className="hero-field" aria-hidden />
}
