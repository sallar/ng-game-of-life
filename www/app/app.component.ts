import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { GameService } from "./game.service";
import { Cell } from "ng-game-of-life";
import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const CELL_SIZE = 10; // px
const LINE_WDITH = 2;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

@Component({
  selector: "app-root",
  template: `
    <div class="main">
      <canvas #myCanvas (click)="toggleCells($event)"></canvas>
    </div>
    <div class="actions">
      <button (click)="togglePlay()">
        {{ isPaused ? "Play" : "Pause" }}
      </button>
    </div>
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

    const canvasHeight =
      (CELL_SIZE + LINE_WDITH) * this.game.height + LINE_WDITH;
    const canvasWidth = (CELL_SIZE + LINE_WDITH) * this.game.width + LINE_WDITH;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth / 2}px`;
    canvas.style.height = `${canvasHeight / 2}px`;

    this.drawGrid();
    this.drawCells();
  }

  drawGrid() {
    const { width, height } = this.game;

    this.ctx.beginPath();
    this.ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      this.ctx.moveTo(i * (CELL_SIZE + LINE_WDITH) + LINE_WDITH, 0);
      this.ctx.lineTo(
        i * (CELL_SIZE + LINE_WDITH) + LINE_WDITH,
        (CELL_SIZE + LINE_WDITH) * height + LINE_WDITH
      );
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      this.ctx.moveTo(0, j * (CELL_SIZE + LINE_WDITH) + LINE_WDITH);
      this.ctx.lineTo(
        (CELL_SIZE + LINE_WDITH) * width + LINE_WDITH,
        j * (CELL_SIZE + LINE_WDITH) + LINE_WDITH
      );
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
          col * (CELL_SIZE + LINE_WDITH) + LINE_WDITH,
          row * (CELL_SIZE + LINE_WDITH) + LINE_WDITH,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    this.ctx.stroke();
  }

  loop() {
    stats.begin();

    this.game.tick();
    this.drawGrid();
    this.drawCells();

    stats.end();

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

    console.log(boundingRect);

    const canvasLeft = ((event.clientX - boundingRect.left) * scaleX) / 2;
    const canvasTop = ((event.clientY - boundingRect.top) * scaleY) / 2;

    const row = Math.min(
      Math.floor((canvasTop / (CELL_SIZE + LINE_WDITH)) * 2),
      height - LINE_WDITH
    );
    const col = Math.min(
      Math.floor((canvasLeft / (CELL_SIZE + LINE_WDITH)) * 2),
      width - LINE_WDITH
    );

    this.game.toggleCell(row, col);

    this.drawGrid();
    this.drawCells();
  }
}
