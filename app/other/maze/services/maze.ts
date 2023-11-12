import { Parity, Utils } from "@/utils/utils";
import {
  CellState,
  Direction,
  MazeResult,
  MoveResultState,
  Point,
} from "../types/types";

enum Orientation {
  HORIZONTAL,
  VERTICAL,
}

// Dziury parzyste, ściany nieparzyste
export class Maze {
  private cells: number[][];
  private columns: number;
  private rows: number;
  private visited: Point[];

  constructor(columns: number, rows: number) {
    this.cells = [];
    this.columns = this.getConvertedCellAmount(columns);
    this.rows = this.getConvertedCellAmount(rows);
    this.visited = [{ column: 1, row: 1 }];
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
    this.cells[1][1] = CellState.START;
    this.cells[this.columns - 2][this.rows - 2] = CellState.FINISH;
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

  public generateMaze(): MazeResult {
    this.initialize();

    const orientation = Utils.randomBoolean()
      ? Orientation.HORIZONTAL
      : Orientation.VERTICAL;

    this.divide(1, 1, this.columns - 2, this.rows - 2, orientation);

    return {
      columns: this.columns,
      rows: this.rows,
      cells: this.cells,
      visited: this.visited,
    };
  }

  public getMaze() {
    return {
      columns: this.columns,
      rows: this.rows,
      cells: this.cells,
      visited: this.visited,
    };
  }

  private getNewPosition(position: Point, direction: Direction) {
    switch (direction) {
      case Direction.UP:
        return { ...position, row: position.row - 1 };
      case Direction.DOWN:
        return { ...position, row: position.row + 1 };
      case Direction.LEFT:
        return { ...position, column: position.column - 1 };
      case Direction.RIGHT:
        return { ...position, column: position.column + 1 };
      default:
        return position;
    }
  }

  private isImpossibleMove(position: Point) {
    if (position.column < 0 || position.column > this.columns) return true;
    if (position.row < 0 || position.row > this.rows) return true;
    if (this.cells[position.column][position.row] === CellState.WALL)
      return true;

    return false;
  }

  private isMoveFinish(position: Point) {
    return this.cells[position.column][position.row] === CellState.FINISH;
  }

  private getActualPosition() {
    return this.visited[this.visited.length - 1];
  }

  private previousPosition(newPosition: Point) {
    for (let point of this.visited) {
      if (point.column === newPosition.column && point.row === newPosition.row)
        return true;
    }
    return false;
  }

  public makeMove(direction: Direction) {
    const newPosition = this.getNewPosition(
      this.getActualPosition(),
      direction
    );

    if (this.isImpossibleMove(newPosition)) {
      return MoveResultState.MOVE_INCORRECT;
    }

    if (this.previousPosition(newPosition)) {
      this.visited.pop();
    } else {
      this.visited.push(newPosition);
    }

    if (this.isMoveFinish(newPosition)) {
      return MoveResultState.FINISHED;
    }

    return MoveResultState.CORRECT_MOVE;
  }
}
