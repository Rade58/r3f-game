import { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type RapierRigidBody, RigidBody } from "@react-three/rapier";

export function Player() {
  const marbleRef = useRef<RapierRigidBody>(null);

  //
  const [subscribeKeys, getKeys] = useKeyboardControls();

  // using delta to handle frame rate acctoss devices
  useFrame(({ clock }, delta) => {
    // const keys = getKeys();
    // console.log(keys);
    const { forward, backward, leftward, rightward, jump } = getKeys();

    // not doing this way (I did it like this and I didn't take
    // in consideration that player can press multiple keys at the
    // same time)
    /* if (forward && marbleRef.current) {
      marbleRef.current.applyTorqueImpulse({ x: -0.02, y: 0, z: 0 }, true);
    }
    if (backward && marbleRef.current) {
      marbleRef.current.applyTorqueImpulse({ x: 0.02, y: 0, z: 0 }, true);
    }
    if (leftward && marbleRef.current) {
      marbleRef.current.applyTorqueImpulse({ x: 0, y: 0, z: 0.01 }, true);
    }
    if (rightward && marbleRef.current) {
      marbleRef.current.applyTorqueImpulse({ x: 0, y: 0, z: -0.01 }, true);
    } */
    // we are not doing above because we didn't handle
    // when player presses on multiple keys at the same time

    // we will change these values
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    if (forward) {
      torque.x = -0.02;
    }
    if (backward) {
      torque.x = 0.02;
    }
    if (leftward) {
      torque.z = 0.01;
    }
    if (rightward) {
      torque.z = -0.01;
    }
    if (jump) {
      impulse.y = 0.09;
    }

    if (marbleRef.current) {
      marbleRef.current.applyImpulse(impulse, true);
      marbleRef.current.applyTorqueImpulse(torque, true);
    }
  });

  return (
    <RigidBody
      // type="dynamic" // default
      colliders="ball"
      friction={1}
      restitution={0.2}
      position={[0, 1, 0]}
      ref={marbleRef}
    >
      <mesh
        //
        // position-y={1}
        //
        //
        castShadow
      >
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          // color={"mediumpurple"}
          color={"#a888e9"}
          flatShading
        />
      </mesh>
    </RigidBody>
  );
}
