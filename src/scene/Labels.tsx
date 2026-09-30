import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { NODES, type GraphNode } from '../data/nodes'
import { LOBES } from '../data/regions'
import type { Bi } from '../data/types'
import { useStore } from '../store'
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
const toCam = new THREE.Vector3()

/** Centre of one hemisphere: outward direction from here approximates the cortical surface normal. */
const hemiCenter = (hemi?: string) => BRAIN_CENTER.clone().setX(hemi === 'lh' ? -0.35 : hemi === 'rh' ? 0.35 : 0)

function makeEl(cls: string) {
  const el = document.createElement('div')
  el.className = cls
  el.style.display = 'none'
  return el
}

export function Labels() {
  const { camera, size } = useThree()
  const lang = useStore((s) => s.lang)

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
    const onClick = (e: MouseEvent) => {
      const id = (e.target as HTMLElement).dataset.id
      if (id) useStore.getState().select(id)
    }
    layer.addEventListener('click', onClick)
    return () => {
      layer.removeEventListener('click', onClick)
      for (const l of labels) l.el.remove()
    }
  }, [labels])

  useEffect(() => {
    for (const l of labels) l.el.textContent = l.text[lang]
  }, [labels, lang])

  useFrame(() => {
    const { view, hovered, selected, lang } = useStore.getState()
    const dist = camera.position.distanceTo(BRAIN_CENTER)
    const far = dist > FAR
    const seeInside = view.cortexOpacity < 0.6
    const placed: [number, number, number, number][] = []

    // Selected and hovered first so they always win overlap tests
    const order = labels.slice().sort((a, b) => rank(b) - rank(a))
    function rank(l: Label) {
      if (!l.node) return 0
      return l.node.id === selected ? 3 : l.node.id === hovered ? 2 : 0
    }

    for (const l of order) {
      const id = l.node?.id
      const forced = id !== undefined && (id === selected || id === hovered)
      let show = forced
      if (!forced && view.showLabels) {
        if (l.lobeLevel) show = far && view.cortexOpacity > 0.3 && camera.position.x * (l.hemi === 'lh' ? -1 : 1) > -0.3
        else if (l.node) show = (!far || l.node.kind === 'io') && visibleKind(l.node, view, seeInside)
      }

      if (show) {
        if (l.node) nodePosition(l.node, view.explode, true, l.pos)
        else l.pos.copy(l.base).setX(l.base.x + hemiOffset(l.hemi, view.explode))
        if (!forced && l.normal && !l.lobeLevel && !(seeInside && l.node?.kind !== 'io')) {
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
          l.el.classList.toggle('active', forced)
        }
      }
      l.el.style.display = show ? '' : 'none'
    }
  })

  return null
}

function visibleKind(n: GraphNode, view: ReturnType<typeof useStore.getState>['view'], seeInside: boolean) {
  if (n.kind === 'io') return view.showBody
  if (n.kind === 'nucleus') return view.showNuclei && seeInside
  if (n.info.lobe === 'subcortical') return view.showSubcortex && seeInside
  if (isCortex(n)) return view.cortexOpacity > 0.3
  return true // cerebellum, brainstem
}
