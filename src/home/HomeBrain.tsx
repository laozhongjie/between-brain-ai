import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import { BrainModel, MODEL_URL } from '../scene/BrainModel'
import { BRAIN_CENTER } from '../scene/layout'
import { Pathways } from '../scene/Pathways'
import { Pulses } from '../scene/Pulses'
import { CHAPTERS, homeState } from './chapters'
import { BRAIN_N, morphTargets } from './morph'

/** Slow orbit around the brain; the distance eases toward the current chapter's framing. */
function OrbitCamera() {
  const s = useRef({ az: -2.1, dist: 4.6 }).current
  useFrame(({ camera, size }, dt) => {
    const ch = CHAPTERS[Math.max(0, homeState.chapter)]
    s.az += dt * 0.12
    s.dist += (ch.dist - s.dist) * Math.min(1, dt * 1.6)
    const el = 0.28
    camera.position.set(
      BRAIN_CENTER.x + s.dist * Math.cos(el) * Math.sin(s.az),
      BRAIN_CENTER.y + s.dist * Math.sin(el),
      BRAIN_CENTER.z + s.dist * Math.cos(el) * Math.cos(s.az),
    )
    camera.lookAt(BRAIN_CENTER)
    // While the disc opens, keep the brain near the slit (right edge of this panel) so it shows through
    const shift = (1 - homeState.open) * size.width * 0.42
    const cam = camera as THREE.PerspectiveCamera
    cam.setViewOffset(size.width, size.height, -shift, 0, size.width, size.height)
    cam.updateProjectionMatrix()
  })
  return null
}

/**
 * Points spread over the brain's surface (by area, across all its meshes), projected into this panel every
 * frame while the white halves are turning into it: the particles' destinations.
 */
function BrainTargets() {
  const { scene } = useGLTF(MODEL_URL)
  const pts = useRef<{ mesh: THREE.Mesh[]; local: Float32Array } | null>(null)

  // Sampling builds a per-mesh area table: done once, after the hero's entrance has settled
  useEffect(() => {
    const id = setTimeout(() => {
      const meshes: THREE.Mesh[] = []
      scene.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh) })
      if (!meshes.length) return
      const samplers = meshes.map((m) => new MeshSurfaceSampler(m).build())
      const areas = samplers.map((s) => (s.distribution?.length ? s.distribution[s.distribution.length - 1] : 0))
      const total = areas.reduce((a, b) => a + b, 0)
      const mesh: THREE.Mesh[] = []
      const local = new Float32Array(BRAIN_N * 3)
      const p = new THREE.Vector3()
      for (let i = 0; i < BRAIN_N; i++) {
        let u = Math.random() * total
        let k = 0
        while (k < areas.length - 1 && u > areas[k]) u -= areas[k++]
        samplers[k].sample(p)
        mesh.push(meshes[k])
        p.toArray(local, i * 3)
      }
      pts.current = { mesh, local }
    }, 400)
    return () => clearTimeout(id)
  }, [scene])

  const v = useRef(new THREE.Vector3()).current
  useFrame(({ camera, size }) => {
    const m = homeState.morph
    if (!pts.current || m <= 0 || m >= 1) return
    const { mesh, local } = pts.current
    const out = morphTargets.brain
    for (let i = 0; i < BRAIN_N; i++) {
      v.fromArray(local, i * 3).applyMatrix4(mesh[i].matrixWorld).project(camera)
      out[i * 2] = v.z > 1 ? NaN : ((v.x + 1) / 2) * size.width
      out[i * 2 + 1] = ((1 - v.y) / 2) * size.height
    }
  })
  return null
}

/** The living brain for the landing page: same model, pathways and pulses as the atlas, no interaction. */
export function HomeBrain() {
  return (
    <Canvas
      camera={{ fov: 34, near: 0.05, far: 60 }}
      gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => (gl.localClippingEnabled = true)}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#05070b']} />
      <hemisphereLight args={['#9fb8d8', '#05070b', 0.9]} />
      <directionalLight position={[-3, 4, -2]} intensity={1.1} color="#dbe8ff" />
      <directionalLight position={[3, -1, 3]} intensity={0.5} color="#7dd3fc" />
      <directionalLight position={[2, 1, -4]} intensity={0.35} color="#8ab4ff" />
      <Suspense fallback={null}>
        <BrainModel />
        <BrainTargets />
      </Suspense>
      <Pathways />
      <Pulses />
      <OrbitCamera />
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={0.45} luminanceSmoothing={0.3} intensity={0.9} />
      </EffectComposer>
    </Canvas>
  )
}
