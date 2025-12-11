"use client"

import * as THREE from "three"
import { useRef, useEffect, useState, JSX, useMemo } from "react"
import { Center, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { GLTF } from "three-stdlib"
import { getActiveEvent, getBonsaiSeason } from "@/config/events"
import { NODE_GROUPS, isNodeInGroup } from "@/config/nodeGroups"

type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh }
  materials: { [key: string]: THREE.MeshStandardMaterial }
}

type ModelProps = JSX.IntrinsicElements["group"] & {
  onLoaded?: () => void;
  dateOverride?: Date;
  lampColor?: string;
  lampIntensity?: number;
}

export function Model({ onLoaded, dateOverride, lampColor, lampIntensity, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF("/wolfie_portfolio.glb") as GLTFResult
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const starLightRef = useRef<THREE.PointLight | null>(null);
  const cakeLightRef = useRef<THREE.PointLight | null>(null);
  const time = useRef(0);

  const [defaultDate] = useState(new Date());
  const currentDate = dateOverride || defaultDate;


  const lampIntensityTimeBased = useMemo(() => {
    const hour = currentDate.getHours();

    // night
    if (hour >= 21 || hour < 5) return 4.0;

    // evening 
    if (hour >= 17 && hour < 21) return 2.0;

    // dawn 
    if (hour >= 5 && hour < 8) return 2.0;

    // day 
    return 0.5;
  }, [currentDate]);

  useEffect(() => {
    const bulb = nodes.lamp_bulb;

    if (bulb) {
      if (bulb.material) {
        const mat = bulb.material as THREE.MeshStandardMaterial;
        const finalColor = lampColor ? new THREE.Color(lampColor) : new THREE.Color("#ffaa33");
        const finalIntensity = lampIntensity !== undefined ? lampIntensity : lampIntensityTimeBased;

        mat.emissive = finalColor;
        mat.emissiveIntensity = finalIntensity;
        mat.toneMapped = false;

        if (finalIntensity === 0) {
          mat.color.setHex(0x333333);
        } else {
          mat.color = finalColor;
        }

        if (!lightRef.current) {
          const light = new THREE.PointLight(finalColor, 0, 4, 1);
          light.position.set(0, 0.05, 0);
          light.castShadow = false;
          bulb.add(light);
          lightRef.current = light;
        }

        if (lightRef.current) {
          lightRef.current.color = finalColor;
          lightRef.current.intensity = finalIntensity * 2;
        }
      }
    }

    if (getActiveEvent(currentDate) === "CHRISTMAS" && nodes.choinka_star) {
      const star = nodes.choinka_star;

      if (star.material) {
        const starMat = star.material as THREE.MeshStandardMaterial;
        const starColor = new THREE.Color("#ffcc00");

        starMat.emissive = starColor;
        starMat.emissiveIntensity = 5.0;
        starMat.toneMapped = false;
        starMat.color = starColor;
      }

      if (!starLightRef.current) {
        const light = new THREE.PointLight("#ffcc00", 4.0, 3, 0.5);

        light.castShadow = false;

        star.add(light);
        starLightRef.current = light;
      }
    } else {
      if (starLightRef.current && nodes.choinka_star) {
        nodes.choinka_star.remove(starLightRef.current);
        starLightRef.current = null;
      }
    }

    if (getActiveEvent(currentDate) === "BIRTHDAY" && nodes.cake_flame) {
      const flame = nodes.cake_flame;

      if (flame.material) {
        const flameMat = flame.material as THREE.MeshStandardMaterial;
        const flameColor = new THREE.Color("#f5d273");

        flameMat.emissive = flameColor;
        flameMat.emissiveIntensity = 2.0;
        flameMat.toneMapped = false;
        flameMat.color = flameColor;
      }

      if (!cakeLightRef.current) {
        const light = new THREE.PointLight("#ffaa00", 4.0, 3, 1);
        light.castShadow = false;

        if (flame.geometry) {
          flame.geometry.computeBoundingSphere();
          const center = flame.geometry.boundingSphere?.center;
          if (center) {
            light.position.copy(center);
          }
        }

        flame.add(light);
        cakeLightRef.current = light;
      }
    } else {
      if (cakeLightRef.current && nodes.cake_flame) {
        nodes.cake_flame.remove(cakeLightRef.current);
        cakeLightRef.current = null;
      }
    }

    return () => {
      if (bulb && lightRef.current) {
        bulb.remove(lightRef.current);
        lightRef.current = null;
      }
      if (nodes.choinka_star && starLightRef.current) {
        nodes.choinka_star.remove(starLightRef.current);
        starLightRef.current = null;
      }
      if (nodes.cake_flame && cakeLightRef.current) {
        nodes.cake_flame.remove(cakeLightRef.current);
        cakeLightRef.current = null;
      }
    }
  }, [nodes, materials, currentDate, onLoaded, lampColor, lampIntensity, lampIntensityTimeBased]);

  useEffect(() => {
    const activeEvent = getActiveEvent(currentDate);
    const season = getBonsaiSeason(currentDate);

    console.log(`📅 Data: ${currentDate.toLocaleDateString()} | Event: ${activeEvent} | Pora: ${season}`);

    Object.keys(nodes).forEach((nodeName) => {
      const node = nodes[nodeName];
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.envMapIntensity = 1.2;
        }
      }
    });

    Object.keys(nodes).forEach((nodeName) => {
      const node = nodes[nodeName];

      const allEventKeys = [
        ...NODE_GROUPS.SANTA, ...NODE_GROUPS.CHRISTMAS, ...NODE_GROUPS.NEW_YEAR,
        ...NODE_GROUPS.BIRTHDAY, ...NODE_GROUPS.VALENTINES, ...NODE_GROUPS.FAT_THURSDAY,
        ...NODE_GROUPS.WOMENS_DAY, ...NODE_GROUPS.EASTER, ...NODE_GROUPS.MAY_DAY,
        ...NODE_GROUPS.HALLOWEEN, ...NODE_GROUPS.INDEPENDENCE
      ];

      if (isNodeInGroup(nodeName, allEventKeys)) {
        node.visible = false;
      }

      if (isNodeInGroup(nodeName, NODE_GROUPS.BONSAI)) node.visible = true;
      if (isNodeInGroup(nodeName, NODE_GROUPS.DEFAULT_GLASSES)) node.visible = true;
    });

    const showGroup = (groupKeys: string[]) => {
      Object.keys(nodes).forEach(name => {
        if (isNodeInGroup(name, groupKeys)) nodes[name].visible = true;
      });
    };

    const hideGroup = (groupKeys: string[]) => {
      Object.keys(nodes).forEach(name => {
        if (isNodeInGroup(name, groupKeys)) nodes[name].visible = false;
      });
    };


    switch (activeEvent) {
      case "SANTA":
        showGroup(NODE_GROUPS.SANTA);
        break;

      case "CHRISTMAS":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.CHRISTMAS);
        break;

      case "NEW_YEAR":
        hideGroup(NODE_GROUPS.BONSAI);
        hideGroup(NODE_GROUPS.DEFAULT_GLASSES);
        showGroup(NODE_GROUPS.NEW_YEAR);
        break;

      case "BIRTHDAY":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.BIRTHDAY);
        break;

      case "VALENTINES":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.VALENTINES);
        break;

      case "FAT_THURSDAY":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.FAT_THURSDAY);
        break;

      case "WOMENS_DAY":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.WOMENS_DAY);
        break;

      case "EASTER":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.EASTER);
        break;

      case "MAY_DAY":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.MAY_DAY);
        break;

      case "HALLOWEEN":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.HALLOWEEN);
        break;

      case "INDEPENDENCE":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.INDEPENDENCE);
        break;

      default:
        break;
    }

    if (nodes.bonsai_trunk.visible) {
      const leavesMat = materials.bonsai_leaves_default;
      const soilMat = materials.bonsai_soil;

      if (leavesMat && soilMat) {
        if (season === "WINTER") {
          soilMat.color.setHex(0xB0BEC5);
          leavesMat.color.setHex(0xB0BEC5);
        } else {
          soilMat.color.setHex(0x3E2723);

          if (season === "SPRING") {
            leavesMat.color.setHex(0xFFB7C5);
          } else if (season === "SUMMER") {
            leavesMat.color.setHex(0x8BC34A);
          } else if (season === "AUTUMN") {
            leavesMat.color.setHex(0xD35400);
          }
        }
      }
    }

    if (onLoaded) {
      setTimeout(() => {
        onLoaded();
      }, 100);
    }

  }, [nodes, materials, currentDate, onLoaded]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      time.current += delta;
      const t = time.current;

      // move configuration 
      const initialSpeed = 50;   // fast spin 
      const targetSpeed = 0.15;  // slow, continuous spin
      const decay = 2.5;         // how quickly the initial speed decays 
      const startAngle = 0.5;    // angle offset 

      const A = (initialSpeed - targetSpeed) / decay;

      groupRef.current.rotation.y = startAngle + A * (1 - Math.exp(-decay * t)) + targetSpeed * t;
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null} position={[0, 1, 0]}
    >
      <Center>
        <primitive object={nodes.Scene} />
      </Center>

    </group>
  )
}

useGLTF.preload("/wolfie_portfolio.glb")
