import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { type Mesh } from "three";

import { OrbitControls /* , Stage */ } from "@react-three/drei";

import { Perf } from "r3f-perf";

import { useControls } from "leva";

export function Experience() {
  // const someControls = useControls("_", { test: 1 });

  // const cubeRef = useRef<Mesh>(null);

  /* useFrame((state, delta) => {
    // const elapsed: number = state.clock.getElapsedTime();

    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  }); */

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* ---------------------------------- */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      {/* ---------------------------------- */}

      {/* CUBE */}

      <mesh position={[2, 2, 0]} scale={1.5} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      {/* SPHERE */}
      <mesh position={[-2, 2, 0]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>
      {/* FLOOR */}
      <mesh
        receiveShadow
        // rotation={[-Math.PI * 0.5, 0, 0]}
        // scale={10}
        // position-y={-1}
        position-y={-1.25}
        // visible={false}
      >
        {/* instead of plane */}
        {/* <planeGeometry /> */}
        {/* we want box for the floor */}
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial args={[{ color: "greenyellow" }]} />
      </mesh>

      {/* ---------------------------------------------------- */}
    </>
  );
}
