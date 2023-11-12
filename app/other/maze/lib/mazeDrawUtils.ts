import { CellState, MazeResult, Point } from "../types/types";

export class MazeDrawUtils {
  private static COLOR_EMPTY = "#fff";
  private static COLOR_WALL = "#000";
  private static COLOR_START = "green";
  private static COLOR_FINISH = "red";
  private static COLOR_ACTUAL_POSITION = "#44f";
  private static COLOR_PATH = "#99f";
  private static COLOR_GRID = "gray";

  static drawMaze = (
    ctx: CanvasRenderingContext2D,
    maze: MazeResult,
    cellSize: number
  ) => {
    const width = maze.columns * cellSize;
    const height = maze.rows * cellSize;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = MazeDrawUtils.COLOR_EMPTY;
    ctx.fillRect(0, 0, width, height);

    MazeDrawUtils.drawGrid(ctx, maze.columns, maze.rows, cellSize);
    MazeDrawUtils.fillWalls(ctx, maze, cellSize);
    MazeDrawUtils.drawStartFinish(ctx, maze, cellSize);
    MazeDrawUtils.drawActualPosition(ctx, maze, null, cellSize);
  };

  private static drawGrid = (
    ctx: CanvasRenderingContext2D,
    columns: number,
    rows: number,
    size: number
  ) => {
    ctx.strokeStyle = MazeDrawUtils.COLOR_GRID;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= columns; i++) {
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, rows * size);
    }
    for (let i = 0; i <= rows; i++) {
      ctx.moveTo(0, i * size);
      ctx.lineTo(columns * size, i * size);
    }
    ctx.stroke();
  };

  private static fillWalls = (
    ctx: CanvasRenderingContext2D,
    maze: MazeResult,
    size: number
  ) => {
    ctx.fillStyle = MazeDrawUtils.COLOR_WALL;

    for (let c = 0; c < maze.columns; c++) {
      for (let r = 0; r < maze.rows; r++) {
        const cell = maze.cells[c][r];

        if (cell !== CellState.WALL) continue;
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
  };

  private static drawStartFinish = (
    ctx: CanvasRenderingContext2D,
    maze: MazeResult,
    size: number
  ) => {
    ctx.fillStyle = MazeDrawUtils.COLOR_START;
    ctx.fillRect(size, size, size, size);
    ctx.fillStyle = MazeDrawUtils.COLOR_FINISH;
    ctx.fillRect(size * (maze.columns - 2), size * (maze.rows - 2), size, size);
  };

  public static drawPath = (
    ctx: CanvasRenderingContext2D,
    maze: MazeResult,
    size: number
  ) => {
    for (let i = 1; i < maze.visited.length - 1; i++) {
      const point = maze.visited[i];
      ctx.fillStyle = MazeDrawUtils.COLOR_PATH;
      ctx.fillRect(
        point.column * size + 1,
        point.row * size + 1,
        size - 2,
        size - 2
      );
    }
  };

  public static drawActualPosition = (
    ctx: CanvasRenderingContext2D,
    maze: MazeResult,
    previousMove: Point | null,
    size: number
  ) => {
    if (previousMove) {
      ctx.fillStyle = MazeDrawUtils.COLOR_EMPTY;
      ctx.fillRect(
        previousMove.column * size + 1,
        previousMove.row * size + 1,
        size - 2,
        size - 2
      );
    } else {
      MazeDrawUtils.drawStartFinish(ctx, maze, size);
    }

    ctx.fillStyle = MazeDrawUtils.COLOR_ACTUAL_POSITION;
    const lastMove = maze.visited[maze.visited.length - 1];
    ctx.fillRect(
      lastMove.column * size + 2,
      lastMove.row * size + 2,
      size - 4,
      size - 4
    );
  };
}
