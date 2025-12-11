import React from "react";
import { GitBranch, AlertCircle, CheckCircle2 } from "lucide-react";
import { C, getFileIcon } from "./VimConfig";
import { VimIcon } from "@/components/icons/VimIcon";


interface VimStatusBarProps {
  mode: string;
  filename?: string;
  branch?: string;
  errorCount?: number;
  line?: number;
  col?: number;
  message?: string;
}

export const VimStatusBar: React.FC<VimStatusBarProps> = ({
  mode = "NORMAL",
  filename = "[No Name]",
  branch = "main",
  errorCount = 0,
  line = 0,
  col = 0,
  message = "",
}) => {
  const getModeColor = () => {
    switch (mode) {
      case "INSERT": return C.pine;
      case "VISUAL": return C.iris;
      case "VISUAL LINE": return C.iris;
      case "COMMAND": return C.love;
      default: return C.foam;
    }
  };

  const activeColor = getModeColor();
  const statusTextColor = "#191724";

  return (
    <div className="h-7 flex text-xs font-medium font-mono select-none border-t border-[#26233a]" style={{ backgroundColor: C.surface }}>

      <div
        className="px-3 flex items-center gap-2 font-bold uppercase transition-colors duration-300"
        style={{
          backgroundColor: activeColor,
          color: statusTextColor
        }}
      >
        <VimIcon size={20} color={statusTextColor} />
        <span className="tracking-wide mt-[1px]">{mode}</span>
      </div>

      {message ? (
        <div className="flex-1 flex items-center px-3 text-[#e0def4] animate-in fade-in duration-200">
          {message}
        </div>
      ) : (
        <>
          <div className="px-2 flex items-center gap-2" style={{ color: C.text }}>
            {getFileIcon(filename || "", false)}
            <span>{filename}</span>
          </div>

          <div className="px-2 flex items-center gap-1 p-2" style={{ color: C.muted }}>
            <GitBranch size={12} />
            <span>{branch}</span>
          </div>

          <div className="flex-1" />

          <div className="px-3 flex items-center gap-2">
            {errorCount > 0 ? (
              <span className="flex items-center gap-1" style={{ color: C.love }}>
                <AlertCircle size={12} /> {errorCount}
              </span>
            ) : (
              <span className="flex items-center gap-1" style={{ color: C.pine }}>
                <CheckCircle2 size={12} /> OK
              </span>
            )}
          </div>

          <div
            className="px-3 flex items-center min-w-[80px] justify-center transition-colors duration-300"
            style={{
              backgroundColor: activeColor,
              color: statusTextColor
            }}
          >
            Ln {line}, Col {col}
          </div>

          <div className="flex items-center gap-1.5 p-2 cursor-pointer bg-foreground/15 transition-colors duration-75">
            {getFileIcon("wolfie-portfolio", false)}
            <span className="font-medium">wolfie-portfolio</span>
          </div>
        </>
      )}
    </div>
  );
};
