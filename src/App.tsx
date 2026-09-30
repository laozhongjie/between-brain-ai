import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="#5ac8fa" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}
