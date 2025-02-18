import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";

interface GameState {
  blocksCount: number;
  blocksSeed: number;
  // ----------------------
  //
  phase: "ready" | "playing" | "ended";
  //
  startTime: number;
  endTime: number;

  // methods
  start: () => void;
  end: () => void;
  restart: () => void;
}

export const useGameStore = create(
  subscribeWithSelector<GameState>((set) => {
    return {
      blocksCount: 10,
      blocksSeed: 0,
      // ----------------------
      //
      phase: "ready",
      //
      startTime: 0,
      endTime: 0,
      //
      // methods
      start() {
        set(({ phase }) => {
          if (phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }
          return {};
        });
      },
      end() {
        set(({ phase }) => {
          if (phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        });
      },
      restart() {
        set(({ phase }) => {
          if (phase === "ended" || phase === "playing") {
            return { phase: "ready", blocksSeed: Math.random() };
          }

          return {};
        });
      },
    };
  })
);

// not doing like this
/* export const useGameStore = create<GameState>((set) => {
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
 */
