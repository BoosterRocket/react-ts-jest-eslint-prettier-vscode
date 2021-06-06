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
  const flattened = matrix.reduce((_flattened, row) => [..._flattened, ...row], []);
  return (
    <div className={styles.grid} style={{ height, width }}>
      {flattened.map(({ row, column, content }) => (
        <Cell key={`cell-${row}-${column}`} row={row} column={column} content={content} />
      ))}
    </div>
  );
}

export default Grid;
