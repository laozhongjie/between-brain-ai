import { CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { NODE_BY_ID } from '../data/nodes'
import { useStore } from '../store'
import { BRAIN_CENTER, isCortex, nodePosition } from './layout'

const HOME_DIR = new THREE.Vector3(-0.75, 0.32, -0.55).normalize()
const HOME_DIST = 3.9

export function CameraRig() {
  const ref = useRef<CameraControls>(null)
  const selected = useStore((s) => s.selected)
  const resetTick = useStore((s) => s.resetTick)
  const aspect = useThree((s) => s.size.width / s.size.height)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    // On narrow (portrait) screens back off so the whole brain fits horizontally
    const dist = Math.max(HOME_DIST, 0.95 / (Math.tan((20 * Math.PI) / 180) * aspect))
    const p = BRAIN_CENTER.clone().addScaledVector(HOME_DIR, dist)
    c.setLookAt(p.x, p.y, p.z, BRAIN_CENTER.x, BRAIN_CENTER.y, BRAIN_CENTER.z, resetTick > 0)
    // Portrait: lift the brain above the bottom panels
    c.setFocalOffset(0, aspect < 0.8 ? 0.12 * dist : 0, 0, resetTick > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-home on reset, not on every resize
  }, [resetTick])

  useEffect(() => {
    const c = ref.current
    const n = selected ? NODE_BY_ID[selected] : null
    if (!c || !n) return
    const { view, setView } = useStore.getState()
    const target = nodePosition(n, view.explode)
    let dir: THREE.Vector3
    if (isCortex(n)) {
      const hemiC = BRAIN_CENTER.clone().setX(n.hemi === 'lh' ? -0.35 : 0.35)
      dir = new THREE.Vector3(...n.anchor).sub(hemiC).normalize()
    } else {
      dir = c.camera.position.clone().sub(target).normalize()
      // Structures deep inside: fade the cortex so they can be seen
      if (n.kind !== 'io' && n.info.lobe !== 'cerebellum' && view.cortexOpacity > 0.5) setView({ cortexOpacity: 0.2 })
    }
    const dist = n.kind === 'io' ? 1.8 : isCortex(n) ? 2.4 : 2.0
    const p = target.clone().addScaledVector(dir, dist)
    c.setLookAt(p.x, p.y, p.z, target.x, target.y, target.z, true)
  }, [selected])

  return <CameraControls ref={ref} makeDefault minDistance={0.4} maxDistance={9} dollyToCursor smoothTime={0.45} />
}
