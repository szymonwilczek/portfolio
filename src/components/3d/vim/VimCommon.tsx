import React from "react";
import { Text } from "@react-three/drei";

export const FONT_URL = "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.8/files/jetbrains-mono-latin-400-normal.woff";
export const CODE_FONT_SIZE = 0.32;
export const NUM_FONT_SIZE = 0.26;

export const CodeToken = React.memo(({ text, color, x, y }: { text: string, color: string, x: number, y: number }) => (
  <Text
    font={FONT_URL}
    fontSize={CODE_FONT_SIZE}
    color={color}
    position={[x, y, 0.02]}
    anchorX="left"
    anchorY="top"
  >
    {text}
  </Text>
));

export const Rect = React.memo(({ width, height, color, x, y, opacity = 1 }: any) => (
  <mesh position={[x + width / 2, y - height / 2, 0]}>
    <planeGeometry args={[width, height]} />
    <meshBasicMaterial color={color} transparent opacity={opacity} />
  </mesh>
));
