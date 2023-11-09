"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Maze } from "../services/maze";
import { Utils } from "@/utils/utils";
import { MazeDrawUtils } from "../utils/mazeDrawUtils";

const CELL_SIZE = 10;
const DEFAULT_COLUMNS = 15;
const DEFAULT_ROWS = 15;

// Dziury parzyste, ściany nieparzyste
export default function Canvas() {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [size, setSize] = useState(CELL_SIZE);
  const [hideMaze, setHideMaze] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onColumnsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumns(Utils.parseIntDefault(e.target.value, DEFAULT_COLUMNS));
  };

  const onRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRows(Utils.parseIntDefault(e.target.value, DEFAULT_COLUMNS));
  };

  const onSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(Utils.parseIntDefault(e.target.value, CELL_SIZE));
  };

  const onGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    const maze = new Maze(columns, rows);
    maze.generateMaze();

    canvasRef.current.width = maze.columns * size;
    canvasRef.current.height = maze.rows * size;

    MazeDrawUtils.drawMaze(ctx, maze, size);

    setHideMaze(false);
  };

  return (
    <div className="h-full flex flex-col">
      <form
        className="p-2 grid grid-cols-3 gap-5 sm:flex sm:justify-center sm:items-center"
        onSubmit={onGenerate}
      >
        <div className="flex justify-center items-center">
          <div className="w-min sm:w-auto">
            <label htmlFor="columns" className="mr-2">
              Columns
            </label>
            <input
              type="number"
              id="columns"
              name="columns"
              className="w-[7ch] py-1 px-2 border"
              value={columns}
              onChange={onColumnsChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-min sm:w-auto">
            <label htmlFor="rows" className="mr-2">
              Rows
            </label>
            <input
              type="number"
              id="rows"
              name="rows"
              className="w-[7ch] py-1 px-2 border"
              value={rows}
              onChange={onRowsChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-min sm:w-auto">
            <label htmlFor="size" className="mr-2 whitespace-nowrap">
              Cell size
            </label>
            <input
              type="number"
              id="size"
              name="size"
              className="w-[7ch] py-1 px-2 border"
              value={size}
              onChange={onSizeChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center col-span-3">
          <button className="w-full h-full py-1 px-2 border shadow">
            Generate
          </button>
        </div>
      </form>
      <div className="flex-1 flex justify-center items-center">
        <canvas ref={canvasRef} className={hideMaze ? "hidden" : ""} />
      </div>
    </div>
  );
}
