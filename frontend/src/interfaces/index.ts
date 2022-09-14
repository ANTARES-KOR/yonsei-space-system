export interface LoginForm {
  id: string;
  pw: string;
}

export interface SingleReservation {
  id: string;
  title: string;
  start: string;
  end: string;
  date: string;
  url: string;
  allDay: boolean;
}

export interface SingleReservationStatus {
  date: string;
  reservations: SingleReservation[];
}
