import React, { useEffect, useRef } from "react";
import { VimLine } from "./VimLine";
import { C } from "./VimConfig";

interface VimEditorProps {
  content: string[];
  cursorLine: number;
  cursorCol: number;
  mode: string;
  isActive: boolean;
  visualStartLine: number | null;
  centerTrigger: number;
}

export const VimEditor: React.FC<VimEditorProps> = ({
  content,
  cursorLine,
  cursorCol,
  mode,
  isActive,
  visualStartLine,
  centerTrigger
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // zz
  useEffect(() => {
    if (centerTrigger > 0 && containerRef.current) {
      const container = containerRef.current;
      const lineHeight = 24;
      const targetTop = cursorLine * lineHeight;

      const targetScroll = targetTop - (container.clientHeight / 2) + (lineHeight / 2);

      container.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [centerTrigger, cursorLine]);

  const isLineSelected = (lineIndex: number) => {
    if (mode !== "VISUAL LINE" || visualStartLine === null) return false;
    const start = Math.min(visualStartLine, cursorLine);
    const end = Math.max(visualStartLine, cursorLine);
    return lineIndex >= start && lineIndex <= end;
  };

  return (
    <div className="flex-1 overflow-hidden font-mono text-[15px] relative bg-[#191724]">
      <div
        ref={containerRef}
        className="absolute inset-0 p-4 overflow-auto custom-scrollbar scroll-smooth"
      >
        {content.map((lineText, lineIndex) => (
          <VimLine
            key={lineIndex}
            content={lineText}
            lineNumber={lineIndex + 1}
            isSelected={isLineSelected(lineIndex)}
          />
        ))}

        {isActive && mode !== "VISUAL LINE" && (
          <div
            className="absolute pointer-events-none transition-all duration-75"
            style={{
              top: `calc(1rem + ${cursorLine * 1.5}rem)`,
              left: `calc(4rem + ${cursorCol}ch)`,
              height: "1.5rem",
              width: mode === "INSERT" ? "2px" : "1ch",
              backgroundColor: C.text,
              opacity: mode === "INSERT" ? 1 : 0.5,
              animation: mode === "INSERT" ? "pulse 1s infinite" : "none"
            }}
          />
        )}

        {Array.from({ length: Math.max(0, 25 - content.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="flex text-[#26233a] pl-4 leading-6">~</div>
        ))}

        <div className="h-[200px]" />
      </div>
    </div>
  );
};
