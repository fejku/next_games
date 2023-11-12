import Image from "next/image";

import { Direction } from "../types/types";

type Props = {
  direction: Direction;
  alt: string;
  classes?: string;
  makeMove: (direction: Direction) => void;
};

const ArrowButton = ({ direction, alt, classes, makeMove }: Props) => {
  const onArrowClick = () => {
    makeMove(direction);
  };

  const getClassByDirection = (direction: Direction) => {
    switch (direction) {
      case Direction.LEFT:
        return "-rotate-90";
      case Direction.DOWN:
        return "rotate-180";
      case Direction.RIGHT:
        return "rotate-90";
      default:
        return "";
    }
  };

  return (
    <button
      className={`w-12 h-12 border shadow shadow-zinc-400 hover:shadow-zinc-700 ${classes}`}
      onClick={onArrowClick}
    >
      <Image
        src="/arrow.svg"
        alt={alt}
        width={48}
        height={48}
        className={getClassByDirection(direction)}
      />
    </button>
  );
};

export default ArrowButton;
