import { LangIcon } from "@/components/icons/LangIcon";
import {
  FileText,
  Folder,
  FolderOpen,
  Atom,
  FileJson,
  Hash,
  Code2,
  File,
} from "lucide-react";

// ef-autumn (from arete.nvim, recommend to check it out!)
// https://github.com/szymonwilczek/arete.nvim
export const C = {
  bg: "#0f0e06", // Normal bg
  surface: "#15140d", // Pmenu bg (raised)
  overlay: "#26211d", // NormalFloat bg
  muted: "#887c8a", // LineNr / punctuation
  comment: "#cf9f7f", // Comment
  text: "#cfbcba", // Normal fg
  love: "#f06a3f", // Error / String
  gold: "#f06a3f", // String
  rose: "#3dbbb0", // Function / Character
  pine: "#c48702", // Keyword
  foam: "#d570af", // PreProc (#include / #define)
  iris: "#2fa526", // Type (int / struct / const)
  constant: "#64aa0f", // Constant / Number
  cursor: "#ffaa33", // Cursor
  highlight: "#302a3a", // CursorLine bg
  selection: "#3f1324", // Visual bg
};

// file structure
export interface FileNode {
  id: string;
  name: string;
  type: "folder" | "file";
  depth: number;
  isOpen?: boolean;
}

export const INITIAL_FILE_TREE: FileNode[] = [
  {
    id: "root",
    name: "wolfie-portfolio",
    type: "folder",
    depth: 0,
    isOpen: true,
  },

  { id: "src", name: "src", type: "folder", depth: 1, isOpen: true },
  { id: "app", name: "app", type: "folder", depth: 2, isOpen: true },
  { id: "page.tsx", name: "page.tsx", type: "file", depth: 3 },
  { id: "layout.tsx", name: "layout.tsx", type: "file", depth: 3 },
  { id: "globals.css", name: "globals.css", type: "file", depth: 3 },

  {
    id: "components",
    name: "components",
    type: "folder",
    depth: 2,
    isOpen: false,
  },
  { id: "utils", name: "lib", type: "folder", depth: 2, isOpen: false },

  {
    id: "tailwind.config.ts",
    name: "tailwind.config.ts",
    type: "file",
    depth: 1,
  },
  { id: "package.json", name: "package.json", type: "file", depth: 1 },
  { id: "README.md", name: "README.md", type: "file", depth: 1 },
  { id: ".gitignore", name: ".gitignore", type: "file", depth: 1 },
];

export const getFileIcon = (filename: string, isOpen: boolean = false) => {
  if (filename.includes(".")) {
    const ext = filename.split(".").pop();

    switch (ext) {
      case "tsx":
      case "jsx":
        return <Atom size={15} color={C.foam} />;

      case "ts":
        return <LangIcon text="TS" color="#3178c6" />;

      case "js":
      case "mjs":
        return <LangIcon text="JS" color={C.gold} />;

      case "css":
      case "scss":
      case "sass":
        return <Hash size={15} color={C.love} />;

      case "html":
        return <Code2 size={15} color={C.love} />;

      case "json":
        return <FileJson size={15} color={C.gold} />;

      case "md":
      case "txt":
      case "gitignore":
        return <FileText size={15} color={C.muted} />;

      default:
        return <File size={15} color={C.text} />;
    }
  }

  // dirs
  return isOpen ? (
    <FolderOpen size={16} color={C.rose} fill={C.overlay} fillOpacity={0.3} />
  ) : (
    <Folder size={16} color={C.rose} fill={C.overlay} fillOpacity={0.3} />
  );
};
