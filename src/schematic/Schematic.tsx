import { useEffect, useMemo, useRef, useState } from 'react'
import { NODES, resolveKey } from '../data/nodes'
import { UI, useT } from '../i18n'
import { currentFocus } from '../scene/focusState'
import { engine } from '../sim/engine'
import { onFrame } from '../sim/loop'
import { signals } from '../sim/signals'
import { useStore } from '../store'
import { BASE_H, HOP_EDGE, NODE_H, NODE_W, W, makeLayout, type BusKey } from './layout'
import type { Pulse } from '../sim/signals'

const MAX_PULSES = 220
/** Comet tail behind each pulse: nested dashes along the edge, longest faintest (length in diagram units) */
const TAIL = 96
const TAIL_PARTS = [
  { len: 1, width: 2.4, alpha: 0.16 },
  { len: 0.55, width: 2.8, alpha: 0.3 },
  { len: 0.24, width: 3.2, alpha: 0.55 },
]
/** Seconds for an arrival flash to fade out */
const FLASH_FADE = 1.1
/** Strongest opacity of the steady activity glow, and how fast it follows activity (per second) */
const GLOW_MAX = 0.5
const GLOW_RATE = 5
/** Activity range stretched onto the glow: resting nodes (~0.06) stay dark, busy ones (~0.3) light fully */
const GLOW_LO = 0.07
const GLOW_HI = 0.3
/** Background glow per brain state: teal awake, cooler and brighter focused, deep blue asleep, violet dreaming */
const STATE_GLOW = {
  wake: 'rgba(40,120,165,0.36)',
  focus: 'rgba(70,160,215,0.44)',
  nrem: 'rgba(35,60,175,0.36)',
  rem: 'rgba(125,80,205,0.38)',
} as const
/** Simulation node indices behind each schematic key (both hemispheres) */
const INDICES = new Map<string, number[]>()
for (const n of NODES) INDICES.set(n.key, [...(INDICES.get(n.key) ?? []), n.index])

/**
 * 2D layered schematic of the whole system, driven by the same simulation as the 3D view.
 * The diagram itself is static SVG rendered by React; pulses and the flash of the node a pulse
 * arrives at are drawn imperatively each frame in a separate overlay layer.
 */
