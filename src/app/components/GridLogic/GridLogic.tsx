import React, { useState, useEffect } from 'react';
import { Grid, Cell } from 'components';
import { BLOCK_MAP, BlockShape, RotationOption } from 'utils/block';
import { SPAWN_LOCATION, SPAWN_ROTATION } from 'utils/constants';
import { getRandomInt } from 'utils/numberUtils';

interface CellCoord {
  row: number;
  column: number;
}

type Rotation = 0 | 1 | 2 | 3;

interface BlockData {
  refCoord: CellCoord;
  shape: BlockShape;
  rotation: Rotation;
}

interface PositionData {
  [key: number]: { [key: number]: BlockShape };
}

const GridLogic = ({ rows, columns }: { rows: number; columns: number }): JSX.Element => {
  const [refCoord, setRefCoord] = useState<CellCoord>(SPAWN_LOCATION);
  const [blockRotation, setBlockRotation] = useState<Rotation>(SPAWN_ROTATION);
  const [blockShape] = useState<BlockShape>(getRandomBlockShape());

  const [blockPosition, setBlockPosition] = useState<PositionData>(
    calculateBlockPosition({
      refCoord,
      shape: blockShape,
      rotation: blockRotation,
    }),
  );

  const [matrix, setMatrix] = useState<Cell[][]>(
    [...(new Array(rows) as Cell[][])].map((_, row) =>
      [...(new Array(columns) as Cell[])].map((__, column) => ({
        row,
        column,
        shape: '',
      })),
    ),
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownEvent);
    return () => window.removeEventListener('keydown', handleKeyDownEvent);
  }, [refCoord, blockRotation]);

  useEffect(() => updateMatrix(blockPosition), [blockPosition]);

  function getRandomBlockShape(): BlockShape {
    return (Object.keys(BlockShape) as BlockShape[])[getRandomInt(7)];
  }

  function calculateBlockPosition({ refCoord: _refCoord, shape, rotation }: BlockData): PositionData {
    const squares = BLOCK_MAP[shape][`rotation-${rotation}` as RotationOption];

    const position = squares.reduce((block, currentSquare) => {
      const row = _refCoord.row + currentSquare.row;
      const column = _refCoord.column + currentSquare.column;

      return { ...block, [row]: { ...block[row], [column]: shape } };
    }, {} as PositionData);

    return position;
  }

  function updateMatrix(updates: { [key: number]: { [key: number]: BlockShape } }) {
    setMatrix((prevRows) =>
      prevRows.map((prevRow) =>
        prevRow.map(({ row, column }) => ({
          row,
          column,
          shape: updates[row] && updates[row][column] ? updates[row][column] : '',
        })),
      ),
    );
  }

  function handleKeyDownEvent(event: KeyboardEvent): void {
    const handler = getKeyDownHandler(event.code);
    handler();
  }

  function getKeyDownHandler(keyCode: string): () => void {
    const handlers: { [keys: string]: () => void } = {
      ArrowUp: () => {
        const min: Rotation = 0;
        const max: Rotation = 3;

        const updatedRotation = blockRotation === max ? min : ((blockRotation + 1) as Rotation);
        const updatedPosition = calculateBlockPosition({
          refCoord,
          shape: blockShape,
          rotation: updatedRotation,
        });

        if (hasReachedBoundary(updatedPosition)) return;

        setBlockRotation(updatedRotation);
        setBlockPosition(updatedPosition);
      },
      ArrowDown: () => handleRefCoordChange({ row: refCoord.row + 1, column: refCoord.column }),
      ArrowLeft: () => handleRefCoordChange({ row: refCoord.row, column: refCoord.column - 1 }),
      ArrowRight: () => handleRefCoordChange({ row: refCoord.row, column: refCoord.column + 1 }),
      Space: () => {},
      none: () => {},
    };

    return handlers[keyCode] || handlers.none;
  }

  function handleRefCoordChange(updatedRefCoord: CellCoord) {
    const updatedPosition = calculateBlockPosition({
      refCoord: updatedRefCoord,
      shape: blockShape,
      rotation: blockRotation,
    });

    if (hasReachedBoundary(updatedPosition)) return;

    setRefCoord(updatedRefCoord);
    setBlockPosition(updatedPosition);
  }

  function hasReachedBoundary(position: PositionData): boolean {
    const columnBoundaries = ['-1', `${columns}`];
    const rowBoundary = `${rows}`;

    return Object.entries(position).some(
      ([row, squares]) =>
        row === rowBoundary || Object.keys(squares).some((columnCoord) => columnBoundaries.includes(columnCoord)),
    );
  }

  return <Grid height={`${rows * 24}px`} width={`${columns * 24}px`} matrix={matrix} />;
};

export default GridLogic;
