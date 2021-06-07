import React, { useState, useEffect } from 'react';
import { Grid, Cell } from 'components';
import { BLOCK_MAP, BlockShape, RotationOption } from 'utils/block';
import { SPAWN_LOCATION, SPAWN_ROTATION } from 'utils/constants';
import { getRandomInt } from 'utils/numberUtils';

interface BlockData {
  refCoord: CellCoord;
  shape: BlockShape;
  rotation: RotationOption;
}

interface CellCoord {
  row: number;
  column: number;
}

interface PositionData {
  [key: number]: { [key: number]: BlockShape };
}

type Rotation = 0 | 1 | 2 | 3;

const GridLogic = ({ rows, columns }: { rows: number; columns: number }): JSX.Element => {
  const [refCoord, setRefCoord] = useState<CellCoord>(SPAWN_LOCATION);
  const [blockRotation, setBlockRotation] = useState<Rotation>(SPAWN_ROTATION);
  const [blockShape] = useState<BlockShape>(getRandomBlockShape());

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

    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [refCoord, blockRotation]);

  useEffect(() => {
    const rotationOptions: RotationOption[] = ['rotation-0', 'rotation-1', 'rotation-2', 'rotation-3'];

    updateMatrix(
      calculateBlockPosition({
        refCoord,
        shape: blockShape,
        rotation: rotationOptions[blockRotation],
      }),
    );
  }, [refCoord, blockRotation]);

  function getRandomBlockShape(): BlockShape {
    return (Object.keys(BlockShape) as BlockShape[])[getRandomInt(7)];
  }

  function calculateBlockPosition({ refCoord: _refCoord, shape, rotation }: BlockData): PositionData {
    const squares = BLOCK_MAP[shape][rotation];

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

        setBlockRotation(blockRotation === max ? min : ((blockRotation + 1) as Rotation));
      },
      ArrowDown: () => {
        setRefCoord({ row: refCoord.row + 1, column: refCoord.column });
      },
      ArrowLeft: () => {
        setRefCoord({ row: refCoord.row, column: refCoord.column - 1 });
      },
      ArrowRight: () => {
        setRefCoord({ row: refCoord.row, column: refCoord.column + 1 });
      },
      Space: () => {},
      none: () => {},
    };

    return handlers[keyCode] || handlers.none;
  }

  return <Grid height={`${rows * 24}px`} width={`${columns * 24}px`} matrix={matrix} />;
};

export default GridLogic;
