import React from 'react';
import { useRecoilValue } from 'recoil';
import { reservationStatusState } from '../atom';
import styles from './Table.module.scss';
import Column from './Column';

function Table() {
  const reservationStatus = useRecoilValue(reservationStatusState);
  return (
    <div className={styles.table}>
      <Column isLabelColumn />
      {reservationStatus.map((item) => (
        <Column data={item} />
      ))}
    </div>
  );
}

export default Table;
