"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Model } from "./Model"
import { Suspense, useState, useEffect, useCallback } from "react"
import * as THREE from "three"
import { Loader } from "@/components/ui/loader"
import { getEnvironmentConfig } from "@/config/environment"
import { useDevicePerformance } from "@/hooks/useDevicePerformance"

function ShaderCompiler({ onComplete }: { onComplete: () => void }) {
  const { gl, scene, camera } = useThree()

  useEffect(() => {
    gl.compile(scene, camera)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onComplete()
      })
    })
  }, [gl, scene, camera, onComplete])

  return null
}

interface SceneProps {
  onReady?: () => void;
}

export function Scene({ onReady }: SceneProps) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [shadersReady, setShadersReady] = useState(false)
  const [warmupComplete, setWarmupComplete] = useState(false)
  const [envConfig, setEnvConfig] = useState(getEnvironmentConfig(new Date()))
  const performance = useDevicePerformance()

  const isReady = modelLoaded && shadersReady && warmupComplete

  // warmup delay: 
  // - Mobile: 800ms for first-frame overhead (no spin animation)
  // - Desktop: 500ms quick warmup then smooth spin
  useEffect(() => {
    if (modelLoaded && shadersReady && !warmupComplete) {
      const warmupTime = performance.isLowEnd ? 800 : 500;
      const timer = setTimeout(() => setWarmupComplete(true), warmupTime);
      return () => clearTimeout(timer);
    }
  }, [modelLoaded, shadersReady, warmupComplete, performance.isLowEnd]);

  useEffect(() => {
    if (isReady && onReady) {
      onReady();
    }
  }, [isReady, onReady]);

  useEffect(() => {
    setEnvConfig(getEnvironmentConfig(new Date()))
  }, [])

  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true)
  }, [])

  const handleShadersCompiled = useCallback(() => {
    setShadersReady(true)
  }, [])

  return (
    <div className="w-full h-full relative transition-colors duration-1000">
      <div
        className={`absolute inset-0 z-20 transition-opacity duration-700 pointer-events-none ${isReady ? "opacity-0" : "opacity-100"
          }`}
      >
        <Loader />
      </div>

      <Canvas
        className={`transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"
          }`}
        shadows={performance.shadows ? "soft" : false}
        camera={{ position: [7, 4, -7], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        <Environment preset={envConfig.preset} environmentIntensity={envConfig.envIntensity} />

        {performance.shadows && (
          <directionalLight
            castShadow
            position={envConfig.sunPosition}
            intensity={envConfig.sunIntensity}
            shadow-bias={-0.0001}
            shadow-normalBias={0.02}
            shadow-mapSize={[performance.shadowMapSize, performance.shadowMapSize]}
          >
            <orthographicCamera attach="shadow-camera" args={[-8, 8, 8, -8]} near={0.1} far={50} />
          </directionalLight>
        )}

        {!performance.shadows && (
          <directionalLight
            position={envConfig.sunPosition}
            intensity={envConfig.sunIntensity * 1.2}
          />
        )}

        <Suspense fallback={null}>
          <Model onLoaded={handleModelLoaded} lowEndMode={performance.isLowEnd} isVisible={isReady} />

          {modelLoaded && !shadersReady && (
            <ShaderCompiler onComplete={handleShadersCompiled} />
          )}
        </Suspense>

        <OrbitControls
          minDistance={5}
          maxDistance={11}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div >
  )
}
