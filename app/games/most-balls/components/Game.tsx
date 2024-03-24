"use client";

import { useEffect, useState } from "react";

import Field from "./Field";
import { getArray, getFirstPlaceInArray } from "../lib/utils";
import { Utils } from "@/utils/utils";

// 4x4 - 4 kolory
// 4x5 - 5 kolorów
// 5x5 - 6 kolorów
const NEXT_LEVEL = 5;

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

      const nextPoint = points + 1;
      if (nextPoint < 20) {
        if (
          nextPoint % NEXT_LEVEL === 0 &&
          nextPoint % (NEXT_LEVEL * 2) !== 0
        ) {
          setHeight((v) => ++v);
        }
        if (nextPoint % (NEXT_LEVEL * 2) === 0) {
          setWidth((v) => ++v);
        }
        if (nextPoint % NEXT_LEVEL === 0) {
          setColors((v) => ++v);
        }
      }
      setPoints(nextPoint);
    } else {
      await Utils.playFailureSound();
    }
  };

  return (
    <>
      <h1 className="text-3xl text-white font-bold tracking-wide drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] m-2">
        Punkty: {points}
      </h1>
      <div
        className={`bg-[#957253] border-lime-800 border-8 rounded-lg aspect-square grid grid-cols-${width} grid-rows-${height} gap-2 p-2 place-content-center  h-[min(calc(100vh-41px-2.25rem-24px),90vw)]`}
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
