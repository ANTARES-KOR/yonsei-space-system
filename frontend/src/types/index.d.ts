import { BuildingUID, RoomUID } from '../types';
import { ReservationsPerDay } from '../interfaces/index';
/* eslint-disable no-unused-vars */
export {};

declare global {
  interface Window {
    YonseiSpaceSystem: {
      login: (id: string, pw: string) => Promise<boolean>;
      getRoomReservations: (
        building_uid: BuildingUID,
        room_uid: RoomUID,
      ) => Promise<ReservationsPerDay[]>;
    };
  }
}
