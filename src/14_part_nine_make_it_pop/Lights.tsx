import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type DirectionalLight } from "three";

export function Lights() {
  const directLightRef = useRef<DirectionalLight>(null);

  useFrame(({ camera }) => {
    //

    if (directLightRef.current) {
      // moving shadow a bit front by -4
      directLightRef.current.position.z = camera.position.z + 1 - 4;

      directLightRef.current.target.position.z = camera.position.z - 4;

      directLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <directionalLight
        ref={directLightRef}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}
