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

export { calReservationDivHeight, calReservationDivPosition };
