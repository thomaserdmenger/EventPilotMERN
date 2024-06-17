import React, { Suspense, useRef } from 'react'
import { Float, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const Logo = ({ props, scale }) => {
  const { nodes, materials } = useGLTF('/logo.glb')
  return (
    <Float speed={7} floatIntensity={0.1}>
      <group {...props} dispose={null}>
        <hemisphereLight intensity={0.5} />
        <directionalLight position={[-1, 1, 1]} intensity={2} castShadow />
        <directionalLight
          position={[1, -1, -1]}
          intensity={2}
          castShadow
        />
        <group
          rotation={[-Math.PI, 1.1, 0]}
          scale={[-0.495, -0.217, -0.217]}>
          <mesh
            scale={scale}
            castShadow
            receiveShadow
            geometry={nodes.icon.geometry}
            material={materials['Material.002']}
          />
          <mesh
            scale={scale}
            castShadow
            receiveShadow
            geometry={nodes.icon_1.geometry}
            material={materials['Material.001']}
          />
        </group>
      </group>
    </Float>
  )
}

const LogoCanvas = ({ scale }) => {
  return (
    <Canvas
      resize={{ debounce: 0 }}
      shadows
      camera={{ position: [0, 0, 5], fov: 10 }}
      gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={null}>
        <Logo scale={scale} />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default LogoCanvas
