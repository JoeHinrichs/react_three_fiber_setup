import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function Box(props) {
    const ref = useRef()
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
        <meshBasicMaterial color={hovered ? 0xff0000 : 0x00ff00} wireframe />
      </mesh>
    )
  }

  return (
    <>
      <div id="canvas-container" className='w-full h-full'>
        <Canvas camera={{ position: [0, 0, 2] }}>
          <Box position={[-0.75, 0, 0]} name="A" />
          <Box position={[0.75, 0, 0]} name="B" />
        </Canvas>
      </div>
    </>
  )
}

export default App
