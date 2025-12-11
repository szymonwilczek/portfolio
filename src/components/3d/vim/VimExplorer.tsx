import React from "react";
import { Text } from "@react-three/drei";
import { C, INITIAL_FILE_TREE } from "./VimConfig";
import { Rect, FONT_URL } from "./VimCommon";
import { EXPLORER_W, SCREEN_H, BAR_H } from "./VimScreen";

export const VimExplorer = React.memo(({ explorerIndex, isTreeFocused }: any) => {
  return (
    <group position={[0, 0, 0]}>
      <Rect width={EXPLORER_W} height={SCREEN_H - BAR_H} color={C.surface} x={0} y={0} />

      <Text font={FONT_URL} fontSize={0.25} color={C.love} position={[0.2, -0.4, 0.05]} anchorX="left" anchorY="top">
        ~/GitHub/wolfie-portfolio
      </Text>

      <group position={[0, -1.0, 0]}>
        {INITIAL_FILE_TREE.map((node, i) => {
          const isActive = i === explorerIndex;
          const yPos = -i * 0.5;
          const isReact = node.name.endsWith("tsx");
          const isCSS = node.name.endsWith("css");
          const isJSON = node.name.endsWith("json");
          const iconColor = node.type === 'folder' ? C.rose : (isReact ? C.foam : (isCSS ? C.love : (isJSON ? C.gold : C.text)));
          const icon = node.type === 'folder' ? (node.isOpen ? "📂" : "📁") : (isReact ? "⚛" : (isCSS ? "#" : "📄"));

          const depthOffset = node.depth * 0.3;
          const basePadding = 0.2;

          return (
            <group key={node.id} position={[0, yPos, 0]}>
              {isActive && (
                <Rect width={EXPLORER_W - 0.2} height={0.5} color={isTreeFocused ? C.overlay : "#2a273f"} x={-0.1} y={0.12} />
              )}

              <Text
                font={FONT_URL}
                fontSize={0.25}
                color={iconColor}
                anchorX="left"
                anchorY="top"
                position={[basePadding + depthOffset, 0, 0.05]}
              >
                {icon}
              </Text>

              <Text
                font={FONT_URL}
                fontSize={0.25}
                color={isActive ? C.text : C.muted}
                position={[basePadding + depthOffset + 0.45, 0.04, 0.05]}
                anchorX="left"
                anchorY="top"
              >
                {node.name}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
});
