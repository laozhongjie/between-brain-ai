import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { NODES, NODE_BY_ID, REGION_META, type GraphNode } from '../data/nodes'
import { LOBES, SYSTEMS } from '../data/regions'
import type { Bi } from '../data/types'
import { useStore } from '../store'
import { currentFocus } from './focusState'
import { BRAIN_CENTER, hemiOffset, isCortex, nodePosition } from './layout'

/** DOM layer the labels are rendered into (set by App). */
export const labelLayer: { el: HTMLDivElement | null } = { el: null }

interface Label {
  el: HTMLDivElement
  text: Bi
  pos: THREE.Vector3
  /** outward direction used for back-face culling; null = always facing */
  normal: THREE.Vector3 | null
  node?: GraphNode
  lobeLevel: boolean
  hemi?: string
  base: THREE.Vector3
}

const LOBE_KEYS = ['frontal', 'parietal', 'temporal', 'occipital'] as const
const FAR = 3.6 // camera distance beyond which only lobe labels show
const v = new THREE.Vector3()
const tmpP = new THREE.Vector3()
const tmpQ = new THREE.Vector3()
const toCam = new THREE.Vector3()

/** Centre of one hemisphere: outward direction from here approximates the cortical surface normal. */
const hemiCenter = (hemi?: string) => BRAIN_CENTER.clone().setX(hemi === 'lh' ? -0.35 : hemi === 'rh' ? 0.35 : 0)

/** Brain bounding box in three.js coordinates (union of all mesh regions), used to find free space around it on screen. */
const BOX_MIN = new THREE.Vector3(Infinity, Infinity, Infinity)
const BOX_MAX = new THREE.Vector3(-Infinity, -Infinity, -Infinity)
for (const m of Object.values(REGION_META)) {
  BOX_MIN.min(new THREE.Vector3(...m.bboxMin))
  BOX_MAX.max(new THREE.Vector3(...m.bboxMax))
}
const corner = new THREE.Vector3()
const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x))

/**
 * Hover callout: a card placed in the free space outside the brain's silhouette, joined to the hovered
 * structure by a dashed elbow leader. Falls back to the small inline label when zoomed in too far.
 */
function makeCallout() {
  const root = document.createElement('div')
  root.className = 'callout'
  root.innerHTML =
    '<svg class="co-svg"><polyline class="co-draw" pathLength="1"/><polyline class="co-dash"/>' +
    '<circle class="co-ring" r="7"/><circle class="co-dot" r="2.6"/><circle class="co-joint" r="2"/></svg>' +
    '<div class="co-card"><div class="co-inner"><div class="co-title"></div><div class="co-sub"><i></i><span></span></div></div></div>'
  const q = <T extends Element>(sel: string) => root.querySelector(sel) as T
  return {
    root,
    draw: q<SVGPolylineElement>('.co-draw'), dash: q<SVGPolylineElement>('.co-dash'),
    ring: q<SVGCircleElement>('.co-ring'), dot: q<SVGCircleElement>('.co-dot'), joint: q<SVGCircleElement>('.co-joint'),
    card: q<HTMLDivElement>('.co-card'), title: q<HTMLDivElement>('.co-title'), swatch: q<HTMLElement>('.co-sub i'), sub: q<HTMLSpanElement>('.co-sub span'),
    key: '', w: 0, h: 0, fresh: true,
    // smoothed elbow and card position
    ex: 0, ey: 0, cx: 0, cy: 0,
  }
}

function makeEl(cls: string) {
  const el = document.createElement('div')
  el.className = cls
  el.style.display = 'none'
  return el
}

