import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GameState {
  // just for test purposes
  blocksCount: number;
  // ----------------------
  //
  phase: "ready" | "playing" | "ended";
}

export const useGameStore = create<GameState>((set) => {
  return {
    // just for test purposes
    blocksCount: 5,
    // ----------------------
    //
    phase: "ready",
  };
});
