import { C, STATUS, MODE_LONG, STATUS_ICON } from "./VimConfig";
import { highlightLine } from "./VimSyntax";

export const CV_WIDTH = 955;
export const CV_HEIGHT = 535;

// font config
const FONT_FAMILY = "'JetBrainsMono Nerd Font Mono', monospace";
const FONT_MONO = `36px ${FONT_FAMILY}`;
const LINE_HEIGHT = 32;
const CHAR_WIDTH = 14.4;

// layout columns
const EXPLORER_WIDTH = 0;
const EDITOR_LEFT = EXPLORER_WIDTH;
const EDITOR_WIDTH = CV_WIDTH - EXPLORER_WIDTH;
const STATUS_BAR_HEIGHT = 30;
const CMDLINE_HEIGHT = 26;
const EDITOR_TOP = 0;
const EDITOR_BOTTOM = CV_HEIGHT - STATUS_BAR_HEIGHT - CMDLINE_HEIGHT;
const VISIBLE_LINES = Math.floor((EDITOR_BOTTOM - EDITOR_TOP) / LINE_HEIGHT);

const STATUS_FONT = `20px ${FONT_FAMILY}`;

interface RenderState {
  openFiles: string[];
  activeFile: string;
  fileContent: string[];
  cursor: { line: number; col: number };
  mode: string;
  explorerIndex: number;
  isTreeFocused: boolean;
  visualStartLine: number | null;
  statusBarMsg: string;
  errorCount: number;
  modified: boolean;
}

export const drawVim = (ctx: CanvasRenderingContext2D, state: RenderState) => {
  // clear screen
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, CV_WIDTH, CV_HEIGHT);

  drawEditor(ctx, state);
  drawStatusLine(ctx, state);
  drawCmdLine(ctx, state);
};

function drawEditor(ctx: CanvasRenderingContext2D, state: RenderState) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(EDITOR_LEFT, EDITOR_TOP, EDITOR_WIDTH, EDITOR_BOTTOM - EDITOR_TOP);
  ctx.clip();

  const scrollOffset = Math.max(
    0,
    state.cursor.line - Math.floor(VISIBLE_LINES / 2),
  );
  let y = EDITOR_TOP + 24; // baseline

  const startLine = scrollOffset;
  const endLine = Math.min(
    state.fileContent.length,
    startLine + VISIBLE_LINES + 5,
  );

  const LINE_NUM_WIDTH = 50;

  for (let i = startLine; i < endLine; i++) {
    const lineContent = state.fileContent[i] || "";

    // line highlight
    const isCursorLine = i === state.cursor.line && !state.isTreeFocused;
    const isVisual = state.mode === "V-LINE" && state.visualStartLine !== null;
    const isSelected =
      isVisual &&
      i >= Math.min(state.visualStartLine!, state.cursor.line) &&
      i <= Math.max(state.visualStartLine!, state.cursor.line);

    if (isSelected) {
      ctx.fillStyle = C.selection;
      ctx.fillRect(EDITOR_LEFT, y - 24, EDITOR_WIDTH, LINE_HEIGHT);
    } else if (isCursorLine && state.mode !== "V-LINE") {
      ctx.fillStyle = C.highlight;
      ctx.fillRect(EDITOR_LEFT, y - 24, EDITOR_WIDTH, LINE_HEIGHT);
    }

    // line number
    ctx.fillStyle = isCursorLine || isSelected ? C.text : C.muted;
    ctx.textAlign = "right";
    ctx.font = `18px ${FONT_FAMILY}`;
    ctx.fillText((i + 1).toString(), EDITOR_LEFT + 40, y);
    ctx.textAlign = "left";

    // syntax highlighted text
    let x = EDITOR_LEFT + LINE_NUM_WIDTH;
    const tokens = highlightLine(lineContent);

    ctx.font = FONT_MONO; // 24px
    tokens.forEach((token) => {
      ctx.fillStyle = token.color;
      ctx.fillText(token.text, x, y);
      x += ctx.measureText(token.text).width;
    });

    // cursor (block)
    if (isCursorLine && state.mode !== "V-LINE") {
      const cursorX =
        EDITOR_LEFT + LINE_NUM_WIDTH + state.cursor.col * CHAR_WIDTH;
      ctx.fillStyle = C.cursor;
      ctx.globalAlpha = 0.5;

      const cursorWidth = state.mode === "INSERT" ? 4 : CHAR_WIDTH;
      ctx.fillRect(cursorX, y - 22, cursorWidth, 26);
      ctx.globalAlpha = 1.0;
    }

    y += LINE_HEIGHT;
  }
  ctx.restore();
}

