import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { director } from '../sim/director'
import { engine } from '../sim/engine'
import { signals } from '../sim/signals'
import { useStore } from '../store'
import { BrainModel } from './BrainModel'
import { CameraRig } from './CameraRig'
import { Labels } from './Labels'
import { Markers } from './Markers'
import { Pathways } from './Pathways'
import { Pulses } from './Pulses'
import { updateClipPlane } from './picking'

/** Advances the simulation once per frame, before anything reads it. */
function EngineTicker() {
  useFrame((_, delta) => {
    const ms = delta * 1000
    director.tick(ms)
    engine.tick(ms)
    signals.tick(ms)
  })
  return null
}

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
      <EngineTicker />
      <color attach="background" args={['#07090f']} />
      <hemisphereLight args={['#dfe8ff', '#2a1f24', 0.55]} />
      <directionalLight position={[-3, 4, -2]} intensity={1.1} />
      <directionalLight position={[3, -1, 3]} intensity={0.45} color="#9fb4ff" />
      <directionalLight position={[2, 1, -4]} intensity={0.5} />
      <ClipSync />
      <Suspense fallback={null}>
        <BrainModel />
      </Suspense>
      <Markers />
      <Pathways />
      <Pulses />
      <Labels />
      <CameraRig />
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.55} luminanceSmoothing={0.2} />
      </EffectComposer>
    </Canvas>
  )
}
