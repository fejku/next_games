import { create } from "zustand";
import { shuffleCards } from "../lib/utils";

interface MemoryStore {
  cards: string[];
  openCards: number[];
  clearedCards: string[];
  moves: number;
  newGame: () => void;
  setOpenCards: (cardIndex: number) => void;
  clearOpenCards: () => void;
  setClearedCards: (clearedCard: string) => void;
  incrementMoves: () => void;
  clearMoves: () => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  cards: [],
  openCards: [],
  clearedCards: [],
  moves: 0,
  newGame: () =>
    set({
      cards: shuffleCards(),
      openCards: [],
      clearedCards: [],
      moves: 0,
    }),
  setOpenCards: (cardIndex: number) =>
    set((state) => {
      if (state.openCards.includes(cardIndex)) {
        return { openCards: [...state.openCards] };
      }
      return { openCards: [...state.openCards, cardIndex] };
    }),
  clearOpenCards: () => set({ openCards: [] }),
  setClearedCards: (clearedCard: string) =>
    set((state) => ({ clearedCards: [...state.clearedCards, clearedCard] })),
  incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),
  clearMoves: () => set({ moves: 0 }),
}));
