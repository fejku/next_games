import { Parity, Utils } from "@/utils/utils";

enum Orientation {
  HORIZONTAL,
  VERTICAL,
}

export enum CellState {
  START,
  FINISH,
  WALL,
  EMPTY,
}

export class Maze {
  cells: number[][];

  constructor(public size: number) {
    if (size % 2 === 0) throw "Size has to be odd";
    this.cells = [];
    this.initialize();

    const orientation = Utils.randomBoolean()
      ? Orientation.HORIZONTAL
      : Orientation.VERTICAL;

    this.divide(1, 1, size - 2, size - 2, orientation);
  }

  private initialize() {
    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(CellState.EMPTY);
      }
      this.cells.push(row);
    }

    this.setInitialWalls();
    this.setStartFinish();
  }

  private setInitialWalls() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (i === 0 || i === this.size - 1 || j === 0 || j === this.size - 1) {
          this.cells[i][j] = CellState.WALL;
        }
      }
    }
  }

  private setStartFinish() {
    this.cells[1][0] = CellState.START;
    this.cells[this.size - 2][this.size - 1] = CellState.FINISH;
  }

  private divide(
    x: number,
    y: number,
    width: number,
    height: number,
    orientation: Orientation
  ) {
    // console.log(
    //   "x=",
    //   x,
    //   "y=",
    //   y,
    //   "width=",
    //   width,
    //   "height=",
    //   height,
    //   "orientation=",
    //   orientation === Orientation.HORIZONTAL ? "H" : "V"
    // );
    if (width - x < 1 || height - y < 1) return;

    let randomWall;
    let randomEntrance;
    if (orientation === Orientation.VERTICAL) {
      //   console.log("VERTICAL");
      randomWall = Utils.randomRange(x, width, Parity.EVEN);
      randomEntrance = Utils.randomRange(y, height, Parity.ODD);
      //   console.log("randomWall", randomWall, "randomEntrance", randomEntrance);
      for (let i = y; i <= height; i++) {
        this.cells[randomWall][i] = CellState.WALL;
        this.cells[randomWall][randomEntrance] = CellState.EMPTY;
      }
    } else {
      //   console.log("HORIZONTAL");
      randomWall = Utils.randomRange(y, height, Parity.EVEN);
      randomEntrance = Utils.randomRange(x, width, Parity.ODD);
      //   console.log("randomWall", randomWall, "randomEntrance", randomEntrance);
      for (let i = x; i <= width; i++) {
        this.cells[i][randomWall] = CellState.WALL;
        this.cells[randomEntrance][randomWall] = CellState.EMPTY;
      }
    }

    let newOrientation;
    if (orientation === Orientation.VERTICAL) {
      newOrientation =
        randomWall - 1 - x > height - y
          ? Orientation.VERTICAL
          : Orientation.HORIZONTAL;
      this.divide(x, y, randomWall - 1, height, newOrientation);
      newOrientation =
        width - randomWall + 1 > height - y
          ? Orientation.VERTICAL
          : Orientation.HORIZONTAL;
      this.divide(randomWall + 1, y, width, height, newOrientation);
    } else {
      newOrientation =
        width - x > randomWall - 1 - y
          ? Orientation.VERTICAL
          : Orientation.HORIZONTAL;
      this.divide(x, y, width, randomWall - 1, newOrientation);
      newOrientation =
        width - x > height - randomWall + 1
          ? Orientation.VERTICAL
          : Orientation.HORIZONTAL;
      this.divide(x, randomWall + 1, width, height, newOrientation);
    }
  }

  public getMazeToDraw() {}
}
