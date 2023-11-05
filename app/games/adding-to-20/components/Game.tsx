"use client";
import { useEffect, useRef, useState } from "react";

import CorrectAnswer from "./CorrectAnswer";
import ResultNumber from "./ResultNumber";
import Tile from "./Tile";
import { playFailureSound, playSuccessSound, random } from "../lib/utils";

export default function Game() {
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
    </>
  );
}

// Hover na kostkach pokazuje cyfrę
// Naciśnięcie na kostkę - mówi wartość na kostce
// Punkty - 10 dobrych odpowiedzi wygrana?
