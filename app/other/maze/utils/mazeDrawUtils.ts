import { CellState, Maze } from "../services/maze";

export class MazeDrawUtils {
  static drawMaze = (
    ctx: CanvasRenderingContext2D,
    maze: Maze,
    size: number
  ) => {
    const width = maze.columns * size;
    const height = maze.rows * size;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    MazeDrawUtils.drawGrid(ctx, maze.columns, maze.rows, size);
    MazeDrawUtils.fillWalls(ctx, maze, size);
  };

  private static drawGrid = (
    ctx: CanvasRenderingContext2D,
    columns: number,
    rows: number,
    size: number
  ) => {
    ctx.strokeStyle = "gray";
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
    maze: Maze,
    size: number
  ) => {
    ctx.fillStyle = "#000";
    for (let c = 0; c < maze.columns; c++) {
      for (let r = 0; r < maze.rows; r++) {
        const cell = maze.cells[c][r];

        if (cell === CellState.EMPTY) continue;

        if (cell === CellState.START) {
          ctx.fillStyle = "green";
        } else if (cell === CellState.FINISH) {
          ctx.fillStyle = "red";
        } else {
          ctx.fillStyle = "#000";
        }
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
    ctx.fill();
  };
}