"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Answer from "./Answer";
import { Utils } from "@/utils/utils";

// Punkty 0-5 blocki 3-6
// Punkty 6-10 blocki 3-7
// Punkty 11-15 blocki 3-8
// ... 3-32
const Game = () => {
  const [points, setPoints] = useState(0);
  const [blocksAmount, setBlocksAmount] = useState(0);
  const [randomBlockId, setRandomBlockId] = useState(0);
  const [answers, setAnswers] = useState([3, 4, 5, 6]);

  useEffect(() => {
    const newBlocksAmount =
      Math.floor(Math.random() * 4) + Math.floor(points / 5) + 3;
    const newRandomBlockId = Math.floor(Math.random() * 20) + 1;

    const randomValue = Math.floor(Math.random() * 3);
    const newAnswers = [];
    for (let i = 0; i < 4; i++) {
      newAnswers[i] = newBlocksAmount - randomValue + i;
    }

    setAnswers(newAnswers);
    setBlocksAmount(newBlocksAmount);
    setRandomBlockId(newRandomBlockId);
  }, [points]);

  const checkAnswer = async (value: number) => {
    if (blocksAmount === value) {
      await Utils.playSuccessSound();
      setPoints((v) => ++v);
    } else {
      await Utils.playFailureSound();
    }
  };

  if (blocksAmount === 0) return null;

  return (
    <>
      <h1 className="text-3xl text-white font-bold tracking-wide drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] m-2">
        Punkty: {points}
      </h1>
      <div
        className={`bg-[#957253] border-lime-800 border-8 rounded-lg aspect-square p-2 h-[min(calc(100vh-41px-2.25rem-24px),90vw)] grid grid-rows-[minmax(0,_1fr)_100px] place-items-center text-7xl font-bold text-white`}
      >
        <Image
          src={`/games/blocks/${blocksAmount}-${randomBlockId}.png`}
          alt="Block"
          height={480}
          width={480}
          className="w-full h-full"
          priority
          quality={100}
        />
        <div className="flex justify-evenly w-full gap-2">
          {answers.map((answer) => (
            <Answer key={answer} answer={answer} checkAnswer={checkAnswer} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
