import { useEffect } from "react";

import { Direction } from "../types/types";
import ArrowButton from "./ArrowButton";

type Props = {
  makeMove: (direction: Direction) => void;
  hideMaze: boolean;
};

const MazeControlls = ({ makeMove, hideMaze }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          makeMove(Direction.UP);
          break;
        case "ArrowLeft":
          makeMove(Direction.LEFT);
          break;
        case "ArrowDown":
          makeMove(Direction.DOWN);
          break;
        case "ArrowRight":
          makeMove(Direction.RIGHT);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [makeMove]);

  return (
    <div
      className={`grid grid-cols-[repeat(3,_3rem)] py-4 gap-4 justify-center ${
        hideMaze && "hidden"
      }`}
    >
      <ArrowButton
        direction={Direction.UP}
        alt="Up arrow"
        classes="col-start-2"
        makeMove={makeMove}
      />
      <ArrowButton
        direction={Direction.LEFT}
        alt="Left arrow"
        classes="col-start-1"
        makeMove={makeMove}
      />
      <ArrowButton
        direction={Direction.DOWN}
        alt="Down arrow"
        makeMove={makeMove}
      />
      <ArrowButton
        direction={Direction.RIGHT}
        alt="Right arrow"
        makeMove={makeMove}
      />
    </div>
  );
};

export default MazeControlls;
