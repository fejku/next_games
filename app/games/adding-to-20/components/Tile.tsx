import Image from "next/image";
import React from "react";

type Props = { value: number };

const Tile = ({ value }: Props) => {
  return (
    <Image
      src={`/games/adding-to-20/${value}.svg`}
      alt="Tile"
      width="0"
      height="0"
      priority
      className="w-24 h-auto"
    />
  );
};

export default Tile;
