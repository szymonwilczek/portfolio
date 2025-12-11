"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { INITIAL_FILE_TREE } from "./VimConfig";
import { FILES_CONTENT } from "./VimFiles";
import { drawVim, CV_WIDTH, CV_HEIGHT } from "./VimCanvasRenderer";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export interface VimScreenProps {
  onTextureUpdate?: (texture: THREE.CanvasTexture) => void;
}

export function VimScreen({ onTextureUpdate }: VimScreenProps) {
  const { gl } = useThree(); // Get renderer for maxAnisotropy
  const [openFiles, setOpenFiles] = useState(["page.tsx", "globals.css"]);
  const [activeFile, setActiveFile] = useState("page.tsx");
  const contentRef = useRef<string[]>([...FILES_CONTENT["page.tsx"]]);
  const [fileContent, setFileContent] = useState<string[]>(FILES_CONTENT["page.tsx"]);
  const [explorerIndex, setExplorerIndex] = useState(() =>
    INITIAL_FILE_TREE.findIndex(node => node.name === "page.tsx")
  );
  const [isTreeFocused, setIsTreeFocused] = useState(false);
  const [mode, setMode] = useState("NORMAL");
  const [statusBarMsg, setStatusBarMsg] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [cursor, setCursor] = useState({ line: 0, col: 0 });
  const [visualStartLine, setVisualStartLine] = useState<number | null>(null);
  const [centerTrigger, setCenterTrigger] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    drawVim(ctx, {
      openFiles,
      activeFile,
      fileContent,
      cursor,
      mode,
      explorerIndex,
      isTreeFocused,
      visualStartLine,
      statusBarMsg,
      errorCount
    });

    // notify texture to update
    if (!textureRef.current) {
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.anisotropy = gl.capabilities.getMaxAnisotropy();
      tex.flipY = true;
      textureRef.current = tex;
      if (onTextureUpdate) onTextureUpdate(tex);
    } else {
      textureRef.current.needsUpdate = true;
    }

  }, [
    openFiles, activeFile, fileContent, cursor, mode,
    explorerIndex, isTreeFocused, visualStartLine,
    statusBarMsg, errorCount, onTextureUpdate, gl
  ]);

  const stateRef = useRef({
    openFiles, activeFile, cursor, mode, explorerIndex, isTreeFocused, visualStartLine, centerTrigger
  });

  useEffect(() => {
    stateRef.current = {
      openFiles, activeFile, cursor, mode, explorerIndex, isTreeFocused, visualStartLine, centerTrigger
    };
  }, [openFiles, activeFile, cursor, mode, explorerIndex, isTreeFocused, visualStartLine, centerTrigger]);

  useEffect(() => {
    const actions = [
      { type: "wait", ms: 1000 },
      { type: "focus_tree" }, { type: "wait", ms: 500 },
      { type: "tree_down" }, { type: "wait", ms: 300 },
      { type: "tree_enter" }, { type: "wait", ms: 1000 },
      { type: "set_errors", count: 4 }, { type: "wait", ms: 500 },
      { type: "move_cursor", line: 18, col: 0 }, { type: "wait", ms: 150 },
      { type: "center_view" }, { type: "wait", ms: 800 },
      { type: "set_mode", val: "V-LINE" }, { type: "wait", ms: 400 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 }, { type: "wait", ms: 250 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 }, { type: "wait", ms: 250 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 }, { type: "wait", ms: 250 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 }, { type: "wait", ms: 600 },
      { type: "delete_selection" }, { type: "set_errors", count: 0 }, { type: "wait", ms: 800 },
      { type: "show_command", val: ":w" }, { type: "wait", ms: 400 },
      { type: "hide_command" }, { type: "show_msg", val: `"src/app/layout.tsx" written` }, { type: "wait", ms: 1500 },
      { type: "hide_command" },
      { type: "show_command", val: ":q" }, { type: "wait", ms: 600 },
      { type: "close_buffer" }, { type: "wait", ms: 1000 },
      { type: "move_cursor", line: 7, col: 0 }, { type: "wait", ms: 500 },
      { type: "shift_a" }, { type: "wait", ms: 500 },
      { type: "press_enter" }, { type: "wait", ms: 100 },
      { type: "press_enter" }, { type: "wait", ms: 500 },
      { type: "set_mode", val: "NORMAL" }, { type: "wait", ms: 200 },
      { type: "set_mode", val: "INSERT" },
      { type: "fix_indent", indent: 8 },
      { type: "type_text_slowly", text: "// Welcome to my world!" },
      { type: "press_enter" },
      { type: "wait", ms: 300 },
      { type: "fix_indent", indent: 8 },
      { type: "type_text_slowly", text: "// I hope you like my work." },
      { type: "press_enter" },
      { type: "wait", ms: 300 },
      { type: "fix_indent", indent: 8 },
      { type: "type_text_slowly", text: "// Let's build something, shall we?" },
      { type: "wait", ms: 800 },
      { type: "set_mode", val: "NORMAL" }, { type: "wait", ms: 500 },
      { type: "show_command", val: ":w" }, { type: "wait", ms: 300 },
      { type: "hide_command" }, { type: "show_msg", val: `"src/app/page.tsx" written` }, { type: "wait", ms: 2000 },
      { type: "hide_command" },
      { type: "prepare_loop" }, { type: "wait", ms: 500 },
    ];

    let step = 0;

    const run = async () => {
      const action = actions[step % actions.length];
      const s = stateRef.current;

      switch (action.type) {
        case "wait": await new Promise(r => setTimeout(r, action.ms as number)); break;
        case "focus_tree": setIsTreeFocused(true); break;
        case "tree_down": setExplorerIndex(prev => prev + 1); break;
        case "tree_enter": {
          const targetFile = "layout.tsx";
          setOpenFiles(prev => prev.includes(targetFile) ? prev : [...prev, targetFile]);
          setActiveFile(targetFile);
          contentRef.current = [...FILES_CONTENT[targetFile]];
          setFileContent(FILES_CONTENT[targetFile]);
          setIsTreeFocused(false);
          setCursor({ line: 0, col: 0 });
          break;
        }
        case "move_cursor": setCursor({ line: action.line as number, col: action.col as number }); break;
        case "move_cursor_relative":
          setCursor(prev => ({ line: prev.line + (action.dLine as number), col: Math.max(0, prev.col + (action.dCol as number)) }));
          break;
        case "center_view": setCenterTrigger(prev => prev + 1); break;
        case "set_mode":
          setMode(action.val as string);
          if (action.val === "V-LINE") setVisualStartLine(s.cursor.line);
          else setVisualStartLine(null);
          break;
        case "delete_selection":
          if (s.mode === "V-LINE" && s.visualStartLine !== null) {
            const start = Math.min(s.visualStartLine, s.cursor.line);
            const end = Math.max(s.visualStartLine, s.cursor.line);
            const newContent = [...contentRef.current];
            newContent.splice(start, end - start + 1);
            contentRef.current = newContent;
            setFileContent(newContent);
            setMode("NORMAL");
            setVisualStartLine(null);
            setCursor({ line: start, col: 0 });
          }
          break;
        case "set_errors": setErrorCount(action.count as number); break;
        case "shift_a": {
          const lineContent = contentRef.current[s.cursor.line];
          setCursor({ line: s.cursor.line, col: lineContent ? lineContent.length : 0 });
          setMode("INSERT");
          break;
        }
        case "press_enter": {
          const lIdx = s.cursor.line;
          const newArr = [...contentRef.current];
          newArr.splice(lIdx + 1, 0, "");
          contentRef.current = newArr;
          setFileContent(newArr);
          setCursor({ line: lIdx + 1, col: 0 });
          break;
        }
        case "fix_indent": {
          setCursor(prev => ({ ...prev, col: action.indent as number }));
          const indentedArr = [...contentRef.current];
          indentedArr[s.cursor.line] = " ".repeat(action.indent as number);
          contentRef.current = indentedArr;
          setFileContent(indentedArr);
          break;
        }
        case "type_text_slowly": {
          const fullText = action.text as string;
          const activeLineIdx = s.cursor.line;
          for (let i = 0; i < fullText.length; i++) {
            const char = fullText[i];
            const updatedLine = (contentRef.current[activeLineIdx] || "") + char;
            const updatedFile = [...contentRef.current];
            updatedFile[activeLineIdx] = updatedLine;
            contentRef.current = updatedFile;
            setFileContent(updatedFile);
            setCursor(prev => ({ ...prev, col: prev.col + 1 }));
            await new Promise(r => setTimeout(r, 60 + Math.random() * 50));
          }
          break;
        }
        case "show_command": setMode("COMMAND"); setStatusBarMsg(action.val as string); break;
        case "show_msg": setMode("NORMAL"); setStatusBarMsg(action.val as string); break;
        case "hide_command": setStatusBarMsg(""); if (s.mode === "COMMAND") setMode("NORMAL"); break;
        case "close_buffer": {
          const newOpenFiles = s.openFiles.filter(f => f !== s.activeFile);
          setOpenFiles(newOpenFiles);
          const fallbackFile = "page.tsx";
          setActiveFile(fallbackFile);
          const fallbackIdx = INITIAL_FILE_TREE.findIndex(node => node.name === fallbackFile);
          if (fallbackIdx !== -1) setExplorerIndex(fallbackIdx);
          contentRef.current = [...FILES_CONTENT[fallbackFile]];
          setFileContent(FILES_CONTENT[fallbackFile]);
          setCursor({ line: 0, col: 0 });
          setStatusBarMsg("");
          setMode("NORMAL");
          break;
        }
        case "prepare_loop": {
          setOpenFiles(["page.tsx", "globals.css"]);
          const pageIndex = INITIAL_FILE_TREE.findIndex(node => node.name === "page.tsx");
          setExplorerIndex(pageIndex !== -1 ? pageIndex : 0);
          setErrorCount(0);
          setCenterTrigger(0);
          FILES_CONTENT["layout.tsx"] = [
            "import type { Metadata } from 'next';", "import { Inter } from 'next/font/google';", "import './globals.css';", "",
            "const inter = Inter({ subsets: ['latin'] });", "",
            "export const metadata: Metadata = {", "  title: 'Wolfie Portfolio',", "  description: 'Generated by create next app',", "};", "",
            "export default function RootLayout({", "  children,", "}: {", "  children: React.ReactNode", "}) {",
            "  return (", "    <html lang=\"en\">", "      {/* ERROR: Duplicate head tag detected */}",
            "      <head>", "        <title>Old Title</title>", "        <meta name=\"deprecated\" content=\"true\" />", "      </head>",
            "      <body className={inter.className}>{children}</body>", "    </html>", "  );", "}"
          ];
          break;
        }
      }
      step++;
      setTimeout(run, 50);
    };
    const timer = setTimeout(run, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Html>
      <canvas
        ref={canvasRef}
        width={CV_WIDTH}
        height={CV_HEIGHT}
        style={{ display: 'none' }}
      />
    </Html>
  );
}
