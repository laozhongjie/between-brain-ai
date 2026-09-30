import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { PATHWAYS } from '../data/pathways'
import { SYSTEMS } from '../data/regions'
import { ink } from '../theme'
import { engine } from '../sim/engine'
import { signals } from '../sim/signals'
import { useStore } from '../store'
import { pathCurves } from './curves'

const TRAIL = 4
const MAX = 1200 * TRAIL
const PATH_COLORS = PATHWAYS.map((p) => new THREE.Color(ink(SYSTEMS[p.system].color, 0.35)))
const WHITE = new THREE.Color('#ffffff')

/** Glowing particles travelling along pathways (head + fading trail), drawn as one instanced mesh. */
export function Pulses() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const show = useStore((s) => s.view.showPulses)

  const { geo, mat } = useMemo(
    () => ({
      geo: new THREE.SphereGeometry(1, 10, 8),
      mat: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthTest: false, depthWrite: false, toneMapped: false }),
    }),
    [],
  )
  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), p: new THREE.Vector3(), c: new THREE.Color(), q: new THREE.Quaternion(), s: new THREE.Vector3() }), [])

  useFrame(() => {
    const mesh = ref.current
    if (!mesh) return
    const curves = pathCurves(useStore.getState().view.explode)
    const now = engine.simTime
    let n = 0
    for (const pulse of signals.pulses) {
      const { curve, hops } = curves[pulse.path]
      const f = (now - pulse.t0) / pulse.dur
      if (f < 0 || f > 1) continue
      for (let k = 0; k < TRAIL && n < MAX; k++) {
        const ff = f - k * 0.07
        if (ff < 0) break
        curve.getPoint(Math.min(0.9999, (pulse.hop + ff) / hops), tmp.p)
        const size = (0.016 + 0.014 * pulse.strength) * (1 - k / TRAIL)
        tmp.s.setScalar(size)
        tmp.m.compose(tmp.p, tmp.q, tmp.s)
        mesh.setMatrixAt(n, tmp.m)
        // head is the path colour, the trail fades toward white (the light ground)
        tmp.c.copy(PATH_COLORS[pulse.path]).lerp(WHITE, (k / TRAIL) * 0.85)
        mesh.setColorAt(n, tmp.c)
        n++
      }
    }
    mesh.count = n
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return <instancedMesh ref={ref} args={[geo, mat, MAX]} visible={show} renderOrder={30} raycast={() => {}} frustumCulled={false} />
}
