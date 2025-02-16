// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// import { type Mesh } from "three";

import { Perf } from "r3f-perf";
import { Lights } from "./Lights";
import { Level } from "./Level";
import { Physics } from "@react-three/rapier";

// import { useControls } from "leva";

import { BlockSpinner, BlockLeftRight, BlockLimbo } from "./Level";
import { Player } from "./Player";
import { MyHelpers } from "./MyHelpers";
import { useGameStore } from "./stores/useGameStore";

export function Experience() {
  // const someControls = useControls("_", { test: 1 });

  // const cubeRef = useRef<Mesh>(null);

  // blocksCount is here just for testing purposes
  // blocksCount we don't inted to change
  // and this component should rerender only when
  // this blockCount branch of state changes
  const blocksCount = useGameStore(({ blocksCount }) => blocksCount);

  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <MyHelpers /> */}

      <Physics
      //
      // debug
      //
      //
      >
        {/* ---------------------------------- */}
        <Lights />
        {/* ---------------------------------- */}
        {/* <Level count={5} types={[BlockSpinner, BlockLeftRight, BlockLimbo]} /> */}
        <Level
          count={blocksCount}
          types={[BlockSpinner, BlockLeftRight, BlockLimbo]}
        />
        {/* ---------------------------------- */}
        <Player />
      </Physics>
    </>
  );
}
