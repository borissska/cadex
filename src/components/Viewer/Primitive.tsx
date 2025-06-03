import React, { useRef } from "react";
import { Primitive as PrimitiveType } from "../../types/primitive";
import * as THREE from "three";

interface PrimitiveProps {
  primitive: PrimitiveType;
  onClick?: () => void;
}

export const Primitive = ({ primitive, onClick }: PrimitiveProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry =
    primitive.type === "box"
      ? new THREE.BoxGeometry(
          primitive.parameters.length,
          primitive.parameters.height,
          primitive.parameters.width
        )
      : new THREE.ConeGeometry(
          primitive.parameters.width / 2,
          primitive.parameters.height,
          4,
          1,
          false,
          0,
          Math.PI * 2
        );

  const materials = primitive.colors.map(
    (color) =>
      new THREE.MeshStandardMaterial({
        color: primitive.selected ? "#ff0000" : color,
        metalness: 0.2,
        roughness: 0.2,
      })
  );

  return (
    <mesh ref={meshRef} position={primitive.position} onClick={onClick} geometry={geometry}>
      {materials.map((material, index) => (
        <primitive key={index} object={material} attach={`material-${index}`} />
      ))}
    </mesh>
  );
};
