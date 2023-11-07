"use client";
import { useEffect, useRef } from "react";
import { CellState, Maze } from "../services/maze";

// Dziury parzyste, ściany nieparzyste

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;

      const maze = new Maze(31);

      for (let w = 0; w < maze.cells.length; w++) {
        for (let h = 0; h < maze.cells.length; h++) {
          const element = maze.cells[w][h];
          const SIZE = 10;
          if (element === CellState.EMPTY) {
            ctx.fillStyle = "#fff";
          } else if (element === CellState.START) {
            ctx.fillStyle = "green";
          } else if (element === CellState.FINISH) {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "#000";
          }
          ctx.fillRect(w * SIZE, h * SIZE, SIZE, SIZE);
          ctx.strokeStyle = "gray";
          ctx.moveTo(w * SIZE, h * SIZE);
          ctx.lineTo(w * SIZE + SIZE, h * SIZE);
          ctx.moveTo(w * SIZE, h * SIZE);
          ctx.lineTo(w * SIZE, h * SIZE + SIZE);
          ctx.moveTo(w * SIZE, h * SIZE + SIZE);
          ctx.lineTo(w * SIZE + SIZE, h * SIZE + SIZE);
          ctx.moveTo(w * SIZE + SIZE, h * SIZE);
          ctx.lineTo(w * SIZE + SIZE, h * SIZE + SIZE);
          ctx.stroke();
        }
      }
      ctx.fill();
    }
  }, []);

  return <canvas ref={canvasRef} width={31 * 10} height={31 * 10} />;
}
