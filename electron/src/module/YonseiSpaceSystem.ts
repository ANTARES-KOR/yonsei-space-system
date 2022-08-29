import puppeteer from "puppeteer";
import { RoomNo, BuildingNo } from "../constants";
import { loginToYonseiSpaceSystem } from "../utils";
import { getUpcomingWeeklyReservation } from "../utils/getUpcomingWeeklyReservation";
import groupReservationsByDate from "../utils/groupReservationsByDate";

interface GetDailyReservationProps {
  date: Date;
  building_no: number;
  room_no: number;
}

export class YonseiSpaceSystem {
  private browser: puppeteer.Browser | null = null;

  init = async () => {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
  };

  login = async (id: string, pw: string): Promise<boolean> => {
    if (!this.browser) throw new Error("Browser is not initialized");
    try {
      await loginToYonseiSpaceSystem({ browser: this.browser, id, pw });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  private _getBuildingRoomInfo = (building: string, room: string) => {
    const building_no = BuildingNo[building];
    const room_no = RoomNo[building][room];

    if (!building_no || !room_no) throw new Error(`${building} ${room} is not found`);

    return { building_no, room_no };
  };

  getRoomReservations = async (building: string, room: string) => {
    try {
      const { building_no, room_no } = this._getBuildingRoomInfo(building, room);
      if (!this.browser) throw new Error("Browser is not initialized");
      const reservations = await getUpcomingWeeklyReservation(this.browser, {
        numOfWeek: 3,
        building_no,
        room_no,
      });

      return groupReservationsByDate(reservations);
    } catch (e) {
      console.error(e);
      return false;
    }
  };
}
