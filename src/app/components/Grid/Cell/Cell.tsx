/* eslint-disable @typescript-eslint/no-redeclare */
import React from 'react';
import styles from './Cell.module.scss';

interface Cell {
  row: number;
  column: number;
  content: string;
}

function Cell({ row, column, content }: Cell): JSX.Element {
  return <div className={styles.cell}>{content}</div>;
}

export default Cell;
