import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { GameService } from "./game.service";
import { Cell } from "ng-game-of-life";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

@Component({
  selector: "app-root",
  template: `
    <button (click)="togglePlay()">
      {{ isPaused ? "Play" : "Pause" }}
    </button>
    <canvas #myCanvas (click)="toggleCells($event)"></canvas>
  `
})
export class AppComponent implements AfterViewInit {
  public title: string = "galaxy gen app";

  @ViewChild("myCanvas") myCanvas: ElementRef;
  public ctx: CanvasRenderingContext2D;

  private animationId = null;

  constructor(private game: GameService) {}

  ngAfterViewInit() {
    const canvas = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext("2d");
    canvas.height = (CELL_SIZE + 1) * this.game.height + 1;
    canvas.width = (CELL_SIZE + 1) * this.game.width + 1;
    this.drawGrid();
  }

  drawGrid() {
    const { width, height } = this.game;

    this.ctx.beginPath();
    this.ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      this.ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      this.ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      this.ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
      this.ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    this.ctx.stroke();
  }

  drawCells() {
    const cells = this.game.getCells();
    const { width, height } = this.game;

    this.ctx.beginPath();

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = this.game.getIndex(row, col);

        this.ctx.fillStyle =
          cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

        this.ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    this.ctx.stroke();
  }

  loop() {
    this.game.tick();
    this.drawGrid();
    this.drawCells();

    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }

  play() {
    this.loop();
  }

  pause() {
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  get isPaused() {
    return this.animationId === null;
  }

  togglePlay() {
    if (this.isPaused) {
      this.play();
    } else {
      this.pause();
    }
  }

  toggleCells(event) {
    const canvas = this.myCanvas.nativeElement;
    const { width, height } = this.game;
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    this.game.toggleCell(row, col);

    this.drawGrid();
    this.drawCells();
  }
}
