/* eslint-disable @typescript-eslint/no-redeclare */
import React from 'react';
import { BlockShape } from 'utils/block';
import styles from './Cell.module.scss';

interface Cell {
  row: number;
  column: number;
  shape: BlockShape | '';
}

function Cell({ row, column, shape }: Cell): JSX.Element {
  const shapeClass = `shape-${shape}`;
  return <div className={`${styles.cell} ${styles[shapeClass]}`} />;
}

export default Cell;
