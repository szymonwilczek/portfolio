import React from "react";
import { Text } from "@react-three/drei";
import { C } from "./VimConfig";
import { Rect, FONT_URL } from "./VimCommon";
import { EXPLORER_W, EDITOR_W, TAB_H } from "./VimScreen";

export const VimTabs = React.memo(({ openFiles, activeFile }: any) => {
  return (
    <group position={[EXPLORER_W + 0.060, 0, 0.15]}>
      <Rect width={EDITOR_W} height={TAB_H} color={C.bg} x={0} y={0} />
      {openFiles.map((file: string, i: number) => {
        const isActive = file === activeFile;
        const tabW = 3.5;
        const xPos = i * tabW;
        return (
          <group key={file} position={[xPos, 0, 0.01]}>
            <Rect width={tabW} height={TAB_H} color={isActive ? C.surface : C.bg} x={0} y={0} />
            {isActive && (
              <Rect width={tabW} height={0.05} color={C.iris} x={0} y={0} />
            )}
            <Text font={FONT_URL} fontSize={0.25} color={isActive ? C.text : C.muted} position={[0.2, -0.4, 0.02]} anchorX="left" anchorY="middle">
              {file}
            </Text>
          </group>
        )
      })}
    </group>
  );
});
