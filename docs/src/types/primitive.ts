export type PrimitiveType = 'box' | 'pyramid';

export interface PrimitiveParameters {
  length: number;
  width: number;
  height: number;
}

export interface Primitive {
  id: string;
  type: PrimitiveType;
  parameters: PrimitiveParameters;
  position: [number, number, number];
  colors: string[];
  selected?: boolean;
}

export interface PrimitiveGroup {
  type: PrimitiveType;
  parameters: PrimitiveParameters;
  count: number;
} 

