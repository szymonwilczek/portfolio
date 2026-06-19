import { C } from "./VimConfig";
import { highlightLine } from "./VimSyntax";

export const CV_WIDTH = 955;
export const CV_HEIGHT = 535;

// font config
const FONT_FAMILY = "'JetBrainsMono Nerd Font Mono', monospace";
const FONT_MONO = `24px ${FONT_FAMILY}`;
const LINE_HEIGHT = 32;
const CHAR_WIDTH = 14.4;

// layout columns
const EXPLORER_WIDTH = 0;
const EDITOR_LEFT = EXPLORER_WIDTH;
const EDITOR_WIDTH = CV_WIDTH - EXPLORER_WIDTH;
const STATUS_BAR_HEIGHT = 40;
const EDITOR_TOP = 0;
const EDITOR_BOTTOM = CV_HEIGHT - STATUS_BAR_HEIGHT;
const VISIBLE_LINES = Math.floor((EDITOR_BOTTOM - EDITOR_TOP) / LINE_HEIGHT);

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
}

export const drawVim = (ctx: CanvasRenderingContext2D, state: RenderState) => {
  // clear screen
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, CV_WIDTH, CV_HEIGHT);

  drawEditor(ctx, state);
  drawStatusBar(ctx, state);
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
            ctx.fillStyle = "#403d52";
            ctx.fillRect(EDITOR_LEFT, y - 24, EDITOR_WIDTH, LINE_HEIGHT);
        } else if (isCursorLine && state.mode !== "V-LINE") {
            ctx.fillStyle = "#1f1d2e";
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
            ctx.fillStyle = C.text;
            ctx.globalAlpha = 0.5;

            const cursorWidth = state.mode === "INSERT" ? 4 : CHAR_WIDTH;
            ctx.fillRect(cursorX, y - 22, cursorWidth, 26);
            ctx.globalAlpha = 1.0;
        }

        y += LINE_HEIGHT;
    }

    // line number
    ctx.fillStyle = isCursorLine || isSelected ? C.text : C.muted;
    ctx.textAlign = "right";
    ctx.font = "18px 'JetBrains Mono', monospace";
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
      ctx.fillStyle = C.text;
      ctx.globalAlpha = 0.5;

      const cursorWidth = state.mode === "INSERT" ? 4 : CHAR_WIDTH;
      ctx.fillRect(cursorX, y - 22, cursorWidth, 26);
      ctx.globalAlpha = 1.0;
    }

    y += LINE_HEIGHT;
  }
  ctx.restore();
}

function drawStatusBar(ctx: CanvasRenderingContext2D, state: RenderState) {
  const barY = CV_HEIGHT - STATUS_BAR_HEIGHT;

  // background
  let bg = C.overlay;
  if (state.mode === "INSERT") bg = C.rose;
  if (state.mode === "V-LINE") bg = C.gold;
  if (state.mode === "COMMAND") bg = C.pine;

  ctx.fillStyle = bg;
  ctx.fillRect(EDITOR_LEFT, barY, EDITOR_WIDTH, STATUS_BAR_HEIGHT);

  // mode text
  ctx.fillStyle = "#191724";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText(state.mode, EDITOR_LEFT + 15, barY + 26);

  // file info
  ctx.fillStyle = C.text;
  ctx.fillStyle = "#191724";

  const modeWidth = 120;

  ctx.fillStyle = "#191724";
  ctx.fillRect(
    EDITOR_LEFT + modeWidth,
    barY,
    EDITOR_WIDTH - modeWidth,
    STATUS_BAR_HEIGHT,
  );

  // file name
  ctx.fillStyle = C.text;
  ctx.font = "18px monospace";
  ctx.fillText(state.activeFile, EDITOR_LEFT + modeWidth + 20, barY + 26);

  // status msg
  if (state.statusBarMsg) {
    ctx.fillStyle = C.text;
    ctx.fillText(state.statusBarMsg, EDITOR_LEFT + modeWidth + 200, barY + 26);
  } else if (state.errorCount > 0) {
    ctx.fillStyle = C.love;
    ctx.fillText(
      `${state.errorCount} errors`,
      EDITOR_LEFT + modeWidth + 200,
      barY + 26,
    );
  }

    // file name
    ctx.fillStyle = C.text;
    ctx.font = `18px ${FONT_FAMILY}`;
    ctx.fillText(state.activeFile, EDITOR_LEFT + modeWidth + 20, barY + 26);

    // status msg
    if (state.statusBarMsg) {
        ctx.fillStyle = C.text;
        ctx.fillText(state.statusBarMsg, EDITOR_LEFT + modeWidth + 200, barY + 26);
    } else if (state.errorCount > 0) {
        ctx.fillStyle = C.love;
        ctx.fillText(
            `${state.errorCount} errors`,
            EDITOR_LEFT + modeWidth + 200,
            barY + 26,
        );
    }

    // cursor pos
    const posText = `${state.cursor.line + 1}:${state.cursor.col + 1}`;
    ctx.fillStyle = C.text;
    ctx.textAlign = "right";
    ctx.fillText(posText, CV_WIDTH - 20, barY + 26);
    ctx.textAlign = "left";
}
