export enum BlockShape {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
}

export type RotationOption = 'rotation-0' | 'rotation-1' | 'rotation-2' | 'rotation-3';

export interface SquareCoord {
  row: number;
  column: number;
}

export interface RotationData {
  'rotation-0': SquareCoord[];
  'rotation-1': SquareCoord[];
  'rotation-2': SquareCoord[];
  'rotation-3': SquareCoord[];
}

export const BLOCK_MAP: { [key in BlockShape]: RotationData } = {
  /* 
      Note: the order matters - ordered from top left to bottom right, 
      each digit represents the offset from the refCoord 
  */

  I: {
    'rotation-0': [
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
    ],
    'rotation-1': [
      { row: -1, column: 1 },
      { row: 0, column: 1 },
      { row: 1, column: 1 },
      { row: 2, column: 1 },
    ],
    'rotation-2': [
      { row: 1, column: -1 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ],
    'rotation-3': [
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 1, column: 0 },
      { row: 2, column: 0 },
    ],
  },
  J: {
    'rotation-0': [
      { row: -1, column: -1 },
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    'rotation-1': [
      { row: -1, column: 0 },
      { row: -1, column: 1 },
      { row: 0, column: 0 },
      { row: 1, column: 0 },
    ],
    'rotation-2': [
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: 1 },
    ],
    'rotation-3': [
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 1, column: -1 },
      { row: 1, column: 0 },
    ],
  },
  L: {
    'rotation-0': [
      { row: -1, column: 1 },
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    'rotation-1': [
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
    ],
    'rotation-2': [
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: -1 },
    ],
    'rotation-3': [
      { row: -1, column: -1 },
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 1, column: 0 },
    ],
  },
  O: {
    'rotation-0': [
      { row: -1, column: 0 },
      { row: -1, column: 1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    'rotation-1': [
      { row: -1, column: 0 },
      { row: -1, column: 1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    'rotation-2': [
      { row: -1, column: 0 },
      { row: -1, column: 1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    'rotation-3': [
      { row: -1, column: 0 },
      { row: -1, column: 1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
  },
  S: {
    'rotation-0': [
      { row: -1, column: 1 },
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 0, column: -1 },
    ],
    'rotation-1': [
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: 1 },
    ],
    'rotation-2': [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: -1 },
      { row: 1, column: 0 },
    ],
    'rotation-3': [
      { row: -1, column: -1 },
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 1, column: 0 },
    ],
  },
  T: {
    'rotation-0': [
      { row: -1, column: 0 },
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    'rotation-1': [
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: 0 },
    ],
    'rotation-2': [
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: 0 },
    ],
    'rotation-3': [
      { row: -1, column: 0 },
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 1, column: 0 },
    ],
  },
  Z: {
    'rotation-0': [
      { row: -1, column: -1 },
      { row: -1, column: 0 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ],
    'rotation-1': [
      { row: -1, column: 1 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: 0 },
    ],
    'rotation-2': [
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
    ],
    'rotation-3': [
      { row: -1, column: 0 },
      { row: 0, column: -1 },
      { row: 0, column: 0 },
      { row: 1, column: -1 },
    ],
  },
};

export default BLOCK_MAP;
