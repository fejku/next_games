export interface MazeResult {
  columns: number;
  rows: number;
  cells: number[][];
  visited: Point[];
}

export interface Point {
  column: number;
  row: number;
}

export enum Direction {
  UP,
  LEFT,
  DOWN,
  RIGHT,
}

export enum CellState {
  START,
  FINISH,
  WALL,
  EMPTY,
  WALKING_PATH,
  ACTUAL_POSITION,
}

export enum MoveResultState {
  CORRECT_MOVE,
  MOVE_INCORRECT,
  FINISHED,
}
