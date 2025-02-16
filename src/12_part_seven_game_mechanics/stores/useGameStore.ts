import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GameState {
  // just for test purposes
  blocksCount: number;
  // ----------------------
  //
  phase: "ready" | "playing" | "ended";

  // methods
  start: () => void;
  end: () => void;
  restart: () => void;
}

export const useGameStore = create<GameState>((set) => {
  return {
    // just for test purposes
    blocksCount: 5,
    // ----------------------
    //
    phase: "ready",
    //
    // methods
    start() {
      set(({ phase }) => {
        if (phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      });
    },
    end() {
      set(({ phase }) => {
        if (phase === "playing") {
          return { phase: "ended" };
        }
        return {};
      });
    },
    restart() {
      set(({ phase }) => {
        if (phase === "ended" || phase === "playing") {
          return { phase: "ready" };
        }
        return {};
      });
    },
  };
});
