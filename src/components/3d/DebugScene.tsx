"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Stats } from "@react-three/drei"
import { Model } from "./Model"
import { Suspense, useEffect, useMemo } from "react"
import * as THREE from "three"
import { useControls, folder } from "leva"
import { getEnvironmentConfig } from "@/config/environment"

function CameraUpdater({ pos, fov, enabled = true }: { pos: [number, number, number], fov: number, enabled?: boolean }) {
  const { camera } = useThree()
  useEffect(() => {
    if (!enabled) return;
    camera.position.set(...pos)
    if ('fov' in camera) {
      camera.fov = fov
    }
    camera.updateProjectionMatrix()
  }, [camera, pos, fov, enabled])
  return null
}

export function DebugScene() {
  const values = useControls({
    TimeSpace: folder({
      date: { value: new Date().toISOString(), label: "Date" },
      hour: { value: new Date().getHours().toString(), min: 0, max: 23, step: 1, label: "Hour (23M)" },
    }),

    "Debug Tools": folder({
      freeCamera: { value: false, label: "Free Camera" },
      stopRotation: { value: false, label: "Stop Rotation" },
    }),

    Camera: folder({
      camX: { value: 7, min: -20, max: 20 },
      camY: { value: 4, min: 0, max: 20 },
      camZ: { value: -7, min: -20, max: 20 },
      fov: { value: 42, min: 10, max: 90 },
    }),

    Shadows: folder({
      bias: { value: -0.0001, min: -0.0100, max: 0.0100, step: 0.0001 },
      normalBias: { value: 0.02, min: 0.0000, max: 0.1000, step: 0.001 },
      opacity: { value: 0.5, min: 0, max: 1 },
      blur: { value: 2.5, min: 0, max: 10 },
    }),

    Performance: folder({
      showStats: { value: true, label: "Show FPS" }
    }),

    Lamp: folder({
      bulbColor: { value: "#ffaa33", label: "Color" },
      bulbIntensity: { value: 10, min: 0, max: 50, step: 0.1, label: "Intensity" },
    }),
  })

  const envSettings = useMemo(() => {
    const mockDate = new Date(values.date);
    mockDate.setHours(Number(values.hour));
    return getEnvironmentConfig(mockDate);
  }, [values.hour, values.date]);

  return (
    <div className="w-full h-full relative transition-colors duration-1000 bg-card">
      <Canvas
        shadows="basic"
        dpr={[1, 1.5]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        {values.showStats && <Stats />}

        <CameraUpdater
          pos={[values.camX, values.camY, values.camZ]}
          fov={values.fov}
          enabled={!values.freeCamera}
        />

        <Environment
          preset={envSettings.preset}
          environmentIntensity={envSettings.envIntensity}
        />

        <directionalLight
          castShadow
          position={envSettings.sunPosition}
          intensity={envSettings.sunIntensity}
          shadow-bias={values.bias}
          shadow-normalBias={values.normalBias}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-8, 8, 8, -8]} near={0.1} far={50} />
        </directionalLight>

        <Suspense fallback={null}>
          <Model
            dateOverride={new Date(values.date)}
            lampColor={values.bulbColor}
            lampIntensity={values.bulbIntensity}
            stopRotation={values.stopRotation}
          />
        </Suspense>

        <OrbitControls enablePan={values.freeCamera} makeDefault />
      </Canvas>

      <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-xs font-mono pointer-events-none">
        Preset: {envSettings.preset.toUpperCase()} <br />
        Sun: {envSettings.sunIntensity} <br />
        Hour: {values.hour}:00
      </div>
    </div>
  )
}