function bufferSize(lines: string[]): string {
  const bytes = lines.reduce((sum, l) => sum + l.length + 1, 0);
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)}KiB`;
  return `${(bytes / 1048576).toFixed(2)}MiB`;
}

// mini.statusline: [mode] [devinfo] [filename] %= [fileinfo] [location]
function drawStatusLine(ctx: CanvasRenderingContext2D, state: RenderState) {
  const barY = CV_HEIGHT - CMDLINE_HEIGHT - STATUS_BAR_HEIGHT;
  const textY = barY + 21;
  const modeColor = STATUS.mode[state.mode] || "#4fb0cf";

  ctx.font = STATUS_FONT;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = STATUS.fill;
  ctx.fillRect(EDITOR_LEFT, barY, EDITOR_WIDTH, STATUS_BAR_HEIGHT);

  // diagnostics: only error count is faked by the animation
  const diag =
    state.errorCount > 0 ? ` ${STATUS_ICON.diag} E${state.errorCount}` : "";

  const modeText = ` ${MODE_LONG[state.mode] || state.mode} `;
  const devText = ` ${STATUS_ICON.git} main ${STATUS_ICON.diff} -${diag} `;
  const fileText = ` ${state.activeFile}${state.modified ? " [+]" : ""} `;

  const ftIcon = STATUS_ICON.fileC;
  const infoText = ` ${ftIcon} c utf-8[unix] ${bufferSize(state.fileContent)} `;
  const loc =
    `${(state.cursor.line + 1).toString().padStart(2)}:` +
    `${(state.cursor.col + 1).toString().padEnd(2)}`;
  const locText = ` ${loc} `;

  // --- left side ---
  let x = EDITOR_LEFT;

  // mode block
  const modeW = ctx.measureText(modeText).width;
  ctx.fillStyle = modeColor;
  ctx.fillRect(x, barY, modeW, STATUS_BAR_HEIGHT);
  ctx.fillStyle = STATUS.black;
  ctx.fillText(modeText, x, textY);
  x += modeW;

  // devinfo
  ctx.fillStyle = STATUS.fg;
  ctx.fillText(devText, x, textY);
  x += ctx.measureText(devText).width;

  // filename block
  const fileW = ctx.measureText(fileText).width;
  ctx.fillStyle = STATUS.filenameBg;
  ctx.fillRect(x, barY, fileW, STATUS_BAR_HEIGHT);
  ctx.fillStyle = STATUS.fg;
  ctx.fillText(fileText, x, textY);

  // --- right side ---
  const locW = ctx.measureText(locText).width;
  const infoW = ctx.measureText(infoText).width;

  // location block flush right
  const locX = CV_WIDTH - locW;
  ctx.fillStyle = modeColor;
  ctx.fillRect(locX, barY, locW, STATUS_BAR_HEIGHT);
  ctx.fillStyle = STATUS.black;
  ctx.fillText(locText, locX, textY);

  // fileinfo to the left of location
  ctx.fillStyle = STATUS.fg;
  ctx.fillText(infoText, locX - infoW, textY);
}

// bottom-most row: command line and ex messages
function drawCmdLine(ctx: CanvasRenderingContext2D, state: RenderState) {
  const y = CV_HEIGHT - CMDLINE_HEIGHT;

  ctx.fillStyle = C.bg;
  ctx.fillRect(EDITOR_LEFT, y, EDITOR_WIDTH, CMDLINE_HEIGHT);

  if (!state.statusBarMsg) return;

  ctx.font = STATUS_FONT;
  ctx.fillStyle = C.text;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(state.statusBarMsg, EDITOR_LEFT + 8, y + 19);
}
