import { useGLTF } from '@react-three/drei'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { NODES, type GraphNode } from '../data/nodes'
import { engine } from '../sim/engine'
import { useStore } from '../store'
import { clipPlane, pickValid } from './picking'
import { baseColor, glowColor, hemiOffset, isCortex } from './layout'

export const MODEL_URL = `${import.meta.env.BASE_URL}models/brain.glb`

interface Part {
  mesh: THREE.Mesh
  node: GraphNode
  mat: THREE.MeshStandardMaterial
  glow: THREE.Color
  cortex: boolean
}

const tmp = new THREE.Color()

// GLTFLoader sanitises node names (drops '.'), so match on the sanitised id.
const BY_GLTF_NAME = Object.fromEntries(NODES.map((n) => [n.id.replace(/\./g, ''), n]))

export function BrainModel() {
  const { scene } = useGLTF(MODEL_URL)
  const view = useStore((s) => s.view)

  const parts = useMemo(() => {
    const list: Part[] = []
    scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return
      const node = BY_GLTF_NAME[o.name]
      if (!node) return
      // Reuse across StrictMode double-invocation so the rendered material is the one we update
      const mat: THREE.MeshStandardMaterial =
        o.userData.mat ?? new THREE.MeshStandardMaterial({ roughness: 0.62, metalness: 0.02, side: THREE.DoubleSide })
      o.userData.mat = mat
      o.material = mat
      o.userData.nodeId = node.id
      list.push({ mesh: o, node, mat, glow: glowColor(node), cortex: isCortex(node) })
    })
    return list
  }, [scene])

  // View-dependent material state
  useEffect(() => {
    for (const p of parts) {
      p.mat.color.copy(baseColor(p.node, view.colorMode))
      const opacity = p.cortex ? view.cortexOpacity : 1
      p.mat.transparent = opacity < 1
      p.mat.opacity = opacity
      p.mat.depthWrite = opacity >= 1
      p.mat.clippingPlanes = view.clipAxis === 'none' ? [] : [clipPlane]
      p.mat.needsUpdate = true
      const visible = p.node.info.lobe === 'subcortical' ? view.showSubcortex : !p.cortex || opacity > 0.02
      p.mesh.visible = visible
      p.mesh.position.x = hemiOffset(p.node.hemi, view.explode)
      p.mesh.renderOrder = p.cortex ? 2 : 1
      // Let clicks pass through a faded cortex to the structures underneath
      p.mesh.userData.pickable = visible && (!p.cortex || opacity > 0.35)
    }
  }, [parts, view])

  useFrame(() => {
    const { hovered, selected } = useStore.getState()
    for (const p of parts) {
      const a = engine.activity[p.node.index]
      let k = a * 1.6
      if (p.node.id === hovered) k += 0.25
      if (p.node.id === selected) k += 0.45
      p.mat.emissive.copy(tmp.copy(p.glow).multiplyScalar(k))
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
