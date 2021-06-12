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

interface Props {
  rows: number;
  columns: number;
  interval: number;
}

const GridLogic = ({ rows, columns, interval }: Props): JSX.Element => {
  const [frameUpdate, toggleFrameUpdate] = useState(false);
  const [refCoord, setRefCoord] = useState<CellCoord>(SPAWN_LOCATION);
  const [blockRotation, setBlockRotation] = useState<Rotation>(SPAWN_ROTATION);
  const [blockShape, setBlockShape] = useState<BlockShape>(getRandomBlockShape());
  const [hasReachedDepth, setHasReachedDepth] = useState(false);
  const [blockPosition, setBlockPosition] = useState<PositionData>(initBlockPosition());

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

  useEffect(() => {
    setTimeout(() => toggleFrameUpdate(!frameUpdate), interval);
    handleRefCoordChange({ row: refCoord.row + 1, column: refCoord.column });
  }, [frameUpdate]);

  function getRandomBlockShape(): BlockShape {
    return (Object.keys(BlockShape) as BlockShape[])[getRandomInt(7)];
  }

  function initBlockPosition() {
    return calculateBlockPosition({
      refCoord,
      shape: blockShape,
      rotation: blockRotation,
    });
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
      ArrowDown: () => {
        // toggleFrameUpdate(!frameUpdate);
        handleRefCoordChange({ row: refCoord.row + 1, column: refCoord.column });
      },
      ArrowLeft: () => handleRefCoordChange({ row: refCoord.row, column: refCoord.column - 1 }),
      ArrowRight: () => handleRefCoordChange({ row: refCoord.row, column: refCoord.column + 1 }),
      Space: handleHardDrop,
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

    if (isMaxColumnDepth(updatedPosition)) handleEndOfBlockCycle();
    if (hasReachedBoundary(updatedPosition)) return;

    setRefCoord(updatedRefCoord);
    setBlockPosition(updatedPosition);
  }

  function handleHardDrop() {
    const bottomRow = rows - 1;
    const bottomSquare = BLOCK_MAP[blockShape][`rotation-${blockRotation}` as RotationOption][3];
    const updatedRefCoord = { row: bottomRow - bottomSquare.row, column: refCoord.column };

    const updatedPosition = calculateBlockPosition({
      refCoord: updatedRefCoord,
      shape: blockShape,
      rotation: blockRotation,
    });

    setRefCoord(updatedRefCoord);
    setBlockPosition(updatedPosition);
    toggleFrameUpdate(!frameUpdate);
  }

  function handleEndOfBlockCycle() {
    const handlers = {
      0: () => setHasReachedDepth(true),
      1: () => resetBlockCycle(),
    };

    handlers[!hasReachedDepth ? 0 : 1]();
  }

  function hasReachedBoundary(position: PositionData): boolean {
    const columnBoundaries = ['-1', `${columns}`];

    return (
      isMaxColumnDepth(position) ||
      Object.entries(position).some(([, squares]) =>
        Object.keys(squares).some((columnCoord) => columnBoundaries.includes(columnCoord)),
      )
    );
  }

  function isMaxColumnDepth(position: PositionData): boolean {
    const rowBoundary = `${rows}`;
    return Object.entries(position).some(([row]) => row === rowBoundary);
  }

  function resetBlockCycle() {
    // toggleFrameUpdate(!frameUpdate);
    setRefCoord(SPAWN_LOCATION);
    setBlockRotation(SPAWN_ROTATION);
    setBlockShape(getRandomBlockShape());
    setHasReachedDepth(false);
    setBlockPosition(initBlockPosition());
  }

  return <Grid height={`${rows * 24}px`} width={`${columns * 24}px`} matrix={matrix} />;
};

export default GridLogic;
