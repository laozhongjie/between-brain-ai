import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { PATHWAYS } from '../data/pathways'
import { SYSTEMS } from '../data/regions'
import { ink } from '../theme'
import { signals } from '../sim/signals'
import { useStore } from '../store'
import { NODE_BY_ID } from '../data/nodes'
import { ORGAN_HOPS, arc, pathCurves } from './curves'
import { nodePosition } from './layout'
import { currentFocus } from './focusState'

/** Tubes along the pathways, shown while signals travel them, when touching the selected region, or in focus mode. */
export function Pathways() {
  const explode = useStore((s) => s.view.explode)
  const show = useStore((s) => s.view.showPathways)

  const mats = useMemo(
    () =>
      PATHWAYS.map(
        (p) =>
          new THREE.MeshBasicMaterial({
            color: ink(SYSTEMS[p.system].color, 0.3),
            transparent: true,
            opacity: 0.08,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            depthWrite: false,
            toneMapped: false,
          }),
      ),
    [],
  )

  const meshes = useMemo(() => {
    const curves = pathCurves(explode)
    return curves.map(({ curve, hops }, i) => {
      const geo = new THREE.TubeGeometry(curve, hops * 20, 0.0045, 5, false)
      const m = new THREE.Mesh(geo, mats[i])
      m.renderOrder = 20
      m.raycast = () => {}
      return m
    })
  }, [explode, mats])

  useEffect(() => () => meshes.forEach((m) => m.geometry.dispose()), [meshes])

  // Body organs keep a very faint permanent link to the brain, so they never float unattached
  const organMat = useMemo(
    () => new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, toneMapped: false }),
    [],
  )
  const organLinks = useMemo(
    () =>
      ORGAN_HOPS.map(({ organ, other }) => {
        const o = NODE_BY_ID[organ]
        const n = NODE_BY_ID[other]
        const geo = new THREE.TubeGeometry(arc(nodePosition(o, explode), nodePosition(n, explode, n.kind === 'mesh')), 24, 0.0035, 4, false)
        const c = new THREE.Color(ink(SYSTEMS[o.info.system].color, 0.3))
        geo.setAttribute('color', new THREE.Float32BufferAttribute(Array.from({ length: geo.attributes.position.count }, () => [c.r, c.g, c.b]).flat(), 3))
        const m = new THREE.Mesh(geo, organMat)
        m.renderOrder = 19
        m.raycast = () => {}
        return m
      }),
    [explode, organMat],
  )
  useEffect(() => () => organLinks.forEach((m) => m.geometry.dispose()), [organLinks])
  const showBody = useStore((s) => s.view.showBody)

  useFrame(() => {
    const sel = useStore.getState().selected
    const f = currentFocus()
    for (let i = 0; i < mats.length; i++) {
      // Focus mode: only the system's pathways, clearly visible; the current step's ones brighter
      if (f) {
        meshes[i].visible = f.all.paths.has(i)
        mats[i].opacity = Math.min(0.9, (f.step.paths.has(i) ? 0.45 : 0.18) + 0.6 * signals.traffic[i])
        continue
      }
      // Otherwise a pathway shows only while signals use it (squared, so faint ambient pulses barely
      // register and event-driven bursts light the route), or while it touches the selected region
      const touches = sel !== null && PATHWAYS[i].nodes.includes(sel)
      const tr = signals.traffic[i]
      const o = Math.min(0.9, (touches ? 0.4 : 0) + 0.85 * tr * tr)
      mats[i].opacity = o
      meshes[i].visible = o > 0.004
    }
  })

  const focus = useStore((s) => s.focus)
  if (!show && !focus) return null
  return (
    <group>
      {meshes.map((m, i) => (
        <primitive key={i} object={m} />
      ))}
      {show && showBody && !focus && organLinks.map((m, i) => <primitive key={`o${i}`} object={m} />)}
    </group>
  )
}
