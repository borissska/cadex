import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Primitive } from "./Primitive.tsx";
import { Primitive as PrimitiveType } from "../../types/primitive";

interface ViewerProps {
  primitives: PrimitiveType[];
  onPrimitiveClick: (id: string) => void;
}

export const Viewer: React.FC<ViewerProps> = ({ primitives, onPrimitiveClick }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={1.0} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <OrbitControls />
        {primitives.map((primitive) => (
          <Primitive
            key={primitive.id}
            primitive={primitive}
            onClick={() => onPrimitiveClick(primitive.id)}
          />
        ))}
      </Canvas>
    </div>
  );
};
