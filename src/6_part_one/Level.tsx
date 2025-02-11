import { useFrame } from "@react-three/fiber";
import { type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { BoxGeometry, Euler, MeshStandardMaterial, Quaternion } from "three";

const boxGeo = new BoxGeometry(/* 4, 0.2, 4 */ 1, 1, 1);
//
const floorBlockMaterial_1 = new MeshStandardMaterial({
  color: "#7ad47a", // replaced "limegreen",
});
const floorBlockMaterial_2 = new MeshStandardMaterial({
  color: "#b9e972", // greenyellow was bad
});
const obstacleMaterial = new MeshStandardMaterial({
  color: "#e77247", // replaced "orangered",
});
const wallMaterial = new MeshStandardMaterial({
  color: "slategray",
});

//

export function Level() {
  return (
    <>
      <BlockStart position={[0, 0, 16]} />
      <BlockSpinner position={[0, 0, 12]} />
      <BlockLimbo position={[0, 0, 8]} />
      <BlockLeftRight position={[0, 0, 4]} />
      <BlockEnd position={[0, 0, 0]} />
      {/* <BlockLimbo position={[0, 0, -4]} /> */}
      {/* <BlockLimbo position={[0, 0, -8]} /> */}
      {/* <BlockSpinner position={[0, 0, -12]} /> */}
      {/* <BlockSpinner position={[0, 0, -16]} /> */}
      {/* <BlockSpinner position={[0, 0, -20]} /> */}
    </>
  );
}

function BlockStart(
  { position }: { position?: [number, number, number] } = {
    position: [0, 0, 0], // default
  }
) {
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeo}
        material={floorBlockMaterial_1}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}

function BlockSpinner(
  { position }: { position?: [number, number, number] } = {
    position: [0, 0, 0], // default
  }
) {
  const obstacleBodyRef = useRef<RapierRigidBody>(null);

  const [speed] = useState<number>(() => {
    return (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1);
  });

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    const angle = elapsed * speed;

    if (obstacleBodyRef.current) {
      const eulerRotation = new Euler(0, angle, 0);
      const quaternionRotation = new Quaternion();
      quaternionRotation.setFromEuler(eulerRotation);

      obstacleBodyRef.current.setNextKinematicRotation(quaternionRotation);
    }
  });

  return (
    <group position={position}>
      {/*  ----------- obstacle -------------- */}
      <RigidBody
        type="kinematicPosition"
        position-y={0.3}
        restitution={0.2}
        friction={0}
        ref={obstacleBodyRef}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeo}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          // position-y={0.3 / 2}
          // position-y={3}
        />
      </RigidBody>
      {/* ------------------------------------ */}
      {/* floor */}
      {/* <RigidBody type="fixed"> */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeo}
        material={floorBlockMaterial_2}
        scale={[4, 0.2, 4]}
      />
      {/* </RigidBody> */}
    </group>
  );
}

function BlockLimbo(
  { position }: { position?: [number, number, number] } = {
    position: [0, 0, 0], // default
  }
) {
  const limboTrapBodyRef = useRef<RapierRigidBody>(null);

  const [timeOffset] = useState<number>(() => {
    return Math.random() * Math.PI * 2;
  });

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    const angle = elapsed + timeOffset;

    if (limboTrapBodyRef.current) {
      limboTrapBodyRef.current.setNextKinematicTranslation({
        x: position?.[0] || 0,
        y: Math.sin(angle) + 1.15 + (position?.[1] || 0),
        z: position?.[2] || 0,
      });
    }
  });

  return (
    <group position={position}>
      {/*  ----------- limbo trap -------------- */}
      <RigidBody
        type="kinematicPosition"
        position-y={0.3}
        restitution={0.2}
        friction={0}
        ref={limboTrapBodyRef}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeo}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          // position-y={0.3 / 2}
          // position-y={3}
        />
      </RigidBody>
      {/* ------------------------------------ */}
      {/* floor */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeo}
        material={floorBlockMaterial_2}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}

function BlockLeftRight(
  { position }: { position?: [number, number, number] } = {
    position: [0, 0, 0], // default
  }
) {
  const pendulumBodyRef = useRef<RapierRigidBody>(null);

  const [timeOffset] = useState<number>(() => {
    return Math.random() * Math.PI * 2;
  });

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    const x = Math.sin(elapsed + timeOffset) * 1.25;

    if (pendulumBodyRef.current) {
      pendulumBodyRef.current.setNextKinematicTranslation({
        x: x + (position?.[0] || 0),
        y: 0.75 + (position?.[1] || 0),
        z: position?.[2] || 0,
      });
    }
  });

  return (
    <group position={position}>
      {/*  ----------- pendulum -------------- */}
      <RigidBody
        type="kinematicPosition"
        position-y={0.3}
        restitution={0.2}
        friction={0}
        ref={pendulumBodyRef}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeo}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          // position-y={0.3 / 2}
          // position-y={3}
        />
      </RigidBody>
      {/* ------------------------------------ */}
      {/* floor */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeo}
        material={floorBlockMaterial_2}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}

function BlockEnd(
  { position }: { position?: [number, number, number] } = {
    position: [0, 0, 0], // default
  }
) {
  return (
    <group position={position}>
      <mesh
        // position={[0, -0.1, 0]}
        position={[0, 0, 0]}
        receiveShadow
        geometry={boxGeo}
        material={floorBlockMaterial_1}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}
