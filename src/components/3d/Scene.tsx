"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Model } from "./Model"
import { Suspense } from "react"

export function Scene() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
