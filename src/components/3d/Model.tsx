"use client"

import * as THREE from "three"
import { useRef, useEffect, JSX } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh }
  materials: { [key: string]: THREE.Material }
}

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/wolfie_portfolio.glb") as GLTFResult
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  // debug 
  useEffect(() => {
    console.log("Dostępne nody (obiekty):", Object.keys(nodes))
    console.log("Dostępne materiały:", Object.keys(materials))
  }, [nodes, materials])

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={nodes.Scene} />
    </group>
  )
}

useGLTF.preload("/wolfie_portfolio.glb")
