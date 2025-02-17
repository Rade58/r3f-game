import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useGameStore } from "./stores/useGameStore";
import { addEffect } from "@react-three/fiber";

export function Interface() {
  const phase = useGameStore(({ phase }) => phase);
  const startTime = useGameStore(({ startTime }) => startTime);
  const endTime = useGameStore(({ endTime }) => endTime);
  console.log({ phase });
  const restart = useGameStore(({ restart }) => restart);

  // const [subscribe, getKeys] = useKeyboardControls();
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const timeDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // we can't use useFrame here since this
    // component isn't nested in <Canvas>
    // so we use `addEffect`
    const unsubscribeEffect = addEffect((val) => {
      // console.log({ val: val / 1000 });

      //
      const state = useGameStore.getState();

      let elapsedTime: number | string = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime = elapsedTime / 1000;
      elapsedTime = elapsedTime.toFixed(2);

      console.log({ elapsedTime });

      /* if (timeDivRef.current) {
        timeDivRef.current.innerText = elapsedTime;
      } */
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);
  // console.log({ forward });

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
