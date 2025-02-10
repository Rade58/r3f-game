import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { type Mesh } from "three";

import { OrbitControls, Stage } from "@react-three/drei";

import { Perf } from "r3f-perf";

import { useControls } from "leva";

export function Experience() {
  // const someControls = useControls("_", {});

  const cubeRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    // const elapsed: number = state.clock.getElapsedTime();

    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  });

  console.log({ sphereRef });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* ---------------------------------- */}

      {/* CUBE */}
      <Stage
        shadows={{ type: "contact", opacity: 0.8, blur: 3, color: "purple" }}
        environment="dawn"
        preset={"portrait"}
        intensity={2}
      >
        <mesh position={[2, 0, 0]} ref={cubeRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        {/* SPHERE */}
        <mesh position={[-2, 0, 0]} ref={sphereRef} scale={0.8}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial args={[{ color: "orange" }]} />
        </mesh>
        {/* FLOOR */}
        <mesh
          receiveShadow
          rotation={[-Math.PI * 0.5, 0, 0]}
          scale={10}
          position-y={-1}
          visible={false}
        >
          <planeGeometry />
          <meshStandardMaterial args={[{ color: "greenyellow" }]} />
        </mesh>
      </Stage>
      {/* ---------------------------------------------------- */}
    </>
  );
}
