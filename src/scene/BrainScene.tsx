import { Canvas } from '@react-three/fiber'
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
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => (gl.localClippingEnabled = true)}
      onPointerMissed={() => useStore.getState().hover(null)}
      dpr={[1, 2]}
    >
      {/* Transparent canvas: the macaron gradient behind it comes from CSS (.stage) */}
      <hemisphereLight args={['#fffaf7', '#efe6f5', 1.35]} />
      <directionalLight position={[-3, 4, -2]} intensity={1.15} />
      <directionalLight position={[3, -1, 3]} intensity={0.4} color="#dcd0ff" />
      <directionalLight position={[2, 1, -4]} intensity={0.45} color="#ffe6ec" />
      <ClipSync />
      <Suspense fallback={null}>
        <BrainModel />
      </Suspense>
      <Markers />
      <Pathways />
      <Pulses />
      <Labels />
      <CameraRig />
    </Canvas>
  )
}
