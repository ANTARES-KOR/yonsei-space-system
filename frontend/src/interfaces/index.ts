export interface LoginForm {
  id: string;
  pw: string;
}

export interface ReservationInfo {
  id: string;
  title: string;
  start: string;
  end: string;
  date: string;
  url: string;
  allDay: boolean;
}

export interface ReservationsPerDay {
  date: string;
  reservations: ReservationInfo[];
}
