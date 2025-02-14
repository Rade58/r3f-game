import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  type RapierRigidBody,
  RigidBody,
  useRapier,
} from "@react-three/rapier";

export function Player() {
  // just needed for jumping
  // because we need to cast a ray
  const { rapier, world } = useRapier();
  //

  const marbleRef = useRef<RapierRigidBody>(null);

  //
  const [subscribeKeys, getKeys] = useKeyboardControls();

  // using delta to handle frame rate acctoss devices
  useFrame((_, delta) => {
    // const keys = getKeys();
    // console.log(keys);
    const { forward, backward, leftward, rightward /* , jump */ } = getKeys();

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

    // handle frame rate with delta
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    // we will change these values
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    // no idea why are we applying impulse
    // whee we also apply torque
    // because torque is significant force
    // and we only need impulse for the jump
    // torque, it makes marble roll
    // why have two forces?
    // **** I guess because when marble is in the air
    // **** we can apply impulse to impact movment

    if (forward) {
      // torque.x = -0.02;
      torque.x -= torqueStrength;
      impulse.z -= impulseStrength;
    }
    if (backward) {
      // torque.x = 0.02;
      torque.x += torqueStrength;
      impulse.z += impulseStrength;
    }
    if (leftward) {
      // torque.z = 0.01;
      torque.z += torqueStrength;
      impulse.x -= impulseStrength;
    }
    if (rightward) {
      // torque.z = -0.01;
      torque.z -= torqueStrength;
      impulse.x += impulseStrength;
    }
    // we don't want to apply jump on each
    // we use subscribe for this (we subscribe in useEffect)
    /* if (jump) {
      // impulse.y = 0.09;
      impulse.y += impulseStrength;
    } */

    if (marbleRef.current) {
      marbleRef.current.applyImpulse(impulse, true);
      marbleRef.current.applyTorqueImpulse(torque, true);
    }
  });

  function jump() {
    if (marbleRef.current) {
      // we need to test the collision with floor
      // because we  only want to allow jump
      // if marble is on the floor
      // if it is in collision with floor

      // we don't want to be able to jump
      // when marble is already in air

      // this is similar like raycasting but it isn't

      const origin = marbleRef.current.translation();

      // only allow jump when y is 0
      // but, remember that floor is 0.3 above 0

      origin.y -= 0.31;

      const direction = { x: 0, y: -1, z: 0 };

      // now we need to use Rapier library
      //

      const ray = new rapier.Ray(origin, direction);
      // we will cast a ray to test whole world

      // second arg max time of impact
      // third is soli (boolean)
      const hit = world.castRay(ray, 10, true);

      // if time of impact is above 0
      // we shouldn't be able to jump
      // since we are not on the ground

      console.log({ hit });
      if (hit) {
        console.log(hit.timeOfImpact);
      }

      if (hit && hit.timeOfImpact < 0.15) {
        // we are giving a close enough chance to jump
        // if it is bellow 0.15
        // I guess this is some aproximate value
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
    // if we wouldn't do this
    // if we make a change because of
    // hot module replacement
    // component would rerender and
    // it would make a subscription again
    // we would have two functions executing
    // which would make our ball jump two times high
    return () => {
      unsubscribeKeys();
    };
  }, []);

  // we define damping (linearDamping) because we want to be able to stop
  // marble, because without it when we apply force
  // it would roll to much, maybe never stop

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
