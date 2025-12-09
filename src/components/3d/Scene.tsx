"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { Model } from "./Model"
import { Suspense } from "react"
import * as THREE from "three"

export function Scene() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows="soft"
        camera={{ position: [0, 2, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        <Environment preset="city" />

        <directionalLight
          castShadow
          position={[4, 10, 6]}
          intensity={0.2}
          shadow-bias={-0.1001}
          shadow-normalBias={0.0001}
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15]} near={0.1} far={50} />
        </directionalLight>

        <ambientLight intensity={0.2} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
