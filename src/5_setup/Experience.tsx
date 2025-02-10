// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// import { type Mesh } from "three";

import { OrbitControls /* , Stage */ } from "@react-three/drei";

// import { Perf } from "r3f-perf";
import { Lights } from "./Lights";

// import { useControls } from "leva";

export function Experience() {
  // const someControls = useControls("_", { test: 1 });

  // const cubeRef = useRef<Mesh>(null);

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      {/* ---------------------------------- */}
      <Lights />
      {/* ---------------------------------- */}

      {/* CUBE */}

      <mesh position={[2, -0.25, 0]} scale={1.5} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          // color="mediumpurple"
          color="#a78ae2"
        />
      </mesh>
      {/* SPHERE */}
      <mesh position={[-2, 0, 0]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          // args={[{ color: "orange" }]}
          args={[{ color: "#ec9357" }]}
        />
      </mesh>
      {/* FLOOR */}
      <mesh
        receiveShadow
        position-y={-1.25}
        // visible={false}
      >
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial
          // args={[{ color: "greenyellow" }]}
          args={[{ color: "#b9e972" }]}
        />
      </mesh>

      {/* ---------------------------------------------------- */}
    </>
  );
}
