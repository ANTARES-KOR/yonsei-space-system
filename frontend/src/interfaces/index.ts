export interface LoginForm {
  id: string;
  pw: string;
}

export interface SingleReservation {
  startTime: string;
  endTime: string;
  eventName: string;
}

export interface SingleReservationStatus {
  date: string;
  reservations: SingleReservation[];
}
