import React from "react";

type Props = {
  moves: number;
};

const Moves = ({ moves }: Props) => {
  return (
    <div className="col-span-4 text-center text-lg font-bold md:text-2xl">
      Wynik: {moves}
    </div>
  );
};

export default Moves;
