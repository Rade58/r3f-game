import { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  type RapierRigidBody,
  RigidBody,
  useRapier,
} from "@react-three/rapier";
import { Vector3 } from "three";

export function Player() {
  const [smoothCameraPosition] = useState(() => {
    return new Vector3(10, 10, 10);
  });

  const [smoothCameraTarget] = useState(() => {
    return new Vector3();
  });

  // -----------------

  const { rapier, world } = useRapier();
  //

  const marbleRef = useRef<RapierRigidBody>(null);

  //
  const [subscribeKeys, getKeys] = useKeyboardControls();

  // we have access to camera
  useFrame(({ camera }, delta) => {
    // ----------------------------------------------------
    // ****************** Controls ************************
    // const keys = getKeys();
    // console.log(keys);
    const { forward, backward, leftward, rightward /* , jump */ } = getKeys();

    // using delta to handle frame rate acctoss devices
    // handle frame rate with delta
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    if (forward) {
      torque.x -= torqueStrength;
      impulse.z -= impulseStrength;
    }
    if (backward) {
      torque.x += torqueStrength;
      impulse.z += impulseStrength;
    }
    if (leftward) {
      torque.z += torqueStrength;
      impulse.x -= impulseStrength;
    }
    if (rightward) {
      torque.z -= torqueStrength;
      impulse.x += impulseStrength;
    }

    if (marbleRef.current) {
      marbleRef.current.applyImpulse(impulse, true);
      marbleRef.current.applyTorqueImpulse(torque, true);
      // ***************************************************
      // ---------------------------------------------------

      // ***************************************************
      // ************** CAMERA *****************************
      const marblePosition = marbleRef.current.translation();

      // console.log({ marblePosition });
      const cameraPosition = new Vector3();

      cameraPosition.copy(marblePosition);

      // little bit behind marble
      cameraPosition.z += 2.25;
      // little bit above marble
      cameraPosition.y += 0.65;

      const cameraTarget = new Vector3();
      cameraTarget.copy(marblePosition);
      // camera to look at slightly above marble
      cameraTarget.y += 0.25;

      // ----------------------------------------------
      // ----------------------------------------------

      // smoothCameraPosition.lerp(cameraPosition, 0.1);
      smoothCameraPosition.lerp(cameraPosition, 5 * delta);
      // smoothCameraTarget.lerp(cameraTarget, 0.1);
      smoothCameraTarget.lerp(cameraTarget, 5 * delta);

      // ----------------------------------------------
      // ----------------------------------------------
      // instead of these
      // camera.position.copy(cameraPosition);
      // camera.lookAt(cameraTarget);
      // we will use smooth value
      camera.position.copy(smoothCameraPosition);
      camera.lookAt(smoothCameraTarget);

      // ---------------------------------------------------
      // ***************************************************
    }
  });

  function jump() {
    if (marbleRef.current) {
      const origin = marbleRef.current.translation();

      origin.y -= 0.31;

      const direction = { x: 0, y: -1, z: 0 };

      const ray = new rapier.Ray(origin, direction);

      const hit = world.castRay(ray, 10, true);

      // console.log({ hit });
      if (hit) {
        console.log(hit.timeOfImpact);
      }

      if (hit && hit.timeOfImpact < 0.15) {
        marbleRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
      }
    }
  }

  useEffect(() => {
    const unsubscribeKeys = subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    // unsubscribing

    return () => {
      unsubscribeKeys();
    };
  }, []);

  return (
    <RigidBody
      // type="dynamic" // default
      colliders="ball"
      friction={1}
      restitution={0.2}
      position={[0, 1, 0]}
      ref={marbleRef}
      //
      linearDamping={0.5}
    >
      <mesh castShadow>
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
