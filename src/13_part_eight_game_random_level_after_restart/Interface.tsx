import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useGameStore } from "./stores/useGameStore";
// Adds a global render callback which is called each frame
import { addEffect } from "@react-three/fiber";

export function Interface() {
  const phase = useGameStore(({ phase }) => phase);
  // const startTime = useGameStore(({ startTime }) => startTime);
  // const endTime = useGameStore(({ endTime }) => endTime);
  // console.log({ phase });
  const restart = useGameStore(({ restart }) => restart);

  // const [subscribe, getKeys] = useKeyboardControls();
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const timeDivRef = useRef<HTMLDivElement>(null);

  // we can't use useFrame here since this
  // component isn't nested in <Canvas>
  // so we use `addEffect`
  // which I guess give us access to animation frame
  // 	Adds a global render callback which is called each frame

  useEffect(() => {
    // We don't want to trigger it before refrence is ready
    // because in rare scenario that can happen
    // so we will encapsulate everything in if statement that
    // checks if if there is refrence of time div element

    const unsubEff = addEffect((/* elapsedMiliseconds */) => {
      // console.log("tick");
      // console.log({ elapsedSeconds: elapsedMiliseconds / 1000 });

      if (timeDivRef.current) {
        const state = useGameStore.getState();

        // console.log({ state });

        let elapsedTime: number | string = 0;

        if (state.phase === "playing") {
          elapsedTime = Date.now() - state.startTime;
        } else if (state.phase === "ended") {
          elapsedTime = state.endTime - state.startTime;
        }

        elapsedTime /= 1000;

        elapsedTime = elapsedTime.toFixed(2);

        timeDivRef.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubEff();
    };
  }, []);

  /* useEffect(() => {
    const unsub = subscribe(
      (state) => state,
      (state) => {
        console.log({ state });
      }
    );

    return () => {
      unsub();
    };
  }, []); */

  return (
    <div className="interface">
      <div className="time" ref={timeDivRef}>
        0.00
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      {/* ------------------------------- */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>{/* W */}</div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}>{/* A */}</div>
          <div className={`key ${backward ? "active" : ""}`}>{/* S */}</div>
          <div className={`key ${rightward ? "active" : ""}`}>{/* D */}</div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
