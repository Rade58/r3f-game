import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  type RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { ReactNode, useMemo, useRef, useState } from "react";
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
  color: "#acb6c0", // replaced"slategray",
});

//

export function Level(
  {
    // children,
    count,
    types,
    seed,
  }: {
    children?: ReactNode;
    count: number;
    types: (typeof BlockSpinner | typeof BlockLeftRight | typeof BlockLimbo)[];
    seed: number;
  } = {
    count: 5,
    types: [BlockSpinner, BlockLeftRight, BlockLimbo],
    seed: 0,
  }
) {
  const blocks = useMemo(() => {
    const blocks: typeof types = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [types, count, seed]);

  // console.log({ blocks });

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, ind) => {
        return <Block position={[0, 0, -(ind + 1) * 4]} key={`block_${ind}`} />;
      })}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      <Bounds count={count + 2} />
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

export function BlockSpinner(
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

export function BlockLimbo(
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

export function BlockLeftRight(
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
  const donut = useGLTF("/models/donuts-c-2.glb");

  donut.scene.children.forEach((childMesh) => {
    childMesh.castShadow = true;
  });

  return (
    <group position={position}>
      {/* dount */}
      <RigidBody
        type="fixed"
        // colliders="ball"
        // colliders="hull"
        restitution={0.2}
        friction={0}
        position={[-0.35, -0.33, -0.5]}
      >
        <primitive object={donut.scene} scale={6} />
      </RigidBody>
      {/* floor */}
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

function Bounds({ count }: { count: number }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2 + 0.3 / 2, 1.5 / 2, -((count - 1) * 4) / 2]}
          castShadow
          geometry={boxGeo}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * count]}
        />
        <mesh
          position={[-(2 + 0.3 / 2), 1.5 / 2, -((count - 1) * 4) / 2]}
          receiveShadow
          geometry={boxGeo}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * count]}
        />

        <mesh
          position={[0, 1.5 / 2, -count * 4 + 2 - 0.3 / 2]}
          receiveShadow
          geometry={boxGeo}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
        />
        {/* floor collider */}
        <CuboidCollider
          // for adding friction between marble and floor
          // if you wouldn't set this, ball would be
          // frictioning on the floor way too much
          // wouldn't look like rolling the ball
          friction={1}
          restitution={0.2}
          //

          args={[2, 0.2 / 2, (4 * count) / 2]}
          position={[0, -0.2 / 2, -(4 * count) / 2 + 2]}
        />
      </RigidBody>
      {/* initially I placed it here
      but you can just add it like I did above
      no need for creation of new rigid body
      */}
      {/* floor collider */}
      {/* <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
        // for adding friction between marble and floor
          friction={1}
          restitution={0.2}
          //
          args={[2, 0.2 / 2, (4 * count) / 2]}
          position={[0, -0.2 / 2, -(4 * count) / 2 + 2]}
        />
      </RigidBody> */}
    </>
  );
}
