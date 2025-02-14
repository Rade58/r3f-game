import { Canvas, type RootState } from "@react-three/fiber";
import { Experience } from "./Experience";
import {
  CineonToneMapping,
  // ReinhardToneMapping,
  // ACESFilmicToneMapping,
  // SRGBColorSpace,
  // LinearSRGBColorSpace,
  // Color,
} from "three";
import { KeyboardControls } from "@react-three/drei";
import { Interface } from "./Interface";
// import { Leva } from "leva";

export function App() {
  return (
    <>
      {/* <Leva /> */}

      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          // onCreated={created}
          // dpr={[1, 2]}
          // flat
          gl={
            {
              // antialias: true,
              // toneMapping: CineonToneMapping,
              // outputColorSpace: SRGBColorSpace,
              // toneMappingExposure: 2,
            }
          }
          camera={{
            fov: 45,
            near: 0.1,
            far: 50,
            // position: [3, 2, 6],
            // position: [-4, 3, 6],
            position: [3, 3, 6],
            // position: [0, 0, 0],
            // zoom: 100,
          }}
          // orthographic
          shadows
        >
          {/* <color args={["blanchedalmond"]} attach={"background"} /> */}
          <Experience />
        </Canvas>
        {/* Interface */}
        <Interface />
      </KeyboardControls>
    </>
  );
}

/* function created(state: RootState) {
  console.log("created");

  state.gl.setClearColor(0xff0000, 0.5);

  state.scene.background = new Color("yellow");
}
 */
