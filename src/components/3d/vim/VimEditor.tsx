import React from "react";
import { Text } from "@react-three/drei";
import { C } from "./VimConfig";
import { Rect, CodeToken, FONT_URL, NUM_FONT_SIZE } from "./VimCommon";
import { highlightLine } from "./VimSyntax";
import { EXPLORER_W, EDITOR_W, TAB_H, SCREEN_H } from "./VimScreen";

const LINE_H = 0.65;
const CHAR_W = 0.195;

export const VimEditor = React.memo(({ fileContent, cursor, mode, visualStartLine, isTreeFocused }: any) => {
  const visibleLines = 17;
  const scrollOffset = Math.max(0, cursor.line - Math.floor(visibleLines / 2)) * LINE_H;

  return (
    <group position={[EXPLORER_W + 0.4, -TAB_H - 0.2, 0]}>
      <group position={[0, scrollOffset, 0]}>
        {fileContent.map((line: string, lineIdx: number) => {
          const relativeY = lineIdx * LINE_H - scrollOffset;
          if (relativeY < -2 || relativeY > SCREEN_H + 2) return null;

          const tokens = highlightLine(line);
          const isLineActive = !isTreeFocused && cursor.line === lineIdx;
          const isSelected = mode === "VISUAL LINE" && visualStartLine !== null &&
            lineIdx >= Math.min(visualStartLine, cursor.line) &&
            lineIdx <= Math.max(visualStartLine, cursor.line);

          let charOffset = 0;
          const CONTENT_PADDING_LEFT = 0.4;
          const NUMBERS_PADDING_LEFT = 0.05;

          return (
            <group key={lineIdx} position={[0, -lineIdx * LINE_H, 0]}>
              {(isLineActive || isSelected) && (
                <Rect
                  width={EDITOR_W}
                  height={LINE_H}
                  color={isSelected ? "#403d52" : "#1f1d2e"}
                  x={-0.4}
                  y={LINE_H / 4}
                />
              )}

              <Text font={FONT_URL} fontSize={NUM_FONT_SIZE} color={isSelected ? C.text : C.muted} position={[NUMBERS_PADDING_LEFT, -0.05, 0.01]} anchorX="right" anchorY="top">
                {lineIdx + 1}
              </Text>

              <group position={[CONTENT_PADDING_LEFT, 0, 0]}>
                {tokens.map((token: any, tIdx: number) => {
                  const el = (
                    <CodeToken
                      key={tIdx}
                      text={token.text}
                      color={token.color}
                      x={charOffset * CHAR_W}
                      y={0}
                    />
                  );
                  charOffset += token.text.length;
                  return el;
                })}
              </group>

              {isLineActive && mode !== "VISUAL LINE" && (
                <mesh position={[CONTENT_PADDING_LEFT + (cursor.col * CHAR_W) + (CHAR_W / 2), -0.16, 0.03]}>
                  <planeGeometry args={[mode === "INSERT" ? 0.05 : CHAR_W, 0.5]} />
                  <meshBasicMaterial color={C.text} opacity={0.6} transparent />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
});
