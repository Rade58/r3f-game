import { BoxGeometry, MeshStandardMaterial } from "three";

const blockBoxGeometry = new BoxGeometry(/* 4, 0.2, 4 */ 1, 1, 1);
const floorBlockMaterial_1 = new MeshStandardMaterial({
  color: "#b9e972", // limegreen was bad
});

export function Level() {
  return (
    <>
      <BlockStart />
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
        geometry={blockBoxGeometry}
        material={floorBlockMaterial_1}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}
