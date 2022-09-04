import React from 'react';
import styles from './SingleReservationInfo.module.scss';
import { calReservationDivHeight, calReservationDivPosition } from '../utils';
import { SingleReservation } from '../interfaces';

interface Props {
  data: SingleReservation;
}

function SingleReservationInfo({ data }: Props) {
  const style = {
    top: `${calReservationDivPosition(data?.start)}rem`,
    height: `${calReservationDivHeight(data?.start, data?.end)}rem`,
  };

  return (
    <div className={styles.container} style={style}>
      <div className={styles.header}>{`${data?.start}-${data?.end}`}</div>
      <div className={styles.content}>{data?.title}</div>
    </div>
  );
}

export default SingleReservationInfo;
