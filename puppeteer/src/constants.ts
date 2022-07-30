export type BuildingName = "Engineering_1" | "Engineering_4";

export type RoomUID = number;

export const BuildingNo: Record<BuildingName, number> = {
  Engineering_1: 102,
  Engineering_4: 124,
};

export const RoomNo: Record<BuildingName, Record<string, RoomUID>> = {
  Engineering_1: {
    A546: 704,
  },
  Engineering_4: {
    D403: 14151,
    D404: 14152,
    D503: 14158,
    D504: 14159,
  },
};

interface ReservationPopupURLProps {
  room_uid: string;
  start_time: Date;
  end_time: Date;
}

export const URLs = {
  home: "https://space.yonsei.ac.kr/",
  reservation: "https://space.yonsei.ac.kr/reservation.php?mid=K02",
  popupForm: "https://space.yonsei.ac.kr/ys_popform.php",
};
