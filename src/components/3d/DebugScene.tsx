"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { Model } from "./Model"
import { Suspense, useEffect } from "react"
import * as THREE from "three"
import { useControls, folder } from "leva"

function CameraUpdater({ pos, fov }: { pos: [number, number, number], fov: number }) {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(...pos)
    camera.fov = fov
    camera.updateProjectionMatrix()
  }, [camera, pos, fov])
  return null
}

export function DebugScene() {
  const values = useControls({
    Config: folder({
      date: { value: "2025-10-30", label: "Data (RRRR-MM-DD)" },
      bgColor: { value: "#313131", label: "Tło Strony" }
    }),

    Camera: folder({
      camX: { value: 8, min: -20, max: 20 },
      camY: { value: 6, min: 0, max: 20 },
      camZ: { value: 8, min: -20, max: 20 },
      fov: { value: 35, min: 10, max: 90 },
    }),

    Sun: folder({
      sunIntensity: { value: 2.2, min: 0, max: 10 },
      sunX: { value: 4, min: -20, max: 20 },
      sunY: { value: 10, min: 0, max: 20 },
      sunZ: { value: 6, min: -20, max: 20 },
      bias: { value: -0.0001, min: -0.01, max: 0.01, step: 0.0001 },
      normalBias: { value: 0.02, min: 0, max: 0.1, step: 0.001 },
    }),

    Environment: folder({
      envPreset: {
        options: ['city', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'park'],
        value: 'city'
      },
      envIntensity: { value: 1.0, min: 0, max: 5 },
      ambientIntensity: { value: 0.5, min: 0, max: 2 },
    }),

    ContactShadow: folder({
      opacity: { value: 0.5, min: 0, max: 1 },
      blur: { value: 2.5, min: 0, max: 10 },
    })
  })

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: values.bgColor }}>
      <Canvas
        shadows="soft"
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        <CameraUpdater pos={[values.camX, values.camY, values.camZ]} fov={values.fov} />
        <Environment preset={values.envPreset as any} environmentIntensity={values.envIntensity} />

        <directionalLight
          castShadow
          position={[values.sunX, values.sunY, values.sunZ]}
          intensity={values.sunIntensity}
          shadow-bias={values.bias}
          shadow-normalBias={values.normalBias}
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15]} near={0.1} far={50} />
        </directionalLight>

        <ambientLight intensity={values.ambientIntensity} />

        <Suspense fallback={null}>
          <Model dateOverride={new Date(values.date)} />
        </Suspense>

        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={values.opacity}
          scale={10}
          blur={values.blur}
          far={4}
          color="#000000"
        />

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
