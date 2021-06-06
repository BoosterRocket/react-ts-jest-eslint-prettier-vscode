import React, { useState } from 'react';
import { Grid, Cell } from 'components';

interface Props {
  columns: number;
  rows: number;
}

const GridLogic = ({ columns, rows }: Props): JSX.Element => {
  const [matrix] = useState(
    [...(new Array(rows) as Cell[][])].map((_, row) =>
      [...(new Array(columns) as Cell[])].map((__, column) => ({
        row,
        column,
        content: '',
      })),
    ),
  );

  return <Grid height={`${rows * 24}px`} width={`${columns * 24}px`} matrix={matrix} />;
};

export default GridLogic;
