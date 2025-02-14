import { OrbitControls /* , Stage */ } from "@react-three/drei";

export function MyHelpers() {
  return (
    <>
      <axesHelper args={[10]} />
      <OrbitControls makeDefault />
    </>
  );
}
