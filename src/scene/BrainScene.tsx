import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { BrainModel } from './BrainModel'
import { CameraRig } from './CameraRig'
import { Labels } from './Labels'
import { Markers } from './Markers'
import { Pathways } from './Pathways'
import { Pulses } from './Pulses'
import { updateClipPlane } from './picking'

function ClipSync() {
  const axis = useStore((s) => s.view.clipAxis)
  const offset = useStore((s) => s.view.clipOffset)
  useEffect(() => updateClipPlane(axis, offset), [axis, offset])
  return null
}

export function BrainScene() {
  return (
    <Canvas
      camera={{ fov: 40, near: 0.05, far: 60, position: [-3, 1.3, -2] }}
      gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => (gl.localClippingEnabled = true)}
      onPointerMissed={() => useStore.getState().hover(null)}
      dpr={[1, 2]}
    >
      {/* Dark observatory: cool key light, a blue back light for the rim, bloom on anything over-bright */}
      <color attach="background" args={['#070a10']} />
      <hemisphereLight args={['#9fb8d8', '#05070b', 0.9]} />
      <directionalLight position={[-3, 4, -2]} intensity={1.1} color="#dbe8ff" />
      <directionalLight position={[3, -1, 3]} intensity={0.5} color="#7dd3fc" />
      <directionalLight position={[2, 1, -4]} intensity={0.35} color="#8ab4ff" />
      <ClipSync />
      <Suspense fallback={null}>
        <BrainModel />
      </Suspense>
      <Markers />
      <Pathways />
      <Pulses />
      <Labels />
      <CameraRig />
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={0.45} luminanceSmoothing={0.3} intensity={0.9} />
        <Vignette offset={0.25} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  )
}
