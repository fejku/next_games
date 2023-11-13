"use client";
import { useState } from "react";

import Game from "./Game";
import ScoreScreen from "./ScoreScreen";

enum GameState {
  GAME,
  SCORE_SCREEN,
}

const GameStateWrapper = () => {
  const [gameState, setGameState] = useState(GameState.GAME);

  const setStateScoreScreen = () => {
    setGameState(GameState.SCORE_SCREEN);
  };

  const setStateGame = () => {
    setGameState(GameState.GAME);
  };

  switch (gameState) {
    case GameState.GAME:
      return <Game setStateScoreScreen={setStateScoreScreen} />;
    case GameState.SCORE_SCREEN:
      return <ScoreScreen setStateGame={setStateGame} />;
    default:
      return null;
  }
};

export default GameStateWrapper;
