"use client";
import { useEffect, useRef, useState } from "react";

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
  const [incorrectMoveSound, setIncorrectMoveSound] =
    useState<HTMLAudioElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIncorrectMoveSound(new Audio("/games/maze/sound/incorrect-move.mp3"));
  }, []);

  const getCtx = () => {
    return canvasRef.current!.getContext("2d")!;
  };

  const generateMaze = (columns: number, rows: number, cellSize: number) => {
    setCellSize(cellSize);
    setHideMaze(true);

    const mazeGenerator = new Maze(columns, rows);
    const newMaze = mazeGenerator.generateMaze();

    const canvas = canvasRef.current!;
    canvas.width = newMaze.columns * cellSize;
    canvas.height = newMaze.rows * cellSize;

    MazeDrawUtils.drawMaze(getCtx(), newMaze, cellSize);

    setMaze(mazeGenerator);
    setHideMaze(false);
  };

  const makeMove = (direction: Direction) => {
    if (maze === null) return;

    let previousMove = null;
    if (maze.getMaze().visited.length > 1) {
      previousMove = maze.getMaze().visited[maze.getMaze().visited.length - 1];
    }
    const moveResult = maze.makeMove(direction);
    switch (moveResult) {
      case MoveResultState.CORRECT_MOVE:
        MazeDrawUtils.drawActualPosition(
          getCtx(),
          maze.getMaze(),
          previousMove,
          cellSize
        );
        MazeDrawUtils.drawPath(getCtx(), maze.getMaze(), cellSize);
        break;
      case MoveResultState.MOVE_INCORRECT:
        incorrectMoveSound!.play();
        // MazeUtils.playIncorrectMoveSound();
        // Sound wrong move, flash??
        break;
      case MoveResultState.FINISHED:
        MazeDrawUtils.drawActualPosition(
          getCtx(),
          maze.getMaze(),
          previousMove,
          cellSize
        );
        MazeDrawUtils.drawPath(getCtx(), maze.getMaze(), cellSize);
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
