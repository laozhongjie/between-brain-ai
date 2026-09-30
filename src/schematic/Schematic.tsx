import { useEffect, useMemo, useRef } from 'react'
import { NODES, resolveKey } from '../data/nodes'
import { UI, useT } from '../i18n'
import { currentFocus } from '../scene/focusState'
import { engine } from '../sim/engine'
import { signals } from '../sim/signals'
import { useStore } from '../store'
import { BUSES, COLUMNS, H, HOP_EDGE, NODE_H, NODE_W, SEDGES, SNODES, W, type BusKey } from './layout'

const MAX_PULSES = 220
const KEY_INDICES: Record<string, number[]> = {}
for (const n of NODES) (KEY_INDICES[n.key] ??= []).push(n.index)
const keyActivity = (key: string) => Math.max(...KEY_INDICES[key].map((i) => engine.activity[i]))

/**
 * 2D layered schematic of the whole system, driven by the same simulation as the 3D view.
 * Static SVG is rendered by React; activity, traffic and pulses are updated imperatively each frame.
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
    const box = view.parentElement as HTMLDivElement
    const vb = { x: 0, y: 0, w: W, h: H } // live view
    let shown = { ...vb } // view currently rendered into the SVGs
    // viewBox → local pixels under preserveAspectRatio="xMidYMid meet"
    const map = (v: typeof vb) => {
      const cw = box.clientWidth
      const ch = box.clientHeight
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
      const r = box.getBoundingClientRect()
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
      const narrow = el.clientWidth < 600
      Object.assign(vb, narrow ? { x: 0, y: 30, w: W / 2.2, h: H / 2.2 } : { x: 0, y: 0, w: W, h: H })
      commit()
    }
    const reset = home
    home()
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    el.addEventListener('dblclick', reset)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      el.removeEventListener('dblclick', reset)
      clearTimeout(settle)
    }
  }, [])

  useEffect(() => {
    const root = svg.current!
    const halos = new Map<string, SVGRectElement>()
    root.querySelectorAll<SVGRectElement>('[data-halo]').forEach((el) => halos.set(el.dataset.halo!, el))
    const busHalos = new Map<string, SVGRectElement>()
    root.querySelectorAll<SVGRectElement>('[data-bushalo]').forEach((el) => busHalos.set(el.dataset.bushalo!, el))
    const paths = new Map<string, { el: SVGPathElement; len: number }>()
    root.querySelectorAll<SVGPathElement>('[data-edge]').forEach((el) => paths.set(el.dataset.edge!, { el, len: el.getTotalLength() }))
    const edgeGlow = SEDGES.map((e) => paths.get(e.id)!.el)
    const layer = pulseSvg.current!.querySelector<SVGGElement>('.spulses')!
    // Each pulse is a bright core plus a faint wide halo: a glow without per-dot filters
    const dots: { halo: SVGCircleElement; core: SVGCircleElement; on: boolean }[] = []
    for (let i = 0; i < MAX_PULSES; i++) {
      const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      halo.setAttribute('class', 'sp-halo')
      core.setAttribute('class', 'sp-core')
      halo.style.display = core.style.display = 'none'
      layer.append(halo, core)
      dots.push({ halo, core, on: false })
    }

    // Only touch the diagram when a value visibly changes: every write repaints the whole SVG
    const q = (x: number, step: number) => Math.round(Math.min(1, x) / step) * step
    const lastHalo = new Map<SVGRectElement, number>()
    const setHalo = (el: SVGRectElement, key: string) => {
      const o = q(keyActivity(key) * 1.3, 0.05)
      if (lastHalo.get(el) !== o) {
        lastHalo.set(el, o)
        el.style.opacity = String(o)
      }
    }
    const lastTr = new Float32Array(SEDGES.length).fill(-1)

    let raf = 0
    const frame = () => {
      for (const [key, el] of halos) setHalo(el, key)
      for (const [key, el] of busHalos) setHalo(el, key)
      SEDGES.forEach((e, i) => {
        let tr = 0
        for (const p of e.paths) tr = Math.max(tr, signals.traffic[p])
        tr = q(tr, 0.05)
        if (lastTr[i] !== tr) {
          lastTr[i] = tr
          edgeGlow[i].style.setProperty('--tr', tr.toFixed(2))
        }
      })
      let n = 0
      const now = engine.simTime
      for (const p of signals.pulses) {
        if (n >= MAX_PULSES) break
        const fr = (now - p.t0) / p.dur
        const edge = paths.get(HOP_EDGE[p.path][p.hop])
        if (!edge || fr < 0 || fr > 1) continue
        const pt = edge.el.getPointAtLength(fr * edge.len)
        const d = dots[n++]
        const x = pt.x.toFixed(1)
        const y = pt.y.toFixed(1)
        const r = 2.5 + 2.5 * p.strength
        const color = edge.el.style.stroke
        d.core.setAttribute('cx', x); d.core.setAttribute('cy', y); d.core.setAttribute('r', r.toFixed(1))
        d.halo.setAttribute('cx', x); d.halo.setAttribute('cy', y); d.halo.setAttribute('r', (r * 2.6).toFixed(1))
        d.core.style.fill = d.halo.style.fill = color
        if (!d.on) {
          d.on = true
          d.core.style.display = d.halo.style.display = ''
        }
      }
      for (let i = n; i < MAX_PULSES; i++) {
        const d = dots[i]
        if (d.on) {
          d.on = false
          d.core.style.display = d.halo.style.display = 'none'
        }
      }
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => {
      cancelAnimationFrame(raf)
      dots.forEach((d) => { d.halo.remove(); d.core.remove() })
    }
  }, [])

  const busVisible = (k: BusKey) => !f || f.all.keys.has(k)

  return (
    <div className="schematic">
      <div className="schem-view">
        <svg ref={svg} preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="sglow" x="-3%" y="-6%" width="106%" height="112%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="context-stroke" />
            </marker>
          </defs>

          {COLUMNS.map((c, i) => (
            <text key={i} className="scol" x={(c.x0 + c.x1) / 2} y={20} textAnchor="middle">{t(c.label)}</text>
          ))}

          {(Object.keys(BUSES) as BusKey[]).map((k) => {
            const b = BUSES[k]
            const id = resolveKey(k)!
            return (
              <g key={k} className={`sbus ${busVisible(k) ? '' : 'dim'} ${selKey === k ? 'sel' : ''}`} onClick={() => pick(id)}>
                <rect x={b.x0} y={b.y - 9} width={b.x1 - b.x0} height={18} rx={9} className="sbus-bar" />
                <text x={b.x0 + 14} y={b.y + 4}>{t(k === 'brainstem' ? UI.brainstemBus : UI.spinalBus)}</text>
              </g>
            )
          })}

          {/* All activity halos share one blur pass (a filter per halo would re-blur ~75 surfaces every repaint) */}
          <g className="shalos" filter="url(#sglow)">
            {(Object.keys(BUSES) as BusKey[]).map((k) => {
              const b = BUSES[k]
              return <rect key={k} data-bushalo={k} x={b.x0} y={b.y - 9} width={b.x1 - b.x0} height={18} rx={9} className={`shalo bus ${busVisible(k) ? '' : 'dim'}`} />
            })}
            {SNODES.map((n) => (
              <rect key={n.key} data-halo={n.key} x={n.x - NODE_W / 2} y={n.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={12}
                className={`shalo ${nodeClass(n.key).includes('dim') ? 'dim' : ''}`} style={{ fill: n.color }} />
            ))}
          </g>

          <g className="sedges">
            {SEDGES.map((e) => (
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
            {SNODES.map((n) => (
              <g key={n.key} className={nodeClass(n.key)} transform={`translate(${n.x},${n.y})`} onClick={() => pick(resolveKey(n.key))}>
                <rect x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} className="sbox" style={{ stroke: n.ink, fill: n.color + '33' }} />
                <text y={4} textAnchor="middle">{t(n.label)}</text>
              </g>
            ))}
          </g>

        </svg>
        <svg ref={pulseSvg} className="spulse-layer" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <g className="spulses" />
        </svg>
      </div>
    </div>
  )
}
