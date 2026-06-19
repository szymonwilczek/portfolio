"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { FILES_CONTENT } from "./VimFiles";
import { drawVim, CV_WIDTH, CV_HEIGHT } from "./VimCanvasRenderer";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export interface VimScreenProps {
  onTextureUpdate?: (texture: THREE.CanvasTexture) => void;
  lowEndMode?: boolean;
}

export function VimScreen({
  onTextureUpdate,
  lowEndMode = false,
}: VimScreenProps) {
  const { gl } = useThree();
  const [openFiles, setOpenFiles] = useState(["main.c", "portfolio.h"]);
  const [activeFile, setActiveFile] = useState("main.c");
  const contentRef = useRef<string[]>([...FILES_CONTENT["main.c"]]);
  const [fileContent, setFileContent] = useState<string[]>(
    FILES_CONTENT["main.c"],
  );
  const [explorerIndex, setExplorerIndex] = useState(0);
  const [mode, setMode] = useState("NORMAL");
  const [statusBarMsg, setStatusBarMsg] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [cursor, setCursor] = useState({ line: 0, col: 0 });
  const [visualStartLine, setVisualStartLine] = useState<number | null>(null);
  const [centerTrigger, setCenterTrigger] = useState(0);
  const [fontReady, setFontReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  // wait for the Nerd Font before drawing, otherwise the first frames render
  // with the fallback monospace and bake into the texture
  useEffect(() => {
    let cancelled = false;
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (!fonts) {
      setFontReady(true);
      return;
    }
    Promise.all([
      fonts.load("24px 'JetBrainsMono Nerd Font Mono'"),
      fonts.load("bold 24px 'JetBrainsMono Nerd Font Mono'"),
    ])
      .then(() => {
        if (!cancelled) setFontReady(true);
      })
      .catch(() => {
        if (!cancelled) setFontReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
      isTreeFocused: false,
      visualStartLine,
      statusBarMsg,
      errorCount,
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
    openFiles,
    activeFile,
    fileContent,
    cursor,
    mode,
    explorerIndex,
    visualStartLine,
    statusBarMsg,
    errorCount,
    onTextureUpdate,
    gl,
    fontReady,
  ]);

  const stateRef = useRef({
    openFiles,
    activeFile,
    cursor,
    mode,
    explorerIndex,
    visualStartLine,
    centerTrigger,
  });

  useEffect(() => {
    stateRef.current = {
      openFiles,
      activeFile,
      cursor,
      mode,
      explorerIndex,
      visualStartLine,
      centerTrigger,
    };
  }, [
    openFiles,
    activeFile,
    cursor,
    mode,
    explorerIndex,
    visualStartLine,
    centerTrigger,
  ]);

  useEffect(() => {
    const actions = [
      { type: "wait", ms: 1200 },
      { type: "open_file", file: "portfolio.c" },
      { type: "wait", ms: 1000 },
      { type: "set_errors", count: 4 },
      { type: "wait", ms: 500 },
      { type: "move_cursor", line: 17, col: 0 },
      { type: "wait", ms: 150 },
      { type: "center_view" },
      { type: "wait", ms: 800 },
      { type: "set_mode", val: "V-LINE" },
      { type: "wait", ms: 400 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 },
      { type: "wait", ms: 250 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 },
      { type: "wait", ms: 250 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 },
      { type: "wait", ms: 250 },
      { type: "move_cursor_relative", dLine: 1, dCol: 0 },
      { type: "wait", ms: 600 },
      { type: "delete_selection" },
      { type: "set_errors", count: 0 },
      { type: "wait", ms: 800 },
      { type: "show_command", val: ":w" },
      { type: "wait", ms: 400 },
      { type: "hide_command" },
      { type: "show_msg", val: `"portfolio.c" 20L written` },
      { type: "wait", ms: 1500 },
      { type: "hide_command" },
      { type: "show_command", val: ":q" },
      { type: "wait", ms: 600 },
      { type: "close_buffer" },
      { type: "wait", ms: 1000 },
      { type: "move_cursor", line: 9, col: 0 },
      { type: "wait", ms: 500 },
      { type: "shift_a" },
      { type: "wait", ms: 500 },
      { type: "press_enter" },
      { type: "wait", ms: 100 },
      { type: "press_enter" },
      { type: "wait", ms: 500 },
      { type: "set_mode", val: "NORMAL" },
      { type: "wait", ms: 200 },
      { type: "set_mode", val: "INSERT" },
      { type: "fix_indent", indent: 8 },
      { type: "type_text_slowly", text: "/* Welcome to my world! */" },
      { type: "press_enter" },
      { type: "wait", ms: 300 },
      { type: "fix_indent", indent: 8 },
      { type: "type_text_slowly", text: "/* I hope you like my work. */" },
      { type: "press_enter" },
      { type: "wait", ms: 300 },
      { type: "fix_indent", indent: 8 },
      {
        type: "type_text_slowly",
        text: "/* Let's build something, shall we? */",
      },
      { type: "wait", ms: 800 },
      { type: "set_mode", val: "NORMAL" },
      { type: "wait", ms: 500 },
      { type: "show_command", val: ":w" },
      { type: "wait", ms: 300 },
      { type: "hide_command" },
      { type: "show_msg", val: `"main.c" 17L written` },
      { type: "wait", ms: 2000 },
      { type: "hide_command" },
      { type: "prepare_loop" },
      { type: "wait", ms: 500 },
    ];

    let step = 0;

    const run = async () => {
      const action = actions[step % actions.length];
      const s = stateRef.current;

      switch (action.type) {
        case "wait": {
          // slower animations on mobile
          const delay = lowEndMode
            ? (action.ms as number) * 1.3
            : (action.ms as number);
          await new Promise((r) => setTimeout(r, delay));
          break;
        }
        case "open_file": {
          const targetFile = action.file as string;
          setOpenFiles((prev) =>
            prev.includes(targetFile) ? prev : [...prev, targetFile],
          );
          setActiveFile(targetFile);
          contentRef.current = [...FILES_CONTENT[targetFile]];
          setFileContent(FILES_CONTENT[targetFile]);
          setCursor({ line: 0, col: 0 });
          break;
        }
        case "move_cursor":
          setCursor({ line: action.line as number, col: action.col as number });
          break;
        case "move_cursor_relative":
          setCursor((prev) => ({
            line: prev.line + (action.dLine as number),
            col: Math.max(0, prev.col + (action.dCol as number)),
          }));
          break;
        case "center_view":
          setCenterTrigger((prev) => prev + 1);
          break;
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
        case "set_errors":
          setErrorCount(action.count as number);
          break;
        case "shift_a": {
          const lineContent = contentRef.current[s.cursor.line];
          setCursor({
            line: s.cursor.line,
            col: lineContent ? lineContent.length : 0,
          });
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
          setCursor((prev) => ({ ...prev, col: action.indent as number }));
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
            const updatedLine =
              (contentRef.current[activeLineIdx] || "") + char;
            const updatedFile = [...contentRef.current];
            updatedFile[activeLineIdx] = updatedLine;
            contentRef.current = updatedFile;
            setFileContent(updatedFile);
            setCursor((prev) => ({ ...prev, col: prev.col + 1 }));
            await new Promise((r) => setTimeout(r, 60 + Math.random() * 50));
          }
          break;
        }
        case "show_command":
          setMode("COMMAND");
          setStatusBarMsg(action.val as string);
          break;
        case "show_msg":
          setMode("NORMAL");
          setStatusBarMsg(action.val as string);
          break;
        case "hide_command":
          setStatusBarMsg("");
          if (s.mode === "COMMAND") setMode("NORMAL");
          break;
        case "close_buffer": {
          const newOpenFiles = s.openFiles.filter((f) => f !== s.activeFile);
          setOpenFiles(newOpenFiles);
          const fallbackFile = "main.c";
          setActiveFile(fallbackFile);
          setExplorerIndex(0);
          contentRef.current = [...FILES_CONTENT[fallbackFile]];
          setFileContent(FILES_CONTENT[fallbackFile]);
          setCursor({ line: 0, col: 0 });
          setStatusBarMsg("");
          setMode("NORMAL");
          break;
        }
        case "prepare_loop": {
          setOpenFiles(["main.c", "portfolio.h"]);
          setExplorerIndex(0);
          setErrorCount(0);
          setCenterTrigger(0);
          FILES_CONTENT["portfolio.c"] = [
            '#include "portfolio.h"',
            "#include <stdlib.h>",
            "#include <string.h>",
            "",
            "struct portfolio portfolio_init(const char *name)",
            "{",
            "        struct portfolio p;",
            "",
            "        p.name = strdup(name);",
            "        p.year = 2026;",
            "        p.semester = 6;",
            "",
            "        return p;",
            "}",
            "",
            "void portfolio_render(const struct portfolio *p)",
            "{",
            "        /* FIXME: drop this dead legacy branch */",
            "        if (p == NULL && p != NULL) {",
            "                legacy_render_deprecated(p);",
            "                return;",
            "        }",
            "",
            '        printf("%s :: sem %d\\n", p->name, p->semester);',
            "}",
          ];
          break;
        }
      }
      step++;
      setTimeout(run, lowEndMode ? 80 : 50);
    };
    // longer delay on mobile for model to stabilize
    const timer = setTimeout(run, lowEndMode ? 2000 : 1200);
    return () => clearTimeout(timer);
  }, [lowEndMode]);

  return (
    <Html>
      <canvas
        ref={canvasRef}
        width={CV_WIDTH}
        height={CV_HEIGHT}
        style={{ display: "none" }}
      />
    </Html>
  );
}
