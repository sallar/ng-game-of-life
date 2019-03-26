import { Cell } from "ng-game-of-life";

const CELL_SIZE = 10; // px
const LINE_WDITH = 2;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

export function setCanvasSize(canvas, width, height) {
  const ctx = canvas.getContext("2d");
  const canvasHeight = (CELL_SIZE + LINE_WDITH) * height + LINE_WDITH;
  const canvasWidth = (CELL_SIZE + LINE_WDITH) * width + LINE_WDITH;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = `${canvasWidth / 2}px`;
  canvas.style.height = `${canvasHeight / 2}px`;
}

export function drawGrid(canvas, width, height) {
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + LINE_WDITH) + LINE_WDITH, 0);
    ctx.lineTo(
      i * (CELL_SIZE + LINE_WDITH) + LINE_WDITH,
      (CELL_SIZE + LINE_WDITH) * height + LINE_WDITH
    );
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + LINE_WDITH) + LINE_WDITH);
    ctx.lineTo(
      (CELL_SIZE + LINE_WDITH) * width + LINE_WDITH,
      j * (CELL_SIZE + LINE_WDITH) + LINE_WDITH
    );
  }

  ctx.stroke();
}

export function drawCells(canvas, width, height, cells) {
  const ctx = canvas.getContext("2d");

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = row * width + col;

      ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + LINE_WDITH) + LINE_WDITH,
        row * (CELL_SIZE + LINE_WDITH) + LINE_WDITH,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
}
