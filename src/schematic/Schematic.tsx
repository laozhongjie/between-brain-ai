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
  useEffect(() => {
    const el = svg.current!
    const vb = { x: 0, y: 0, w: W, h: H }
    const apply = () => el.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`)
    const toSvg = (cx: number, cy: number) => new DOMPoint(cx, cy).matrixTransform(el.getScreenCTM()!.inverse())
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      zoomAt(e.clientX, e.clientY, Math.exp(e.deltaY * 0.0015))
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
      const scale = 1 / el.getScreenCTM()!.a
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
      last = null
    }
    // Narrow screens start zoomed in on the input side; users pan/pinch from there
    const home = () => {
      const narrow = el.clientWidth < 600
      Object.assign(vb, narrow ? { x: 0, y: 30, w: W / 2.2, h: H / 2.2 } : { x: 0, y: 0, w: W, h: H })
      apply()
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
    const layer = root.querySelector<SVGGElement>('.spulses')!
    const dots: SVGCircleElement[] = []
    for (let i = 0; i < MAX_PULSES; i++) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      c.setAttribute('r', '4')
      c.style.display = 'none'
      layer.appendChild(c)
      dots.push(c)
    }

    let raf = 0
    const frame = () => {
      for (const [key, el] of halos) el.style.opacity = String(Math.min(1, keyActivity(key) * 1.3))
      for (const [key, el] of busHalos) el.style.opacity = String(Math.min(1, keyActivity(key) * 1.3))
      SEDGES.forEach((e, i) => {
        let tr = 0
        for (const p of e.paths) tr = Math.max(tr, signals.traffic[p])
        edgeGlow[i].style.setProperty('--tr', tr.toFixed(3))
      })
      let n = 0
      const now = engine.simTime
      for (const p of signals.pulses) {
        if (n >= MAX_PULSES) break
        const fr = (now - p.t0) / p.dur
        const edge = paths.get(HOP_EDGE[p.path][p.hop])
        if (!edge || fr < 0 || fr > 1) continue
        const pt = edge.el.getPointAtLength(fr * edge.len)
        const dot = dots[n++]
        dot.setAttribute('cx', pt.x.toFixed(1))
        dot.setAttribute('cy', pt.y.toFixed(1))
        dot.setAttribute('r', (2.5 + 2.5 * p.strength).toFixed(1))
        dot.style.fill = edge.el.style.stroke
        dot.style.display = ''
      }
      for (let i = n; i < MAX_PULSES; i++) if (dots[i].style.display !== 'none') dots[i].style.display = 'none'
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => {
      cancelAnimationFrame(raf)
      dots.forEach((d) => d.remove())
    }
  }, [])

  const busVisible = (k: BusKey) => !f || f.all.keys.has(k)

  return (
    <div className="schematic">
      <svg ref={svg} preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="sglow" x="-40%" y="-80%" width="180%" height="260%">
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
              <rect data-bushalo={k} x={b.x0} y={b.y - 9} width={b.x1 - b.x0} height={18} rx={9} className="shalo" filter="url(#sglow)" />
              <rect x={b.x0} y={b.y - 9} width={b.x1 - b.x0} height={18} rx={9} className="sbus-bar" />
              <text x={b.x0 + 14} y={b.y + 4}>{t(k === 'brainstem' ? UI.brainstemBus : UI.spinalBus)}</text>
            </g>
          )
        })}

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
              <rect data-halo={n.key} x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} className="shalo" style={{ fill: n.color }} filter="url(#sglow)" />
              <rect x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={12} className="sbox" style={{ stroke: n.ink, fill: n.color + '33' }} />
              <text y={4} textAnchor="middle">{t(n.label)}</text>
            </g>
          ))}
        </g>

        <g className="spulses" />
      </svg>
    </div>
  )
}
