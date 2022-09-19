import { ReservationsPerDay } from '../interfaces';

const calTimeLength = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(':');
  const [endHour, endMinute] = endTime.split(':');
  const timeLength =
    (parseInt(endHour, 10) - parseInt(startHour, 10)) * 6 * 10 +
    parseInt(endMinute, 10) -
    parseInt(startMinute, 10);
  return timeLength;
};

const calReservationDivHeight = (startTime: string, endTime: string) =>
  (calTimeLength(startTime, endTime) / 10) * 0.7;

const calReservationDivPosition = (startTime: string) =>
  (calTimeLength('06:00', startTime) / 10) * 0.7;

const filterSpecificDay = (day: number, res: ReservationsPerDay[]) => {
  const saturdays = res.filter((item) => {
    const [year, month, date] = item.date
      .split('-')
      .map((i: string) => Number(i));
    return new Date(year, month - 1, date).getDay() === day;
  });
  return saturdays;
};

export {
  calReservationDivHeight,
  calReservationDivPosition,
  filterSpecificDay,
};
