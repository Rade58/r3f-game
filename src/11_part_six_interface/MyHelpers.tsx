import { OrbitControls /* , Stage */ } from "@react-three/drei";
import { Perf } from "r3f-perf";

export function MyHelpers() {
  return (
    <>
      <Perf position="top-left" />
      <axesHelper args={[10]} />
      <OrbitControls makeDefault />
    </>
  );
}
