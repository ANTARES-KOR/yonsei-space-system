import { URLs } from "../constants";

interface ReservationPopupURLProps {
  room_uid: string;
  start_time: Date;
  end_time: Date;
}

const getReservationPopupURL = ({
  room_uid,
  start_time,
  end_time,
}: ReservationPopupURLProps): string => {
  const url_start_time = Math.floor(start_time.getMilliseconds() / 1000);
  const url_end_time = Math.floor(end_time.getMilliseconds() / 1000);

  return `${URLs.popupForm}?mid=K02&start=${url_start_time}&end=${url_end_time}&uid=${room_uid}`;
};

export default getReservationPopupURL;
