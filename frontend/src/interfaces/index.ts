import { BuildingUID, RoomUID } from '../types';

export interface LoginForm {
  id: string;
  pw: string;
}

export interface GetReservationForm {
  building_uid: BuildingUID;
  room_uid: RoomUID;
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

export interface LectureRoomInfo {
  room_name: string;
  room_uid: RoomUID;
}

export interface LectureRoomsPerBuilding {
  building_name: string;
  building_uid: number;
  rooms: LectureRoomInfo[];
}
