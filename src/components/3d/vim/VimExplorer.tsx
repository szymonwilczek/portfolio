import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { C, FileNode, getFileIcon } from "./VimConfig";

interface VimExplorerProps {
  files: FileNode[];
  selectedIndex: number;
}

export const VimExplorer: React.FC<VimExplorerProps> = ({ files, selectedIndex }) => {
  return (
    <div className="w-60 flex-shrink-0 flex flex-col border-r border-[#26233a] font-mono text-sm">
      <div className="p-2 text-xs tracking-widest font-bold text-red-400 opacity-80 pl-4 mb-1">
        ~/GitHub/wolfie-portfolio
      </div>

      <div className="flex-1 overflow-hidden">
        {files.map((node, index) => {

          const isActive = index === selectedIndex;

          return (
            <div
              key={node.id}
              className={`flex items-center gap-1.5 py-[2px] cursor-pointer transition-colors duration-75`}
              style={{
                paddingLeft: `${node.depth * 14 + 10}px`,
                color: isActive ? C.text : C.muted
              }}
            >
              <span className="opacity-70 w-4 flex justify-center">
                {node.type === "folder" && (
                  node.isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />
                )}
              </span>

              {getFileIcon(node.name, node.isOpen)}

              <span className={isActive ? "font-medium" : ""}>
                {node.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
