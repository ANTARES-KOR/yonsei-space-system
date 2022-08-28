import { ParsedReservation, Reservation } from "../types";

const groupReservationsByDate = <T extends ParsedReservation>(arr: T[]) => {
  console.log(arr);
  return arr.reduce<Array<{ date: string; reservations: T[] }>>((groups, reservation) => {
    const target_date = reservation.date;

    const targetGroupIndex = groups.findIndex((group) => group.date === target_date);

    if (targetGroupIndex === -1) {
      groups.push({
        date: target_date,
        reservations: [reservation],
      });
    } else {
      groups[targetGroupIndex].reservations.push(reservation);
    }

    return groups;
  }, []);
};

export default groupReservationsByDate;
