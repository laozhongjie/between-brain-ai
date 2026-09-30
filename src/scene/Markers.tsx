import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { NODES } from '../data/nodes'
import { engine } from '../sim/engine'
import { useStore } from '../store'
import { glowColor, nodePosition } from './layout'
import { pickValid } from './picking'

const nucleusGeo = new THREE.SphereGeometry(0.022, 16, 12)
const ioGeo = new THREE.IcosahedronGeometry(0.045, 1)
const tmp = new THREE.Color()

/** Small nuclei (inside the brain) and body organs (outside) rendered as glowing markers. */
export function Markers() {
  const view = useStore((s) => s.view)

  const items = useMemo(
    () =>
      NODES.filter((n) => n.kind !== 'mesh').map((node) => {
        const glow = glowColor(node)
        const mat = new THREE.MeshStandardMaterial({ color: glow, roughness: 0.4 })
        const mesh = new THREE.Mesh(node.kind === 'io' ? ioGeo : nucleusGeo, mat)
        mesh.userData.nodeId = node.id
        mesh.userData.pickable = true
        return { node, mesh, mat, glow }
      }),
    [],
  )

  useEffect(() => {
    for (const it of items) {
      nodePosition(it.node, view.explode, false, it.mesh.position)
      it.mesh.visible = it.node.kind === 'io' ? view.showBody : view.showNuclei
      // Nuclei sit inside the brain: once the cortex is faded, draw them on top so they stay visible
      it.mat.depthTest = it.node.kind === 'io' || view.cortexOpacity >= 0.99
      it.mesh.renderOrder = it.node.kind === 'io' ? 0 : 10
    }
  }, [items, view])

  useFrame(() => {
    const { hovered, selected } = useStore.getState()
    for (const it of items) {
      let k = 0.25 + engine.activity[it.node.index] * 2.2
      if (it.node.id === hovered) k += 0.4
      if (it.node.id === selected) k += 0.8
      it.mat.emissive.copy(tmp.copy(it.glow).multiplyScalar(k))
      const s = it.node.id === selected || it.node.id === hovered ? 1.35 : 1
      it.mesh.scale.setScalar(s)
    }
  })

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const id = pickValid(e.intersections)
    if (useStore.getState().hovered !== id) useStore.getState().hover(id)
    document.body.style.cursor = id ? 'pointer' : ''
  }
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (e.delta > 4) return
    const id = pickValid(e.intersections)
    if (id) useStore.getState().select(id)
  }

  return (
    <group onPointerMove={onMove} onClick={onClick} onPointerOut={() => useStore.getState().hover(null)}>
      {items.map((it) => (
        <primitive key={it.node.id} object={it.mesh} />
      ))}
    </group>
  )
}
