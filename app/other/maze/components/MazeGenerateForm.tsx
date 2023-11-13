"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Utils } from "@/utils/utils";

const CELL_SIZE = 10;
const DEFAULT_COLUMNS = 15;
const DEFAULT_ROWS = 15;

interface Props {
  generateMaze: (columns: number, rows: number, size: number) => void;
}

export default function MazeGenerateForm({ generateMaze }: Props) {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [size, setSize] = useState(CELL_SIZE);

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
    generateMaze(columns, rows, size);
  };

  return (
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
        <button className="w-full h-full py-1 px-2 border shadow select-none hover:shadow-zinc-400">
          Generate
        </button>
      </div>
    </form>
  );
}
