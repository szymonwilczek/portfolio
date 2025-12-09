"use client"

import * as THREE from "three"
import React, { useRef, useEffect, useState, JSX } from "react"
import { Center, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { GLTF } from "three-stdlib"
import { getActiveEvent, getBonsaiSeason, DEFAULT_EVENT } from "@/config/events"
import { NODE_GROUPS, isNodeInGroup } from "@/config/nodeGroups"

type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh }
  materials: { [key: string]: THREE.MeshStandardMaterial }
}

type ModelProps = JSX.IntrinsicElements["group"] & {
  onLoaded?: () => void;
  dateOverride?: Date;
}

export function Model({ onLoaded, dateOverride, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF("/wolfie_portfolio.glb") as GLTFResult
  const groupRef = useRef<THREE.Group>(null)

  const [defaultDate] = useState(new Date("2025-10-02"));
  const currentDate = dateOverride || defaultDate;

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
      if (!node.isMesh) return;

      const allEventKeys = [
        ...NODE_GROUPS.SANTA, ...NODE_GROUPS.CHRISTMAS, ...NODE_GROUPS.NEW_YEAR,
        ...NODE_GROUPS.BIRTHDAY, ...NODE_GROUPS.VALENTINES, ...NODE_GROUPS.FAT_THURSDAY,
        ...NODE_GROUPS.WOMENS_DAY, ...NODE_GROUPS.EASTER, ...NODE_GROUPS.MAY_DAY,
        ...NODE_GROUPS.HALLOWEEN, ...NODE_GROUPS.ALL_SAINTS, ...NODE_GROUPS.INDEPENDENCE
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

      case "ALL_SAINTS":
        hideGroup(NODE_GROUPS.BONSAI);
        showGroup(NODE_GROUPS.ALL_SAINTS);
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
      groupRef.current.rotation.y += delta * 0.15;
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
