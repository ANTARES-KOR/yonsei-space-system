export type BuildingName = "Engineering_1" | "Engineering_4";

export type RoomUID = number;

export const BuildingNumber: Record<BuildingName, number> = {
  Engineering_1: 102,
  Engineering_4: 124,
};

export const RoomNumber: Record<BuildingName, Record<string, RoomUID>> = {
  Engineering_1: {
    A546: 704,
  },
  Engineering_4: {
    D403: 14151,
    D404: 14153,
    D503: 14158,
    D504: 14159,
  },
};

export const URLs = {
  home: "https://space.yonsei.ac.kr/",
  reservation: "https://space.yonsei.ac.kr/reservation.php?mid=K02",
};
