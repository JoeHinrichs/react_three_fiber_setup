import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Mesh } from 'three'
import './App.css'

function App() {

  function Box(props: any) {
    const ref = useRef<Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [rotate, setRotate] = useState(false)

    useFrame((_, delta) => {
      if (rotate) {
        ref.current.rotation.x += 1 * delta
        ref.current.rotation.y += 0.5 * delta
      }
    })

    return (
      <mesh
        {...props}
        ref={ref}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        onPointerDown={() => setRotate(!rotate)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color={hovered ? 0xff0000 : 0x00ff00} metalness={1} roughness={0} />
      </mesh>
    )
  }

  return (
    <>
      <div id="canvas-container" className='w-screen h-screen'>
        <Canvas camera={{ position: [0, 0, 2] }}>
          <Environment preset="warehouse" background={true} backgroundBlurriness={0} />
          <ambientLight intensity={0} />
          <directionalLight
            position={[3, 5, 2]}
            castShadow
            intensity={Math.PI * 0.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Box position={[-0.75, 0, 0]} name="A" />
          <Box position={[0.75, 0, 0]} name="B" />
        </Canvas>
      </div>
    </>
  )
}

export default App
