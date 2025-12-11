import React from "react";
import { Text } from "@react-three/drei";
import { C } from "./VimConfig";
import { Rect, FONT_URL } from "./VimCommon";
import { SCREEN_W, SCREEN_H, BAR_H } from "./VimScreen";

export const VimStatusBar = React.memo(({ mode, activeFile, statusBarMsg, errorCount, cursor }: any) => {
  const statusColor = mode === "INSERT" ? C.pine : (mode === "VISUAL" || mode === "VISUAL LINE" ? C.iris : (mode === "COMMAND" ? C.love : C.foam));

  return (
    <group position={[0, -SCREEN_H + BAR_H, 0.1]}>
      <Rect width={SCREEN_W} height={BAR_H} color={C.surface} x={0} y={0} />

      <group position={[0, 0, 0.05]}>
        <Rect width={2.5} height={BAR_H} color={statusColor} x={0} y={0} />
        <Text font={FONT_URL} fontSize={0.25} color="#191724" position={[0.2, -0.4, 0.01]} anchorX="left" anchorY="middle" fontWeight="700">
          {mode}
        </Text>
      </group>

      <group position={[2.8, -0.4, 0.05]}>
        <Text font={FONT_URL} fontSize={0.25} color={C.text} position={[0.1, 0, 0]} anchorX="left" anchorY="middle">
          main
        </Text>

        <Text font={FONT_URL} fontSize={0.25} color={C.muted} position={[1.0, 0, 0]} anchorX="left" anchorY="middle">
          |
        </Text>

        <Text font={FONT_URL} fontSize={0.25} color={C.foam} position={[1.3, 0, 0]} anchorX="left" anchorY="middle">
          📄
        </Text>

        <Text font={FONT_URL} fontSize={0.25} color={C.text} position={[1.7, 0, 0]} anchorX="left" anchorY="middle">
          {statusBarMsg || `${activeFile} ${errorCount > 0 ? `   ❌ ${errorCount}` : ""}`}
        </Text>
      </group>

      <Text font={FONT_URL} fontSize={0.25} color={C.muted} position={[SCREEN_W - 0.5, -0.4, 0.05]} anchorX="right" anchorY="middle">
        Ln {cursor.line + 1}, Col {cursor.col + 1}
      </Text>
    </group>
  );
});
