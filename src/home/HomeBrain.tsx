import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { BrainModel } from '../scene/BrainModel'
import { FrameDriver } from '../scene/FrameDriver'
import { BRAIN_CENTER } from '../scene/layout'
import { Pathways } from '../scene/Pathways'
import { Pulses } from '../scene/Pulses'
import { CHAPTERS, homeState } from './chapters'

/** Slow orbit around the brain; the distance eases toward the current chapter's framing. */
function OrbitCamera() {
  const s = useRef({ az: -2.1, dist: 4.6 }).current
  useFrame(({ camera, size }, dt) => {
    const ch = CHAPTERS[Math.max(0, homeState.chapter)]
    const portrait = matchMedia('(max-width: 760px) and (orientation: portrait)').matches
    const distance = portrait ? Math.max(ch.dist * 0.9, 0.95 / (Math.tan(17 * Math.PI / 180) * Math.min(1, size.width / size.height))) : ch.dist
    s.az += dt * 0.12
    s.dist += (distance - s.dist) * Math.min(1, dt * 1.6)
    const el = 0.28
    camera.position.set(
      BRAIN_CENTER.x + s.dist * Math.cos(el) * Math.sin(s.az),
      BRAIN_CENTER.y + s.dist * Math.sin(el),
      BRAIN_CENTER.z + s.dist * Math.cos(el) * Math.cos(s.az),
    )
    camera.lookAt(BRAIN_CENTER)
    // While the disc opens, keep the brain near the slit (right edge of this panel) so it shows through
    const shift = (1 - homeState.open) * (portrait ? size.height : size.width) * 0.42
    const cam = camera as THREE.PerspectiveCamera
    cam.setViewOffset(size.width, size.height, portrait ? 0 : -shift, portrait ? -shift - size.height * 0.04 * homeState.open : 0, size.width, size.height)
    cam.updateProjectionMatrix()
  })
  return null
}

/** The panel is invisible until the white disc starts to fade: skip drawing it until then */
const revealed = () => homeState.reveal > 0

/** The living brain for the landing page: same model, pathways and pulses as the atlas, no interaction. */
export function HomeBrain() {
  return (
    <Canvas
      camera={{ fov: 34, near: 0.05, far: 60 }}
      gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => (gl.localClippingEnabled = true)}
      dpr={[1, 1.5]}
      frameloop="never"
    >
      <FrameDriver active={revealed} />
      <color attach="background" args={['#05070b']} />
      <hemisphereLight args={['#9fb8d8', '#05070b', 0.9]} />
      <directionalLight position={[-3, 4, -2]} intensity={1.1} color="#dbe8ff" />
      <directionalLight position={[3, -1, 3]} intensity={0.5} color="#7dd3fc" />
      <directionalLight position={[2, 1, -4]} intensity={0.35} color="#8ab4ff" />
      <Suspense fallback={null}>
        <BrainModel />
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
