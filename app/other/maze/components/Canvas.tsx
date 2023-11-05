"use client";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;

      //   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      //   ctx.strokeStyle = "#fff";
      //   ctx.moveTo(0, 0);
      //   ctx.lineTo(300, 150);
      //   ctx.stroke();

      const maze: number[][] = [];
      for (let i = 0; i < 10; i++) {
        const a = [];
        for (let j = 0; j < 10; j++) {
          a.push(Math.floor(Math.random() * 2));
        }
        maze.push(a);
      }
      console.log("maze", maze);

      for (let w = 0; w < maze.length; w++) {
        for (let h = 0; h < maze[w].length; h++) {
          const element = maze[w][h];
          const SIZE = 50;
          if (element === 0) {
            ctx.fillStyle = "#fff";
          } else {
            ctx.fillStyle = "#000";
          }
          ctx.fillRect(w * SIZE, h * SIZE, SIZE, SIZE);

          //   ctx.moveTo(w * SIZE, h * SIZE);
          //   ctx.strokeStyle = "red";
          //   ctx.lineTo(w * SIZE + SIZE, h * SIZE);
          //   ctx.stroke();
          //   ctx.strokeStyle = "green";
          //   ctx.lineTo(w * SIZE + SIZE, h * SIZE + SIZE);
          //   //   ctx.lineTo(w * SIZE, h * SIZE + SIZE);
          //   ctx.stroke();
          //   ctx.moveTo(100, 100);
          //   ctx.beginPath();
          //   ctx.strokeStyle = "red";
          //   ctx.lineTo(150, 100);
          //   ctx.stroke();
          //   //   ctx.end
          //   ctx.strokeStyle = "green";
          //   ctx.lineTo(150, 150);
          // //   ctx.lineTo(w * SIZE, h * SIZE + SIZE);
          // ctx.stroke();
        }
      }
      ctx.fill();
    }
  }, []);

  return <canvas ref={canvasRef} width={500} height={500} />;
}
