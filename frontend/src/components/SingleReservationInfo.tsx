import React from 'react';
import styles from './SingleReservationInfo.module.scss';
import { calReservationDivHeight, calReservationDivPosition } from '../utils';
import { SingleReservation } from '../interfaces';

interface Props {
  data: SingleReservation;
}

function SingleReservationInfo({ data }: Props) {
  const style = {
    top: `${calReservationDivPosition(data?.startTime)}rem`,
    height: `${calReservationDivHeight(data?.startTime, data?.endTime)}rem`,
  };

  return (
    <div className={styles.container} style={style}>
      <div
        className={styles.header}
      >{`${data?.startTime}-${data?.endTime}`}</div>
      <div className={styles.content}>{data?.eventName}</div>
    </div>
  );
}

export default SingleReservationInfo;
