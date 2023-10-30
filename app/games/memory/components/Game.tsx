"use client";
import { useEffect, useRef } from "react";

import Card from "./Card";
import { CARDS_AMOUNT } from "../lib/utils";
import { useMemoryStore } from "../store/zustand";
import Moves from "./Moves";

const Game = () => {
  const {
    cards,
    openCards,
    clearedCards,
    moves,
    newGame,
    clearOpenCards,
    setClearedCards,
    incrementMoves,
  } = useMemoryStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    newGame();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [newGame]);

  useEffect(() => {
    if (openCards.length == 2) {
      incrementMoves();
      timerRef.current = setTimeout(() => {
        const firstCardIndex = openCards[0];
        const secondCardIndex = openCards[1];
        const firstOpenCard = cards[firstCardIndex];
        const secondOpenCard = cards[secondCardIndex];
        // Hit
        if (firstOpenCard === secondOpenCard) {
          setClearedCards(firstOpenCard);
        }
        clearOpenCards();
      }, 1500);
    } else {
    }
  }, [cards, openCards, clearOpenCards, setClearedCards, incrementMoves]);

  useEffect(() => {
    if (clearedCards.length === CARDS_AMOUNT) {
      // Gra wygrana
      timerRef.current = setTimeout(() => {
        newGame();
      }, 500);
    }
  }, [clearedCards, newGame]);

  return (
    <div className="h-full grid grid-cols-4 gap-4 p-4 content-center m-auto w-fit">
      {cards.map((card, index) => (
        <Card key={index} index={index} card={card} />
      ))}
      <Moves moves={moves} />
    </div>
  );
};

export default Game;
