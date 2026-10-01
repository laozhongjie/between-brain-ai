import { useGLTF } from '@react-three/drei'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { NODES, type GraphNode } from '../data/nodes'
import { engine } from '../sim/engine'
import { useStore } from '../store'
import { currentFocus } from './focusState'
import { clipPlane, pickValid } from './picking'
import { baseColor, glowColor, hemiOffset, isCortex } from './layout'

const GHOST = new THREE.Color('#1b2636')
const RIM = new THREE.Color('#8fd3ff')

/**
 * Dark-glass look: a Fresnel rim adds light and opacity at grazing angles, so the cortex reads as a
 * glowing silhouette while surfaces facing the camera stay dark and see-through.
 */
function glassMaterial() {
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.1, side: THREE.DoubleSide })
  const rim = { value: 0.9 }
  mat.userData.rim = rim
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uRim = { value: RIM }
    shader.uniforms.uRimStrength = rim
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uRim;\nuniform float uRimStrength;')
      .replace(
        '#include <opaque_fragment>',
        `float fres = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 2.4);
        outgoingLight += uRim * fres * uRimStrength;
        diffuseColor.a = clamp(diffuseColor.a + fres * uRimStrength * 0.6, 0.0, 1.0);
        #include <opaque_fragment>`,
      )
  }
  mat.customProgramCacheKey = () => 'brain-glass'
  return mat
}

export const MODEL_URL = `${import.meta.env.BASE_URL}models/brain.glb`

interface Part {
  mesh: THREE.Mesh
  node: GraphNode
  mat: THREE.MeshStandardMaterial
  glow: THREE.Color
  /** resting colour for the current view; activity blends from here toward `glow` */
  base: THREE.Color
  cortex: boolean
}

const tmp = new THREE.Color()

// GLTFLoader sanitises node names (drops '.'), so match on the sanitised id.
const BY_GLTF_NAME = Object.fromEntries(NODES.map((n) => [n.id.replace(/\./g, ''), n]))

export function BrainModel() {
  const { scene } = useGLTF(MODEL_URL)
  const view = useStore((s) => s.view)
  const focus = useStore((s) => s.focus)

  const parts = useMemo(() => {
    const list: Part[] = []
    scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return
      const node = BY_GLTF_NAME[o.name]
      if (!node) return
      // Reuse across StrictMode double-invocation so the rendered material is the one we update
      const mat: THREE.MeshStandardMaterial =
        o.userData.mat ?? glassMaterial()
      o.userData.mat = mat
      // Quantized meshes carry their dequantisation offset in the node transform: keep it
      o.userData.baseX ??= o.position.x
      o.material = mat
      o.userData.nodeId = node.id
      // structures inside the brain, preferred by picking while the cortex is see-through (picking.ts)
      o.userData.deep = node.info.lobe === 'subcortical'
      list.push({ mesh: o, node, mat, glow: glowColor(node), base: new THREE.Color(), cortex: isCortex(node) })
    })
    return list
  }, [scene])

  // View-dependent material state
  useEffect(() => {
    const f = currentFocus()
    for (const p of parts) {
      // Focus mode: the system's structures are solid and coloured by function, everything else is a faint ghost
      const inFocus = f?.all.nodes.has(p.node.id)
      if (f && !inFocus) {
        p.mat.color.copy(GHOST)
        p.base.copy(GHOST)
        p.mat.transparent = true
        p.mat.opacity = p.cortex ? 0.03 : 0.06
        p.mat.userData.rim.value = p.cortex ? 0.35 : 0.5
        p.mat.depthWrite = false
        p.mat.clippingPlanes = []
        p.mat.needsUpdate = true
        p.mesh.visible = true
        p.mesh.position.x = p.mesh.userData.baseX + hemiOffset(p.node.hemi, view.explode)
        p.mesh.renderOrder = 3
        p.mesh.userData.pickable = false
        continue
      }
      p.base.copy(baseColor(p.node, f ? 'system' : view.colorMode))
      p.mat.color.copy(p.base)
      const opacity = p.cortex && !f ? view.cortexOpacity : 1
      p.mat.transparent = opacity < 1
      p.mat.opacity = opacity
      p.mat.userData.rim.value = p.cortex ? 0.9 : 0.55
      p.mat.depthWrite = opacity >= 1
      p.mat.clippingPlanes = view.clipAxis === 'none' ? [] : [clipPlane]
      p.mat.needsUpdate = true
      const visible = f ? true : p.node.info.lobe === 'subcortical' ? view.showSubcortex : !p.cortex || opacity > 0.02
      p.mesh.visible = visible
      p.mesh.position.x = p.mesh.userData.baseX + hemiOffset(p.node.hemi, view.explode)
      p.mesh.renderOrder = p.cortex ? 2 : 1
      p.mesh.userData.pickable = visible
    }
  }, [parts, view, focus])

  useFrame(({ clock }) => {
    const { hovered, selected } = useStore.getState()
    const f = currentFocus()
    const beat = 0.3 + 0.2 * Math.sin(clock.elapsedTime * 4)
    for (const p of parts) {
      const a = engine.activity[p.node.index]
      let k = a * 1.6
      if (f?.step.nodes.has(p.node.id)) k += beat
      if (p.node.id === hovered) k += 0.25
      if (p.node.id === selected) k += 0.45
      // Dark theme: activity makes the surface emit its system colour, strong enough to bloom
      const mix = Math.min(1, k)
      p.mat.color.copy(p.base).lerp(p.glow, mix * 0.35)
      p.mat.emissive.copy(tmp.copy(p.glow).multiplyScalar(0.9 * mix))
    }
  })

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const id = pickValid(e.intersections)
    if (useStore.getState().hovered !== id) useStore.getState().hover(id)
    document.body.style.cursor = id ? 'pointer' : ''
  }
  const onOut = () => {
    useStore.getState().hover(null)
    document.body.style.cursor = ''
  }
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (e.delta > 4) return // was a drag
    const id = pickValid(e.intersections)
    if (id) useStore.getState().select(id)
  }

  return <primitive object={scene} onPointerMove={onMove} onPointerOut={onOut} onClick={onClick} />
}

useGLTF.preload(MODEL_URL)
