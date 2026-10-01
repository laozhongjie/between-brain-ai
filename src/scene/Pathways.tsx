import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { PATHWAYS } from '../data/pathways'
import { SYSTEMS } from '../data/regions'
import { ink } from '../theme'
import { signals } from '../sim/signals'
import { useStore } from '../store'
import { pathCurves } from './curves'
import { currentFocus } from './focusState'

/** Faint tubes along every pathway; they light up with traffic or when touching the selected region. */
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
      meshes[i].visible = true
      const touches = sel !== null && PATHWAYS[i].nodes.includes(sel)
      mats[i].opacity = Math.min(0.9, (touches ? 0.4 : 0.045) + 0.75 * signals.traffic[i])
    }
  })

  const focus = useStore((s) => s.focus)
  if (!show && !focus) return null
  return (
    <group>
      {meshes.map((m, i) => (
        <primitive key={i} object={m} />
      ))}
    </group>
  )
}
