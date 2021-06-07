/* eslint-disable @typescript-eslint/no-redeclare */
import React from 'react';
import { Cell } from 'components';
import styles from './Grid.module.scss';

interface Props {
  height: string;
  width: string;
  matrix: Cell[][];
}

function Grid({ height, width, matrix }: Props): JSX.Element {
  return (
    <div className={styles.grid} style={{ height, width }}>
      {matrix.flat().map(({ row, column, shape }) => (
        <Cell key={`cell-${row}-${column}`} row={row} column={column} shape={shape} />
      ))}
    </div>
  );
}

export default Grid;
