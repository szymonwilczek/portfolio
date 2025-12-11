import React from "react";
import { X } from "lucide-react";
import { C, getFileIcon } from "./VimConfig";

interface VimTabsProps {
  openFiles: string[];
  activeFile: string;
}

export const VimTabs: React.FC<VimTabsProps> = ({ openFiles, activeFile }) => {
  return (
    <div
      className="h-9 flex items-end overflow-hidden select-none"
      style={{ backgroundColor: "#191724" }}
    >
      {openFiles.map((filename) => {
        const isActive = filename === activeFile;

        return (
          <div
            key={filename}
            className={`
              relative flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer transition-all duration-200
              ${isActive ? "pt-1.5" : "pt-2 opacity-60 hover:opacity-100"}
            `}
            style={{
              backgroundColor: isActive ? C.surface : "transparent",
              color: isActive ? C.text : C.muted,
              minWidth: "120px",
              maxWidth: "180px",
              borderRight: `1px solid ${C.bg}`,
              borderTop: isActive ? `2px solid ${C.iris}` : "2px solid transparent"
            }}
          >
            <span className="opacity-90">
              {getFileIcon(filename)}
            </span>

            <span className="truncate flex-1 font-medium font-mono text-xs">
              {filename}
            </span>

            <span className={`opacity-0 ${isActive ? "group-hover:opacity-100 opacity-50" : ""} hover:text-[#eb6f92]`}>
              <X size={12} />
            </span>
          </div>
        );
      })}

      <div
        className="flex-1 h-full border-b"
        style={{ borderColor: C.surface, backgroundColor: "#191724" }}
      />
    </div>
  );
};
