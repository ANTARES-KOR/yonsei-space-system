export type Reservation = {
  id: string;
  title: string;
  //
  /**
   * start time
   * UTC seconds passed from 1970-01-01T00:00:00Z
   */
  start: string;
  /**
   * end time
   * UTC seconds passed from 1970-01-01T00:00:00Z
   */
  end: string;
  color: string;
  textColor: string;
  url: string;
  allDay: boolean;
};

export type ParsedReservation = {
  id: string;
  title: string;
  start: string;
  end: string;
  url: string;
  allDay: boolean;
  date: string;
};
