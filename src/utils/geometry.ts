import { Primitive, PrimitiveType } from '../types/primitive';
import { v4 as uuidv4 } from 'uuid';

const MAX_COLOR_VALUE = 0xFFFFFF;

export const generateRandomPosition = (): [number, number, number] => {
  return [
    Math.random() * 15 - 7.5,
    Math.random() * 15 - 7.5,
    Math.random() * 15 - 7.5
  ];
};

export const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * MAX_COLOR_VALUE).toString(16).padStart(6, '0')}`;
};

function isIntersecting(
  posA: [number, number, number], sizeA: { length: number; width: number; height: number },
  posB: [number, number, number], sizeB: { length: number; width: number; height: number }
): boolean {
  return (
    Math.abs(posA[0] - posB[0]) < (sizeA.length / 2 + sizeB.length / 2) &&
    Math.abs(posA[1] - posB[1]) < (sizeA.height / 2 + sizeB.height / 2) &&
    Math.abs(posA[2] - posB[2]) < (sizeA.width / 2 + sizeB.width / 2)
  );
}

export const createPrimitives = (
  type: PrimitiveType,
  parameters: { length: number; width: number; height: number },
  count: number,
  existing: Primitive[] = []
): Primitive[] => {
  const primitives: Primitive[] = [];
  const allPrimitives = [...existing];
  
  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let intersects: boolean;
    let position: [number, number, number];
    
    do {
      position = generateRandomPosition();
      intersects = allPrimitives.some((p) => isIntersecting(position, parameters, p.position, p.parameters));
      attempts++;
    } while (intersects && attempts < 100);

    const primitive: Primitive = {
      id: uuidv4(),
      type,
      parameters,
      position,
      colors: Array.from({ length: type === 'box' ? 6 : 5 }, () => generateRandomColor()),
      selected: false
    };

    console.log(primitive);

    primitives.push(primitive);
    allPrimitives.push(primitive);
  }
  return primitives;
}; 