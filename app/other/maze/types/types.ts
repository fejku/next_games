export interface MazeResult {
  columns: number;
  rows: number;
  cells: number[][];
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
}

export enum MoveResultState {
  MOVE_IMPOSSIBLE,
  CORRECT_MOVE,
  FINISHED,
}
