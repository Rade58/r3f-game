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

export function Experience() {
  // const someControls = useControls("_", { test: 1 });

  // const cubeRef = useRef<Mesh>(null);

  return (
    <>
      <Perf position="top-left" />
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
        <Level count={5} types={[BlockSpinner, BlockLeftRight, BlockLimbo]} />
        {/* ---------------------------------- */}
        <Player />
      </Physics>
    </>
  );
}
