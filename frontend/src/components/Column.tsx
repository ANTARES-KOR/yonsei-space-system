import React from 'react';
import classNames from 'classnames/bind';
import styles from './Column.module.scss';
import { ReservationsPerDay } from '../interfaces';
import SingleReservationInfo from './SingleReservationInfo';
import { timeslotsArr } from '../constants';

const cx = classNames.bind(styles);

interface Props {
  data?: ReservationsPerDay | undefined;
  isLabelColumn?: boolean;
}

function Column({ data, isLabelColumn }: Props) {
  return (
    <div className={cx('column', { 'label-column': isLabelColumn })}>
      <div className={cx('column-header')}>{data?.date}</div>
      <div className={cx('column-rows-container')}>
        {data?.reservations?.map((item) => (
          <SingleReservationInfo data={item} key={item.id} />
        ))}
        {timeslotsArr.map((item) => (
          <div className={cx('column-row')} key={item}>
            {isLabelColumn && item % 2 === 0 && `${item / 2 + 6}:00`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
