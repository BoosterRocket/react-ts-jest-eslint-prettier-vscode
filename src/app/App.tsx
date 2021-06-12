import React from 'react';
import { GridLogic } from 'components';
import styles from './App.module.scss';

export function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <GridLogic columns={10} rows={22} interval={1000} />
    </div>
  );
}
