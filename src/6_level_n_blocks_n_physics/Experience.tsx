// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// import { type Mesh } from "three";

import { OrbitControls /* , Stage */ } from "@react-three/drei";

// import { Perf } from "r3f-perf";
import { Lights } from "./Lights";
import { Level } from "./Level";
import { Physics } from "@react-three/rapier";

// import { useControls } from "leva";

export function Experience() {
  // const someControls = useControls("_", { test: 1 });

  // const cubeRef = useRef<Mesh>(null);

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />
      <Physics debug>
        {/* ---------------------------------- */}
        <Lights />
        {/* ---------------------------------- */}
        <Level />
        {/* ---------------------------------- */}
      </Physics>
    </>
  );
}
