import React from "react";
import { highlightLine } from "./VimSyntax";
import { C } from "./VimConfig";

interface VimLineProps {
  content: string;
  lineNumber: number;
  isSelected: boolean;
}

const VimLineComponent: React.FC<VimLineProps> = ({
  content,
  lineNumber,
  isSelected
}) => {
  const tokens = highlightLine(content);

  return (
    <div
      className="flex min-h-[1.5rem] leading-6 transition-colors duration-75"
      style={{
        backgroundColor: isSelected ? "#403d52" : "transparent"
      }}
    >
      <div
        className="w-10 text-right pr-4 select-none flex-shrink-0 text-xs pt-1"
        style={{ color: isSelected ? C.text : C.muted }}
      >
        {lineNumber}
      </div>

      <div className="flex-1 whitespace-pre relative pl-2 break-all">
        {tokens.map((token, tIndex) => (
          <span key={tIndex} style={{ color: token.color }}>
            {token.text}
          </span>
        ))}
      </div>
    </div>
  );
};

function arePropsEqual(prev: VimLineProps, next: VimLineProps) {
  return (
    prev.content === next.content &&
    prev.isSelected === next.isSelected
  );
}

export const VimLine = React.memo(VimLineComponent, arePropsEqual);
