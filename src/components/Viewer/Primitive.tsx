import React, { useRef } from "react";
import { Primitive as PrimitiveType } from "../../types/primitive";
import * as THREE from "three";

interface PrimitiveProps {
  primitive: PrimitiveType;
  onClick?: () => void;
}

export const Primitive = ({ primitive, onClick }: PrimitiveProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const createBoxFaces = (length: number, height: number, width: number) => {
    const w = width / 2;
    const h = height / 2;
    const l = length / 2;

    const faces = [
      // Передняя грань
      {
        vertices: [-w, -h, l, w, -h, l, w, h, l, -w, h, l],
        indices: [0, 1, 2, 2, 3, 0],
      },
      // Задняя грань
      {
        vertices: [-w, -h, -l, -w, h, -l, w, h, -l, w, -h, -l],
        indices: [0, 1, 2, 2, 3, 0],
      },
      // Верхняя грань
      {
        vertices: [-w, h, -l, -w, h, l, w, h, l, w, h, -l],
        indices: [0, 1, 2, 2, 3, 0],
      },
      // Нижняя грань
      {
        vertices: [-w, -h, -l, w, -h, -l, w, -h, l, -w, -h, l],
        indices: [0, 1, 2, 2, 3, 0],
      },
      // Правая грань
      {
        vertices: [w, -h, -l, w, h, -l, w, h, l, w, -h, l],
        indices: [0, 1, 2, 2, 3, 0],
      },
      // Левая грань
      {
        vertices: [-w, -h, -l, -w, -h, l, -w, h, l, -w, h, -l],
        indices: [0, 1, 2, 2, 3, 0],
      },
    ];

    return faces;
  };

  const createPyramidFaces = (width: number, height: number, length: number) => {
    const w = width / 2;
    const l = length / 2;
    const h = height;

    const faces = [
      // Основание
      {
        vertices: [-w, 0, -l, w, 0, -l, w, 0, l, -w, 0, l],
        indices: [0, 1, 2, 2, 3, 0],
      },
      // Передняя грань
      {
        vertices: [-w, 0, -l, w, 0, -l, 0, h, 0],
        indices: [0, 1, 2],
      },
      // Правая грань
      {
        vertices: [w, 0, -l, w, 0, l, 0, h, 0],
        indices: [0, 1, 2],
      },
      // Задняя грань
      {
        vertices: [w, 0, l, -w, 0, l, 0, h, 0],
        indices: [0, 1, 2],
      },
      // Левая грань
      {
        vertices: [-w, 0, l, -w, 0, -l, 0, h, 0],
        indices: [0, 1, 2],
      },
    ];

    return faces;
  };

  const faces =
    primitive.type === "box"
      ? createBoxFaces(
          primitive.parameters.length,
          primitive.parameters.height,
          primitive.parameters.width
        )
      : createPyramidFaces(
          primitive.parameters.width,
          primitive.parameters.height,
          primitive.parameters.length
        );

  return (
    <group ref={groupRef} position={primitive.position}>
      {faces.map((face, index) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(face.vertices, 3));
        geometry.setIndex(face.indices);
        geometry.computeVertexNormals();

        return (
          <mesh
            key={index}
            geometry={geometry}
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
            }}
          >
            <meshStandardMaterial
              color={primitive.selected ? "#ff0000" : primitive.colors[index]}
              side={THREE.DoubleSide}
              flatShading={true}
            />
          </mesh>
        );
      })}
    </group>
  );
};
