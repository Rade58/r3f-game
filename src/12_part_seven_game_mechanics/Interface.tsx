import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import { useGameStore } from "./stores/useGameStore";

export function Interface() {
  const phase = useGameStore(({ phase }) => phase);

  // console.log({ phase });

  // const [subscribe, getKeys] = useKeyboardControls();
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

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
      <div className="time">0.00</div>
      <div className="restart">Restart</div>
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
