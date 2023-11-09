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
  columns: number;
  rows: number;

  constructor(columns: number, rows: number) {
    this.cells = [];
    this.columns = this.getConvertedCellAmount(columns);
    this.rows = this.getConvertedCellAmount(rows);
  }

  private getConvertedCellAmount(amount: number) {
    const outerWalls = 2;
    const innerWalls = amount - 1;
    return amount + innerWalls + outerWalls;
  }

  private initialize() {
    for (let i = 0; i < this.columns; i++) {
      const column = [];
      for (let j = 0; j < this.rows; j++) {
        column.push(CellState.EMPTY);
      }
      this.cells.push(column);
    }

    this.setOuterWalls();
    this.setStartFinish();
  }

  private setOuterWalls() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (
          i === 0 ||
          i === this.columns - 1 ||
          j === 0 ||
          j === this.rows - 1
        ) {
          this.cells[i][j] = CellState.WALL;
        }
      }
    }
  }

  private setStartFinish() {
    this.cells[1][0] = CellState.START;
    this.cells[this.columns - 2][this.rows - 1] = CellState.FINISH;
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
      // console.log("VERTICAL");
      randomWall = Utils.randomRange(x, width, Parity.EVEN);
      randomEntrance = Utils.randomRange(y, height, Parity.ODD);
      // console.log("randomWall", randomWall, "randomEntrance", randomEntrance);
      for (let i = y; i <= height; i++) {
        this.cells[randomWall][i] = CellState.WALL;
        this.cells[randomWall][randomEntrance] = CellState.EMPTY;
      }
    } else {
      // console.log("HORIZONTAL");
      randomWall = Utils.randomRange(y, height, Parity.EVEN);
      randomEntrance = Utils.randomRange(x, width, Parity.ODD);
      // console.log("randomWall", randomWall, "randomEntrance", randomEntrance);
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

  public generateMaze() {
    this.initialize();

    const orientation = Utils.randomBoolean()
      ? Orientation.HORIZONTAL
      : Orientation.VERTICAL;

    this.divide(1, 1, this.columns - 2, this.rows - 2, orientation);
  }
}
