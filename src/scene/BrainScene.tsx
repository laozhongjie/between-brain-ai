import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { BrainModel } from './BrainModel'
import { CameraRig } from './CameraRig'
import { FrameDriver } from './FrameDriver'
import { Labels } from './Labels'
import { Markers } from './Markers'
import { Medium } from './Medium'
import { Pathways } from './Pathways'
import { Pulses } from './Pulses'
import { updateClipPlane } from './picking'

function ClipSync() {
  const axis = useStore((s) => s.view.clipAxis)
  const offset = useStore((s) => s.view.clipOffset)
  useEffect(() => updateClipPlane(axis, offset), [axis, offset])
  return null
}

/**
 * The canvas fills the window behind translucent panels, but the brain should sit in the middle of the
 * part above the timeline. On wide screens the projection is framed on that upper part (aspect and view
 * offset), and the rest of the canvas simply extends below it.
 */
function FrameAboveTimeline() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const size = useThree((s) => s.size)
  const gl = useThree((s) => s.gl)
  useLayoutEffect(() => {
    const bottom = document.querySelector('.atlas .bottom')?.getBoundingClientRect()
    const top = gl.domElement.getBoundingClientRect().top
    const h = size.width > 1100 && bottom ? Math.max(240, Math.min(size.height, bottom.top - top)) : size.height
    if (h < size.height) {
      camera.aspect = size.width / h
      camera.setViewOffset(size.width, h, 0, 0, size.width, size.height)
    } else {
      camera.aspect = size.width / size.height
      camera.clearViewOffset()
    }
    camera.updateProjectionMatrix()
  }, [camera, size, gl])
  return null
}

/** Mounts with the brain (same Suspense boundary) and reports once two frames have been drawn, so the shader
 * compile stall of the first frame is over before the scene is revealed. */
function ReadyAfterFrames({ onReady }: { onReady: () => void }) {
  const n = useRef(0)
  useFrame(() => {
    if (++n.current === 3) onReady()
  })
  return null
}

export function BrainScene() {
  // hidden until the brain is drawn, then revealed from the centre (index.css .brain-canvas)
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'shown'>('loading')
  return (
    <Canvas
      className={`brain-canvas ${phase}`}
      onAnimationEnd={(e) => e.target === e.currentTarget && setPhase('shown')}
      camera={{ fov: 40, near: 0.05, far: 60, position: [-3, 1.3, -2] }}
      gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ gl }) => (gl.localClippingEnabled = true)}
      // a double-click on empty space flies the camera back home
      onPointerMissed={(e) => (e.type === 'dblclick' ? useStore.getState().homeCamera() : useStore.getState().hover(null))}
      dpr={[1, 1.5]}
      frameloop="never"
    >
      <FrameDriver />
      {/* Dark observatory: cool key light, a blue back light for the rim, bloom on anything over-bright */}
      <color attach="background" args={['#070a10']} />
      <hemisphereLight args={['#9fb8d8', '#05070b', 0.9]} />
      <directionalLight position={[-3, 4, -2]} intensity={1.1} color="#dbe8ff" />
      <directionalLight position={[3, -1, 3]} intensity={0.5} color="#7dd3fc" />
      <directionalLight position={[2, 1, -4]} intensity={0.35} color="#8ab4ff" />
      <ClipSync />
      <FrameAboveTimeline />
      <Medium />
      <Suspense fallback={null}>
        <BrainModel />
        <ReadyAfterFrames onReady={() => setPhase('reveal')} />
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
