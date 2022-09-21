import { BuildingUID, RoomUID } from '../types';
import {
  LectureRoomsPerBuilding,
  ReservationsPerDay,
} from '../interfaces/index';
/* eslint-disable no-unused-vars */
export {};

declare global {
  interface Window {
    YonseiSpaceSystem: {
      login: (id: string, pw: string) => Promise<boolean>;
      getBuildingRoomList: () => Promise<LectureRoomsPerBuilding[]>;
      getRoomReservations: (
        building_uid: BuildingUID,
        room_uid: RoomUID,
      ) => Promise<ReservationsPerDay[]>;
    };
  }
}
