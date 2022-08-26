import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Column.module.scss';
import { SingleReservationStatus } from '../interfaces';
import SingleReservationInfo from './SingleReservationInfo';

const cx = classNames.bind(styles);

interface Props {
  data?: SingleReservationStatus | undefined;
  isLabelColumn?: boolean;
}

function Column({ data, isLabelColumn }: Props) {
  const timeSlots = useMemo(
    () =>
      Array(32)
        .fill(0)
        .map((v, i) => i),
    [],
  );

  return (
    <div className={cx('column', { 'label-column': isLabelColumn })}>
      <div className={cx('column-header')}>{data?.date}</div>
      <div className={cx('column-rows-container')}>
        {data?.reservations.map((item) => (
          <SingleReservationInfo data={item} />
        ))}
        {timeSlots.map((item) => (
          <div className={cx('column-row')}>
            {isLabelColumn && item % 2 === 0 && `${item / 2 + 6}:00`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
