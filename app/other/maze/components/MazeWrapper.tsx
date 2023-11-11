"use client";
import { useRef, useState } from "react";

import MazeCanvas from "./MazeCanvas";
import MazeControlls from "./MazeControlls";
import MazeGenerateForm from "./MazeGenerateForm";
import { Maze } from "../services/maze";
import { MazeDrawUtils } from "../lib/mazeDrawUtils";
import { Direction, MoveResultState } from "../types/types";

// Todo: zrobienie całej serii komend, gdzie się ruszyć i dopiero po zaprogramowaniu komend start i oglądanie animacji - przy dużym labiryncie dość ciężkie do wyklikania
// w sytlu zółwia tylko komenda idz do przodu i obróć 90 stopni w prawo/lewo
const MazeWrapper = () => {
  const [hideMaze, setHideMaze] = useState(true);
  const [cellSize, setCellSize] = useState(0);
  const [maze, setMaze] = useState<Maze | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateMaze = (columns: number, rows: number, cellSize: number) => {
    setCellSize(cellSize);
    setHideMaze(true);

    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    const mazeGenerator = new Maze(columns, rows);
    const newMaze = mazeGenerator.generateMaze();

    canvas.width = newMaze.columns * cellSize;
    canvas.height = newMaze.rows * cellSize;

    MazeDrawUtils.drawMaze(ctx, newMaze, cellSize);

    setMaze(mazeGenerator);
    setHideMaze(false);
  };

  const makeMove = (direction: Direction) => {
    if (maze === null) return;
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    const moveResult = maze.makeMove(direction);
    switch (moveResult) {
      case MoveResultState.CORRECT_MOVE:
        MazeDrawUtils.drawMaze(ctx, maze.getMaze(), cellSize);
        break;
      case MoveResultState.MOVE_IMPOSSIBLE:
        // Sound wrong move, flash??
        break;
      case MoveResultState.FINISHED:
        // Winning screen
        break;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <MazeGenerateForm generateMaze={generateMaze} />
      <MazeCanvas canvasRef={canvasRef} hideMaze={hideMaze} />
      <MazeControlls makeMove={makeMove} hideMaze={hideMaze} />
    </div>
  );
};

export default MazeWrapper;
