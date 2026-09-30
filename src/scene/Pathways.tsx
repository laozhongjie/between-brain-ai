import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { PATHWAYS } from '../data/pathways'
import { SYSTEMS } from '../data/regions'
import { signals } from '../sim/signals'
import { useStore } from '../store'
import { pathCurves } from './curves'

/** Faint tubes along every pathway; they light up with traffic or when touching the selected region. */
export function Pathways() {
  const explode = useStore((s) => s.view.explode)
  const show = useStore((s) => s.view.showPathways)

  const mats = useMemo(
    () =>
      PATHWAYS.map(
        (p) =>
          new THREE.MeshBasicMaterial({
            color: SYSTEMS[p.system].color,
            transparent: true,
            opacity: 0.05,
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
      const geo = new THREE.TubeGeometry(curve, hops * 14, 0.0055, 5, PATHWAYS[i].loop)
      const m = new THREE.Mesh(geo, mats[i])
      m.renderOrder = 20
      m.raycast = () => {}
      return m
    })
  }, [explode, mats])

  useEffect(() => () => meshes.forEach((m) => m.geometry.dispose()), [meshes])

  useFrame(() => {
    const sel = useStore.getState().selected
    for (let i = 0; i < mats.length; i++) {
      const touches = sel !== null && PATHWAYS[i].nodes.includes(sel)
      mats[i].opacity = Math.min(0.85, (touches ? 0.35 : 0.04) + 0.7 * signals.traffic[i])
    }
  })

  if (!show) return null
  return (
    <group>
      {meshes.map((m, i) => (
        <primitive key={i} object={m} />
      ))}
    </group>
  )
}
