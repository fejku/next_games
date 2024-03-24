"use client";

import { useEffect, useState } from "react";

import Field from "./Field";
import { getArray, getFirstPlaceInArray } from "../lib/utils";
import { Utils } from "@/utils/utils";

// 4x4 - 4 kolory
// 4x5 - 5 kolorów
// 5x5 - 6 kolorów

const Game = () => {
  const [colors, setColors] = useState(4);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(4);
  const [balls, setBalls] = useState<number[]>([]);
  const [maxBalls, setMaxBalls] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const newBalls = getArray(colors, width * height);
    const newMaxBalls = getFirstPlaceInArray(newBalls);
    setBalls(newBalls);
    setMaxBalls(newMaxBalls);
  }, [colors, width, height, points]);

  const onSelectedAnswer = async (correctAnswer: boolean) => {
    if (correctAnswer) {
      await Utils.playSuccessSound();
      setPoints((v) => ++v);
    } else {
      await Utils.playFailureSound();
    }
  };

  return (
    <>
      <h1 className="text-3xl text-white font-bold tracking-wide drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Punkty: {points}
      </h1>
      <div
        className={`bg-[#957253] border-lime-800 border-8 rounded-lg aspect-square flex flex-wrap gap-2 justify-center items-center h-[min(90vh,90vw)]`}
      >
        {balls.map((v, i) => (
          <Field
            key={i}
            value={v}
            maxBalls={maxBalls}
            onSelectedAnswer={onSelectedAnswer}
          />
        ))}
      </div>
    </>
  );
};

export default Game;
