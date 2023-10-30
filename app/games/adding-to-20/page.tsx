"use client";
import { useEffect, useRef, useState } from "react";

import CorrectAnswer from "./components/CorrectAnswer";
import ResultNumber from "./components/ResultNumber";
import Tile from "./components/Tile";
import { playFailureSound, playSuccessSound, random } from "./lib/utils";
import Link from "next/link";

export default function Home() {
  const [newGame, setNewGame] = useState(true);
  const [firstTile, setFirstTile] = useState(0);
  const [secondTile, setSecondTile] = useState(0);
  const [correctResult, setCorrectResult] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (newGame) {
      const firstTileValue = random();
      const secondTileValue = random();

      setShowCorrectAnswer(false);
      setFirstTile(firstTileValue);
      setSecondTile(secondTileValue);
      setCorrectResult(firstTileValue + secondTileValue);
      setWrongAnswers([]);
      setNewGame(false);
    }
  }, [newGame]);

  const onResultClick = (value: number) => {
    if (value === correctResult) {
      setShowCorrectAnswer(true);
      playSuccessSound();

      timerRef.current = setTimeout(() => {
        setNewGame(true);
      }, 1000);
    } else {
      playFailureSound();
      setWrongAnswers((v) => [...v, value]);
    }
  };

  const onBackClick = () => {
    // third;
  };

  if (correctResult === 0) return null;
  return (
    <>
      <div className="h-full p-4 flex flex-col text-zinc-900">
        <div className="h-full flex justify-evenly items-center">
          <Tile value={firstTile} />
          <span className="text-8xl">+</span>
          <Tile value={secondTile} />
        </div>
        <div className="flex flex-wrap justify-evenly">
          {[...Array(20)].map((_, i) => (
            <ResultNumber
              key={i}
              value={i + 1}
              onClick={onResultClick}
              checkWrongAnswer={wrongAnswers.includes(i + 1)}
            />
          ))}
        </div>
      </div>

      {showCorrectAnswer && <CorrectAnswer />}

      <Link
        href={"/games"}
        className="absolute top-2 left-2 w-12 h-12 bg-white/70 p-2 rounded-full border-[#4D4D4D] border-2 shadow-md hover:p-1 hover:border-zinc-800 hover:shadow-zinc-800"
      >
        <div className="w-full h-full bg-[url('/games/adding-to-20/left-arrow.svg')] bg-cover"></div>
      </Link>
    </>
  );
}

// Hover na kostkach pokazuje cyfrę
// Naciśnięcie na kostkę - mówi wartość na kostce
// Punkty - 10 dobrych odpowiedzi wygrana?
