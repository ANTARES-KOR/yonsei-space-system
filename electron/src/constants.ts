export type RoomUID = number;

export const BuildingNo: Record<string, number> = {
  Engineering_1: 102,
  Engineering_4: 124,
};

export type BuildingName = keyof typeof BuildingNo;

export const RoomNo: Record<keyof typeof BuildingNo, Record<string, RoomUID>> = {
  Engineering_1: {
    A320: 555,
    A546: 704,
  },
  Engineering_4: {
    D403: 14151,
    D404: 14152,
    D503: 14158,
    D504: 14159,
  },
};

export const URLs = {
  home: "https://space.yonsei.ac.kr/",
  reservation: "https://space.yonsei.ac.kr/reservation.php?mid=K02",
  popupForm: "https://space.yonsei.ac.kr/ys_popform.php",
};
