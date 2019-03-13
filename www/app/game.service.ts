import { Injectable } from "@angular/core";
import { Universe, Cell } from "ng-game-of-life";
import { memory } from "ng-game-of-life/ng_game_of_life_bg";

@Injectable({
  providedIn: "root"
})
export class GameService {
  private universe = Universe.new();

  constructor() {}

  get width() {
    return this.universe.width();
  }

  get height() {
    return this.universe.height();
  }

  getCells() {
    const cellsPtr = this.universe.cells();
    const cells = new Uint8Array(
      memory.buffer,
      cellsPtr,
      this.width * this.height
    );
    return cells;
  }

  getIndex(row: number, column: number) {
    return row * this.width + column;
  }

  tick() {
    this.universe.tick();
  }

  toggleCell(row: number, col: number) {
    this.universe.toggle_cell(row, col);
  }
}
