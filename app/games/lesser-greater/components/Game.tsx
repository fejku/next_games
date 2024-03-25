"use client";

import { useEffect, useState } from "react";

import { Utils } from "@/utils/utils";

const Game = () => {
  const [points, setPoints] = useState(0);
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);

  useEffect(() => {
    const isEqual = Math.floor(Math.random() * 3) === 0;
    const number1 = Math.floor(Math.random() * 100);
    const number2 = Math.floor(Math.random() * 100);
    if (isEqual) {
      setFirstNumber(number1);
      setSecondNumber(number1);
    } else {
      setFirstNumber(number1);
      setSecondNumber(number2);
    }
  }, [points]);

  const onLesserClick = async () => {
    if (firstNumber < secondNumber) {
      await Utils.playSuccessSound();
      setPoints((v) => ++v);
    } else {
      await Utils.playFailureSound();
    }
  };

  const onEqualClick = async () => {
    if (firstNumber === secondNumber) {
      await Utils.playSuccessSound();
      setPoints((v) => ++v);
    } else {
      await Utils.playFailureSound();
    }
  };

  const onGreaterClick = async () => {
    if (firstNumber > secondNumber) {
      await Utils.playSuccessSound();
      setPoints((v) => ++v);
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
        className={`bg-[#957253] border-lime-800 border-8 rounded-lg aspect-square p-2 h-[min(calc(100vh-41px-2.25rem-24px),90vw)] grid place-items-center text-7xl font-bold text-white`}
      >
        <div className="flex flex-row justify-evenly w-full text-center bg-[#896545] py-4 sm:py-8">
          {firstNumber} <span className="text-orange-500">?</span>{" "}
          {secondNumber}
        </div>
        <div className="flex flex-row justify-evenly w-full">
          <button className="bg-[#896545] p-4 sm:p-8" onClick={onLesserClick}>
            {"<"}
          </button>
          <button className="bg-[#896545] p-4 sm:p-8" onClick={onEqualClick}>
            {"="}
          </button>
          <button className="bg-[#896545] p-4 sm:p-8" onClick={onGreaterClick}>
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Game;
