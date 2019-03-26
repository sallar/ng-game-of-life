import { Universe, Cell } from "ng-game-of-life";
import { memory } from "ng-game-of-life/ng_game_of_life_bg";

export function useGame() {
  const universe = Universe.new();

  return {
    tick: () => universe.tick(),
    width: universe.width(),
    height: universe.height(),
    getCells() {
      const cellsPtr = universe.cells();
      const cells = new Uint8Array(
        memory.buffer,
        cellsPtr,
        universe.width() * universe.height()
      );
      return cells;
    }
  };
}