export function Labels() {
  const { camera, size } = useThree()
  const lang = useStore((s) => s.lang)
  const co = useMemo(makeCallout, [])

  const labels = useMemo(() => {
    const list: Label[] = []
    for (const n of NODES) {
      if (n.inert) continue
      const base = new THREE.Vector3(...n.anchor)
      // Outward direction for back-face culling. Deep nuclei/subcortex only show when the cortex is faded.
      const deep = n.kind === 'nucleus' || n.info.lobe === 'subcortical'
      const normal = deep ? null : base.clone().sub(isCortex(n) ? hemiCenter(n.hemi) : BRAIN_CENTER).normalize()
      const el = makeEl(`label label-${n.kind}`)
      el.dataset.id = n.id
      list.push({ el, text: n.info.name, pos: new THREE.Vector3(), normal, node: n, lobeLevel: false, hemi: n.hemi, base })
    }
    // Lobe labels: centroid of each hemisphere's lobe regions
    for (const hemi of ['lh', 'rh']) {
      for (const lobe of LOBE_KEYS) {
        const members = NODES.filter((n) => n.hemi === hemi && n.kind === 'mesh' && n.info.lobe === lobe)
        const c = new THREE.Vector3()
        members.forEach((m) => c.add(new THREE.Vector3(...m.anchor)))
        c.divideScalar(members.length)
        const normal = c.clone().sub(hemiCenter(hemi)).normalize()
        c.addScaledVector(normal, 0.12)
        list.push({ el: makeEl('label label-lobe'), text: LOBES[lobe], pos: new THREE.Vector3(), normal, lobeLevel: true, hemi, base: c })
      }
    }
    return list
  }, [])

  useEffect(() => {
    const layer = labelLayer.el
    if (!layer) return
    for (const l of labels) layer.appendChild(l.el)
    layer.appendChild(co.root)
    const onClick = (e: MouseEvent) => {
      const id = (e.target as HTMLElement).dataset.id
      if (id) useStore.getState().select(id)
    }
    layer.addEventListener('click', onClick)
    return () => {
      layer.removeEventListener('click', onClick)
      for (const l of labels) l.el.remove()
      co.root.remove()
    }
  }, [labels, co])

  useEffect(() => {
    for (const l of labels) l.el.textContent = l.text[lang]
  }, [labels, lang])

  useFrame(() => {
    const { view, hovered, selected, lang } = useStore.getState()
    const dist = camera.position.distanceTo(BRAIN_CENTER)
    const far = dist > FAR
    const seeInside = view.cortexOpacity < 0.6
    const placed: [number, number, number, number][] = []
    const f = currentFocus()
    // Focus mode: one label per structure (the hemisphere nearer the camera), current step first
    const nearer = new Map<string, string>()
    if (f) {
      for (const id of f.all.nodes) {
        const n = NODE_BY_ID[id]
        const prev = nearer.get(n.key)
        const d = nodePosition(n, view.explode, true, tmpP).distanceTo(camera.position)
        if (!prev || d < nodePosition(NODE_BY_ID[prev], view.explode, true, tmpQ).distanceTo(camera.position)) nearer.set(n.key, id)
      }
    }

    const calloutRect = updateCallout(hovered !== selected ? hovered : null, view.explode, lang)
    if (calloutRect) placed.push(calloutRect)

    // Selected, hovered and current-step labels first so they win overlap tests
    const order = labels.slice().sort((a, b) => rank(b) - rank(a))
    function rank(l: Label) {
      if (!l.node) return 0
      if (l.node.id === selected) return 4
      if (l.node.id === hovered) return 3
      return f?.step.nodes.has(l.node.id) ? 2 : 0
    }

    for (const l of order) {
      const id = l.node?.id
      // The hovered structure is shown by the callout instead of its small label
      if (calloutRect && id === hovered) {
        l.el.style.display = 'none'
        continue
      }
      const forced = id !== undefined && (id === selected || id === hovered)
      let show = forced
      if (f) {
        show = forced || (!!l.node && nearer.get(l.node.key) === l.node.id)
      } else if (!forced && view.showLabels) {
        if (l.lobeLevel) show = far && view.cortexOpacity > 0.3 && camera.position.x * (l.hemi === 'lh' ? -1 : 1) > -0.3
        else if (l.node) show = (!far || l.node.kind === 'io') && visibleKind(l.node, view, seeInside)
      }

      if (show) {
        if (l.node) nodePosition(l.node, view.explode, true, l.pos)
        else l.pos.copy(l.base).setX(l.base.x + hemiOffset(l.hemi, view.explode))
        if (!forced && !f && l.normal && !l.lobeLevel && !(seeInside && l.node?.kind !== 'io')) {
          toCam.copy(camera.position).sub(l.pos).normalize()
          if (toCam.dot(l.normal) < 0.3) show = false
        }
      }
      if (show) {
        v.copy(l.pos).project(camera)
        if (v.z > 1) show = false
        const x = (v.x * 0.5 + 0.5) * size.width
        const y = (-v.y * 0.5 + 0.5) * size.height
        const w = l.el.textContent!.length * (lang === 'zh' ? 11.5 : 6.2) + 14
        const h = 18
        if (show && !forced && placed.some(([px, py, pw, ph]) => Math.abs(px - x) * 2 < pw + w && Math.abs(py - y) * 2 < ph + h)) show = false
        if (show) {
          placed.push([x, y, w, h])
          l.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
          l.el.classList.toggle('active', forced || !!(f && l.node && f.step.nodes.has(l.node.id)))
        }
      }
      l.el.style.display = show ? '' : 'none'
    }
  })

  /** Places the callout for `id`; returns its screen rect (centre x, centre y, w, h) or null when not shown. */
  function updateCallout(id: string | null, explode: number, lang: 'zh' | 'en'): [number, number, number, number] | null {
    const n = id ? NODE_BY_ID[id] : null
    const hide = () => {
      co.root.classList.remove('show')
      co.key = ''
      return null
    }
    if (!n || (n.kind !== 'mesh' && n.kind !== 'nucleus')) return hide()

    const W = size.width
    const H = size.height
    const toScreen = (p: THREE.Vector3) => {
      v.copy(p).project(camera)
      return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H, v.z] as const
    }
    const [px, py, pz] = toScreen(nodePosition(n, explode, true, tmpP))
    if (pz > 1) return hide()

    // Brain silhouette ≈ ellipse inscribed in the projected bounding box
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    for (let i = 0; i < 8; i++) {
      corner.set(i & 1 ? BOX_MAX.x + explode : BOX_MIN.x - explode, i & 2 ? BOX_MAX.y : BOX_MIN.y, i & 4 ? BOX_MAX.z : BOX_MIN.z)
      const [sx, sy, sz] = toScreen(corner)
      if (sz > 1) return hide() // camera is at or inside the brain
      x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy)
    }
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2
    const a = ((x1 - x0) / 2) * 0.86
    const b = ((y1 - y0) / 2) * 0.86
    // Zoomed in so the brain fills the view: no free space, keep the small label
    if (a > W * 0.45 || b > H * 0.45) return hide()

    const key = `${n.id}|${lang}`
    if (key !== co.key) {
      co.key = key
      const sys = SYSTEMS[n.info.system]
      // Drop the entrance class before the one layout read below, so that read also restarts the animation
      co.root.classList.remove('in')
      co.title.textContent = n.info.name[lang]
      co.sub.textContent = sys.name[lang]
      co.swatch.style.background = sys.color
      co.swatch.style.boxShadow = `0 0 8px ${sys.color}`
      co.w = co.card.offsetWidth
      co.h = co.card.offsetHeight
      co.fresh = true
      co.root.classList.add('in')
    }

    // Free space: step out of the silhouette along the centre → structure direction
    let dx = px - cx
    let dy = py - cy
    const len = Math.hypot(dx, dy)
    if (len < 1) { dx = 1; dy = -0.3 } else { dx /= len; dy /= len }
    const rim = 1 / Math.sqrt((dx / a) ** 2 + (dy / b) ** 2)
    const inside = (x: number, y: number) => ((x - cx) / a) ** 2 + ((y - cy) / b) ** 2 < 1

    // Keep clear of the side and bottom panels on wide screens
    const wide = W > 1100
    const box = wide ? { l: 292, r: W - 332, t: 70, b: H - 222 } : { l: 10, r: W - 10, t: 10, b: H - 10 }
    const side = dx >= 0 ? 1 : -1

    // Walk outward from the rim (at least 40 px past the structure) until the whole card clears the silhouette
    let ex = 0, ey = 0, cardX = 0
    for (let r = Math.max(rim + 26, len + 40), i = 0; i < 24; r += 12, i++) {
      ex = cx + dx * r
      ey = clamp(cy + dy * r, box.t + co.h / 2, box.b - co.h / 2)
      cardX = clamp(side > 0 ? ex + 44 : ex - 44 - co.w, box.l, box.r - co.w)
      const top = ey - co.h / 2
      if (![[cardX, top], [cardX + co.w, top], [cardX, top + co.h], [cardX + co.w, top + co.h]].some(([x, y]) => inside(x, y))) break
    }
    // Zoomed in so far that the free space is off screen: use the small label instead
    if (ex < box.l - 30 || ex > box.r + 30 || cy + dy * rim < box.t - 30 || cy + dy * rim > box.b + 30) return hide()
    const tail = side > 0 ? cardX - 4 : cardX + co.w + 4
    ex = side > 0 ? Math.min(ex, tail - 14) : Math.max(ex, tail + 14)

    // Ease toward the target so the callout glides as the camera moves
    const k = co.fresh ? 1 : 0.3
    co.fresh = false
    co.ex += (ex - co.ex) * k
    co.ey += (ey - co.ey) * k
    co.cx += (cardX - co.cx) * k
    co.cy += (ey - co.cy) * k
    const tx = side > 0 ? co.cx - 4 : co.cx + co.w + 4

    const pts = `${px},${py} ${co.ex},${co.ey} ${tx},${co.cy}`
    co.draw.setAttribute('points', pts)
    co.dash.setAttribute('points', pts)
    co.ring.setAttribute('cx', String(px)); co.ring.setAttribute('cy', String(py))
    co.dot.setAttribute('cx', String(px)); co.dot.setAttribute('cy', String(py))
    co.joint.setAttribute('cx', String(co.ex)); co.joint.setAttribute('cy', String(co.ey))
    co.card.style.transform = `translate(${co.cx}px, ${co.cy - co.h / 2}px)`
    co.root.classList.toggle('left', side < 0)
    co.root.classList.add('show')
    return [co.cx + co.w / 2, co.cy, co.w + 8, co.h + 8]
  }

  return null
}

function visibleKind(n: GraphNode, view: ReturnType<typeof useStore.getState>['view'], seeInside: boolean) {
  if (n.kind === 'io') return view.showBody
  if (n.kind === 'nucleus') return view.showNuclei && seeInside
  if (n.info.lobe === 'subcortical') return view.showSubcortex && seeInside
  if (isCortex(n)) return view.cortexOpacity > 0.3
  return true // cerebellum, brainstem
}
