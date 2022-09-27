import { format } from 'date-fns';
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

const memoizedUpcomingSaturdays = () => {
  const cache: { [key: string]: string[] } = {};
  return (numOfWeek: number, startDate: Date) => {
    const key = JSON.stringify(startDate.getDay());
    if (!cache[key]) {
      const upcomingSaturdays: string[] = [];
      for (let i = 0; i < 7 * numOfWeek; i += 1) {
        if (startDate.getDay() === 6) {
          upcomingSaturdays.push(format(startDate, 'yyyy-MM-dd'));
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      cache[key] = upcomingSaturdays;
      return upcomingSaturdays;
    }
    return cache[key];
  };
};

const findUpcomingSaturdays = memoizedUpcomingSaturdays();

const queryReservationsOnSpecificDates = (
  res: ReservationsPerDay[],
  dates: string[],
) => {
  const result: ReservationsPerDay[] = [];
  dates.forEach((date) => {
    const reservation = res.find((item) => item.date === date);
    if (reservation) {
      result.push(reservation);
    } else {
      result.push({
        date,
        reservations: null,
      });
    }
  });
  return result;
};

export {
  calReservationDivHeight,
  calReservationDivPosition,
  findUpcomingSaturdays,
  queryReservationsOnSpecificDates,
};