export function Schematic() {
  const t = useT()
  const selected = useStore((s) => s.selected)
  const focus = useStore((s) => s.focus)
  const focusStep = useStore((s) => s.focusStep)
  const select = useStore((s) => s.select)
  const svg = useRef<SVGSVGElement>(null)
  // Pulses live in their own overlay SVG (own compositing layer) so moving dots don't repaint the whole diagram
  const pulseSvg = useRef<SVGSVGElement>(null)
  const dragged = useRef(false)
  const pick = (id: string | undefined) => {
    if (!dragged.current && id) select(id)
  }

  // Background glow tinted by the brain state (CSS eases the change over ~20 s, see .atlas.view-schematic)
  useEffect(() => {
    const app = svg.current?.closest<HTMLElement>('.atlas')
    if (!app) return
    const tint = () => {
      const st = engine.state
      app.style.setProperty('--state-glow', STATE_GLOW[st.stage === 'wake' ? (st.focus > 0.6 ? 'focus' : 'wake') : st.stage])
    }
    tint()
    const id = setInterval(tint, 1000)
    return () => {
      clearInterval(id)
      app.style.removeProperty('--state-glow')
    }
  }, [])

  // Stretch the layout vertically so the diagram fills its panel exactly (node and text sizes stay fixed)
  const box = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(1)
  useEffect(() => {
    const el = box.current!
    const fit = () => {
      if (!el.clientWidth || !el.clientHeight) return
      if (matchMedia('(max-width: 760px)').matches) { setK(1); return }
      const target = (W * el.clientHeight) / el.clientWidth // viewBox height matching the panel's aspect
      const next = Math.round(Math.min(1.8, Math.max(1, (target - 30) / (BASE_H - 30))) * 50) / 50
      setK(next)
    }
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    fit()
    return () => ro.disconnect()
  }, [])
  const layout = useMemo(() => makeLayout(k), [k])
  const { H, buses, zones, lanes, stages, nodes, edges } = layout

  const selKey = selected ? selected.replace(/^(lh|rh)\./, '') : null
  const f = useMemo(() => currentFocus(), [focus, focusStep]) // eslint-disable-line react-hooks/exhaustive-deps

  const nodeClass = (key: string) => {
    if (f) return f.step.keys.has(key) ? 'snode step' : f.all.keys.has(key) ? 'snode' : 'snode dim'
    return key === selKey ? 'snode sel' : 'snode'
  }
  const edgeClass = (paths: number[], from: string, to: string) => {
    if (f) return paths.some((p) => f.step.paths.has(p)) ? 'sedge step' : paths.some((p) => f.all.paths.has(p)) ? 'sedge' : 'sedge hidden'
    if (selKey) return from === selKey || to === selKey ? 'sedge sel' : 'sedge faint'
    return 'sedge'
  }

  // Zoom (wheel, around the cursor) and pan (drag); double-click resets. viewBox is managed here, not by React.
  // While a gesture runs the already-rasterised diagram is moved with a CSS transform (compositor only);
  // the new viewBox is committed once the gesture ends, so the SVG re-rasterises once instead of every frame.
  useEffect(() => {
    const el = svg.current!
    const overlay = pulseSvg.current!
    const view = el.parentElement as HTMLDivElement
    const panel = view.parentElement as HTMLDivElement
    const vb = { x: 0, y: 0, w: W, h: H } // live view
    let shown = { ...vb } // view currently rendered into the SVGs
    // viewBox → local pixels under preserveAspectRatio="xMidYMid meet"
    const map = (v: typeof vb) => {
      const cw = panel.clientWidth
      const ch = panel.clientHeight
      const s = Math.min(cw / v.w, ch / v.h)
      return { s, ox: (cw - v.w * s) / 2 - v.x * s, oy: (ch - v.h * s) / 2 - v.y * s }
    }
    const commit = () => {
      clearTimeout(settle)
      const v = `${vb.x} ${vb.y} ${vb.w} ${vb.h}`
      el.setAttribute('viewBox', v)
      overlay.setAttribute('viewBox', v)
      shown = { ...vb }
      view.style.transform = ''
      view.classList.remove('moving')
    }
    let settle = 0
    const apply = () => {
      const a = map(shown)
      const b = map(vb)
      const k = b.s / a.s
      view.classList.add('moving')
      view.style.transform = `translate(${b.ox - k * a.ox}px, ${b.oy - k * a.oy}px) scale(${k})`
    }
    const toSvg = (cx: number, cy: number) => {
      const r = panel.getBoundingClientRect()
      const m = map(vb)
      return { x: (cx - r.left - m.ox) / m.s, y: (cy - r.top - m.oy) / m.s }
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      zoomAt(e.clientX, e.clientY, Math.exp(e.deltaY * 0.0015))
      clearTimeout(settle)
      settle = window.setTimeout(commit, 140)
    }
    const zoomAt = (cx: number, cy: number, k: number) => {
      const p = toSvg(cx, cy)
      k = Math.min(Math.max(k, 300 / vb.w), (W * 1.3) / vb.w)
      vb.x = p.x - (p.x - vb.x) * k
      vb.y = p.y - (p.y - vb.y) * k
      vb.w *= k
      vb.h *= k
      apply()
    }
    let last: { x: number; y: number } | null = null
    let moved = 0
    // Two-finger pinch on touch screens
    const touches = new Map<number, { x: number; y: number }>()
    let pinchDist = 0
    const onDown = (e: PointerEvent) => {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      last = { x: e.clientX, y: e.clientY }
      moved = 0
      dragged.current = false
      if (touches.size === 2) {
        const [a, b] = [...touches.values()]
        pinchDist = Math.hypot(a.x - b.x, a.y - b.y)
      }
    }
    const onMove = (e: PointerEvent) => {
      if (touches.has(e.pointerId)) touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (touches.size === 2) {
        const [a, b] = [...touches.values()]
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (pinchDist > 0) zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, pinchDist / d)
        pinchDist = d
        dragged.current = true
        return
      }
      if (!last || !e.buttons) return
      const scale = 1 / map(vb).s
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      moved += Math.abs(dx) + Math.abs(dy)
      if (moved > 5) dragged.current = true
      vb.x -= dx * scale
      vb.y -= dy * scale
      last = { x: e.clientX, y: e.clientY }
      apply()
    }
    const onUp = (e: PointerEvent) => {
      touches.delete(e.pointerId)
      pinchDist = 0
      if (last && moved > 0) commit()
      last = null
    }
    // Narrow screens start zoomed in on the input side; users pan/pinch from there
    const home = () => {
      if (matchMedia('(max-width: 760px)').matches) {
        Object.assign(vb, { x: 0, y: 0, w: W, h: H })
        commit()
        return
      }
      const narrow = el.clientWidth < 600
      Object.assign(vb, narrow ? { x: 0, y: 30, w: W / 2.2, h: H / 2.2 } : { x: 0, y: 0, w: W, h: H })
      commit()
    }
    const reset = home
    home()
    const resize = new ResizeObserver(() => { if (matchMedia('(max-width: 760px)').matches) home() })
    resize.observe(panel)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    el.addEventListener('dblclick', reset)
    return () => {
      resize.disconnect()
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      el.removeEventListener('dblclick', reset)
      clearTimeout(settle)
    }
  }, [H])

  useEffect(() => {
    const root = svg.current!
    const overlay = pulseSvg.current!
    const flashEls = new Map<string, SVGRectElement>()
    overlay.querySelectorAll<SVGRectElement>('[data-flash]').forEach((el) => flashEls.set(el.dataset.flash!, el))
    // Steady glow: each node lit by its current activity (the more active hemisphere), smoothed
    const glows = [...overlay.querySelectorAll<SVGRectElement>('[data-glow]')].map((el) => ({ el, idx: INDICES.get(el.dataset.glow!) ?? [], level: 0 }))
    const paths = new Map<string, { el: SVGPathElement; len: number }>()
    root.querySelectorAll<SVGPathElement>('[data-edge]').forEach((el) => paths.set(el.dataset.edge!, { el, len: el.getTotalLength() }))
    const layer = overlay.querySelector<SVGGElement>('.spulses')!
    // Each pulse is a bright core plus a faint wide halo (a glow without per-dot filters), trailing a comet
    // tail: copies of its edge path shown only as a dash ending at the pulse
    const svgNS = 'http://www.w3.org/2000/svg'
    const dots: { halo: SVGCircleElement; core: SVGCircleElement; tail: SVGPathElement[]; d: string; on: boolean }[] = []
    for (let i = 0; i < MAX_PULSES; i++) {
      const tail = TAIL_PARTS.map((part) => {
        const el = document.createElementNS(svgNS, 'path')
        el.setAttribute('class', 'sp-tail')
        el.style.strokeWidth = String(part.width)
        el.style.opacity = String(part.alpha)
        return el
      })
      const halo = document.createElementNS(svgNS, 'circle')
      const core = document.createElementNS(svgNS, 'circle')
      halo.setAttribute('class', 'sp-halo')
      core.setAttribute('class', 'sp-core')
      for (const el of [...tail, halo, core]) el.style.display = 'none'
      layer.append(...tail, halo, core)
      dots.push({ halo, core, tail, d: '', on: false })
    }

    // A node flashes once when a pulse finishes its hop into it, then fades
    const flash = new Map<string, number>()
    const arrive = (p: Pulse) => {
      const to = HOP_EDGE[p.path][p.hop]?.split('>')[1]
      if (to && flashEls.has(to)) flash.set(to, 1)
    }
    let inFlight = new Set<Pulse>()

    let wall = performance.now()
    const frame = () => {
      const t = performance.now()
      const dt = Math.min(0.1, (t - wall) / 1000)
      wall = t
      let n = 0
      const now = engine.simTime
      // Arrivals: pulses that reached the end of their hop, or left the list since the last frame
      const current = new Set(signals.pulses)
      for (const p of inFlight) if (!current.has(p)) arrive(p)
      inFlight = new Set()
      for (const p of signals.pulses) {
        if ((now - p.t0) / p.dur >= 1) arrive(p)
        else inFlight.add(p)
      }
      const act = engine.activity
      for (const g of glows) {
        let a = 0
        for (const i of g.idx) a = Math.max(a, act[i])
        const target = Math.min(1, Math.max(0, (a - GLOW_LO) / (GLOW_HI - GLOW_LO)))
        g.level += (target - g.level) * Math.min(1, dt * GLOW_RATE)
        g.el.style.opacity = (g.level * GLOW_MAX).toFixed(3)
      }
      for (const [key, level] of flash) {
        const el = flashEls.get(key)!
        const next = level - dt / FLASH_FADE
        if (next <= 0) {
          flash.delete(key)
          el.style.display = 'none'
        } else {
          flash.set(key, next)
          el.style.display = ''
          el.style.opacity = (next ** 1.4).toFixed(3) // ease-out fade
        }
      }
      for (const p of signals.pulses) {
        if (n >= MAX_PULSES) break
        const fr = (now - p.t0) / p.dur
        const edge = paths.get(HOP_EDGE[p.path][p.hop])
        if (!edge || fr < 0 || fr > 1) continue
        const at = fr * edge.len
        const pt = edge.el.getPointAtLength(at)
        const d = dots[n++]
        const x = pt.x.toFixed(1)
        const y = pt.y.toFixed(1)
        const r = 2.5 + 2.5 * p.strength
        const color = edge.el.style.stroke
        d.core.setAttribute('cx', x); d.core.setAttribute('cy', y); d.core.setAttribute('r', r.toFixed(1))
        d.halo.setAttribute('cx', x); d.halo.setAttribute('cy', y); d.halo.setAttribute('r', (r * 2.6).toFixed(1))
        d.core.style.fill = d.halo.style.fill = color
        // tail: the stretch of the edge just behind the pulse, never reaching back past the edge's start
        const path = edge.el.getAttribute('d') ?? ''
        const reach = TAIL * (0.7 + 0.6 * p.strength)
        d.tail.forEach((el, k) => {
          if (d.d !== path) el.setAttribute('d', path)
          const len = Math.min(at, reach * TAIL_PARTS[k].len)
          el.style.strokeDasharray = `${len.toFixed(1)} 100000`
          el.style.strokeDashoffset = (len - at).toFixed(1)
          el.style.stroke = color
        })
        d.d = path
        if (!d.on) {
          d.on = true
          for (const el of [...d.tail, d.halo, d.core]) el.style.display = ''
        }
      }
      for (let i = n; i < MAX_PULSES; i++) {
        const d = dots[i]
        if (d.on) {
          d.on = false
          for (const el of [...d.tail, d.halo, d.core]) el.style.display = 'none'
        }
      }
    }
    frame()
    const off = onFrame(frame)
    return () => {
      off()
      dots.forEach((d) => { d.halo.remove(); d.core.remove(); d.tail.forEach((el) => el.remove()) })
    }
  }, [layout])

  const busVisible = (k: BusKey) => !f || f.all.keys.has(k)

  return (
    <div className="schematic" ref={box}>
      <div className="schem-view">
        <svg ref={svg} preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="context-stroke" />
            </marker>
          </defs>

          {/* Zones: input · the brain's internal loop · output */}
          {zones.map((z, i) => (
            <g key={i}>
              <rect className="szone" x={z.x0} y={z.y0} width={z.x1 - z.x0} height={z.y1 - z.y0} rx={16} />
              <text className="szone-title" x={(z.x0 + z.x1) / 2} y={18} textAnchor="middle" dominantBaseline="central">{t(z.label)}</text>
            </g>
          ))}
          {/* Processing stages: faint vertical bands over their columns, labelled on the top edge */}
          {stages.map((st, i) => {
            const cx = (st.x0 + st.x1) / 2
            const label = t(st.label)
            const tw = label.length * 11 + 24
            return (
              <g key={i} className="sstage">
                <rect className="sstage-box" x={st.x0} y={st.y0} width={st.x1 - st.x0} height={st.y1 - st.y0} rx={12} />
                <rect className="sstage-tag" x={cx - tw / 2} y={st.y0 - 9} width={tw} height={18} rx={9} />
                <text className="scol" x={cx} y={st.y0} textAnchor="middle" dominantBaseline="central">{label}</text>
              </g>
            )
          })}
          {/* Functional lanes, labelled on their top edge */}
          {lanes.map((l, i) => {
            const cx = (l.x0 + l.x1) / 2
            const label = t(l.label)
            const tw = label.length * 10 + 24
            return (
              <g key={i} className="slane" style={{ '--c': l.color } as React.CSSProperties}>
                <rect className="slane-box" x={l.x0} y={l.y0} width={l.x1 - l.x0} height={l.y1 - l.y0} rx={12} />
                <rect className="slane-tag" x={cx - tw / 2} y={l.y0 - 8} width={tw} height={16} rx={8} />
                <text className="slane-text" x={cx} y={l.y0} textAnchor="middle" dominantBaseline="central">{label}</text>
              </g>
            )
          })}

          {(Object.keys(buses) as BusKey[]).map((key) => {
            const b = buses[key]
            const id = resolveKey(key)!
            return (
              <g key={key} className={`sbus ${busVisible(key) ? '' : 'dim'} ${selKey === key ? 'sel' : ''}`} onClick={() => pick(id)}>
                <rect x={b.x0} y={b.y - 9} width={b.x1 - b.x0} height={18} rx={9} className="sbus-bar" />
                <text x={(b.x0 + b.x1) / 2} y={b.y} textAnchor="middle" dominantBaseline="central">{t(key === 'brainstem' ? UI.brainstemBus : UI.spinalBus)}</text>
              </g>
            )
          })}

          <g className="sedges">
            {edges.map((e) => (
              <path
                key={e.id}
                data-edge={e.id}
                d={e.d}
                className={`${edgeClass(e.paths, e.from, e.to)} ${e.inhib ? 'inhib' : ''}`}
                style={{ stroke: e.color }}
                markerEnd="url(#arrow)"
              />
            ))}
          </g>

          <g className="snodes">
            {nodes.map((n) => (
              <g key={n.key} className={nodeClass(n.key)} transform={`translate(${n.x},${n.y})`} onClick={() => pick(resolveKey(n.key))}>
                <rect x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} className="sbox" style={{ stroke: n.ink, fill: n.color + '33' }} />
                <text y={0} textAnchor="middle" dominantBaseline="central">{t(n.label)}</text>
              </g>
            ))}
          </g>

        </svg>
        <svg ref={pulseSvg} className="spulse-layer" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            {/* glowing outline: blurred copy under the crisp stroke */}
            <filter id="sflash" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* steady activity glow under the flashes: unfiltered, so updating every node each frame stays cheap */}
          <g className="sglow-layer">
            {(Object.keys(buses) as BusKey[]).map((key) => {
              const b = buses[key]
              return <rect key={key} data-glow={key} x={b.x0} y={b.y - 9} width={b.x1 - b.x0} height={18} rx={9}
                className={`sglow ${busVisible(key) ? '' : 'dim'}`} style={{ fill: 'var(--mint)', opacity: 0 }} />
            })}
            {nodes.map((n) => (
              <rect key={n.key} data-glow={n.key} x={n.x - NODE_W / 2} y={n.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={12}
                className={`sglow ${nodeClass(n.key).includes('dim') ? 'dim' : ''}`} style={{ fill: n.color, opacity: 0 }} />
            ))}
          </g>
          {/* only flashing nodes are displayed, so the blur covers just those few; screen-blended, so the
              flash brightens the box and its text stays readable */}
          <g filter="url(#sflash)" className="sflash-layer">
            {(Object.keys(buses) as BusKey[]).map((key) => {
              const b = buses[key]
              return <rect key={key} data-flash={key} x={b.x0} y={b.y - 9} width={b.x1 - b.x0} height={18} rx={9}
                className={`sflash ${busVisible(key) ? '' : 'dim'}`} style={{ stroke: 'var(--mint)', fill: 'var(--mint)', display: 'none' }} />
            })}
            {nodes.map((n) => (
              <rect key={n.key} data-flash={n.key} x={n.x - NODE_W / 2} y={n.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={12}
                className={`sflash ${nodeClass(n.key).includes('dim') ? 'dim' : ''}`} style={{ stroke: n.ink, fill: n.color, display: 'none' }} />
            ))}
          </g>
          <g className="spulses" />
        </svg>
      </div>
    </div>
  )
}
