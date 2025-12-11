"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { Model } from "./Model"
import { Suspense, useState, useEffect } from "react"
import * as THREE from "three"
import { Loader } from "@/components/ui/loader"
import { getEnvironmentConfig } from "@/config/environment"

export function Scene() {
  const [isReady, setIsReady] = useState(false);
  const [envConfig, setEnvConfig] = useState(getEnvironmentConfig(new Date()));

  useEffect(() => {
    setEnvConfig(getEnvironmentConfig(new Date()));
  }, []);

  return (
    <div
      className="w-full h-full relative transition-colors duration-1000">
      <div
        className={`absolute inset-0 z-20 transition-opacity duration-700 pointer-events-none ${isReady ? "opacity-0" : "opacity-100"
          }`}
      >
        <Loader />
      </div>

      <Canvas
        className={`transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"
          }`}
        shadows="soft"
        camera={{ position: [7, 4, -7], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        <Environment preset={envConfig.preset} environmentIntensity={envConfig.envIntensity} />

        <directionalLight
          castShadow
          position={envConfig.sunPosition}
          intensity={envConfig.sunIntensity}
          shadow-bias={-0.001}
          shadow-normalBias={0.02}
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15]} near={0.1} far={50} />
        </directionalLight>

        <ambientLight intensity={envConfig.ambientIntensity} />

        <Suspense fallback={null}>
          <Model onLoaded={() => setIsReady(true)} />
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
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
