import React from 'react';
import { useRecoilValue } from 'recoil';
import { reservationStatusState } from '../atom';
import styles from './Table.module.scss';
import Column from './Column';

function ReservationInfoTable() {
  const reservationStatus = useRecoilValue(reservationStatusState);
  return (
    <div className={styles.table}>
      <Column isLabelColumn />
      {reservationStatus?.map((item) => (
        <Column data={item} key={item.date} />
      ))}
    </div>
  );
}

export default ReservationInfoTable;
