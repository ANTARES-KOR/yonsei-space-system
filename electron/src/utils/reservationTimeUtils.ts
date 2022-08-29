const START_TOP = 0;
const THIRTY_MIN_HEIGHT = 21;

export const getReservationStartTime = (top: number) => {
  switch (top) {
    case 0:
      return "08:00";
    case 20:
      return "08:30";
    default:
      const steps = (top - 20) / THIRTY_MIN_HEIGHT;
  }
};
