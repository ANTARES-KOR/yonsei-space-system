import puppeteer from "puppeteer";
import { BuildingUID, RoomUID } from "../types";
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
      headless: true,
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

  getRoomReservations = async (building_uid: BuildingUID, room_uid: RoomUID) => {
    try {
      if (!this.browser) throw new Error("Browser is not initialized");
      const reservations = await getUpcomingWeeklyReservation(this.browser, {
        numOfWeek: 3,
        building_uid,
        room_uid,
      });

      return groupReservationsByDate(reservations);
    } catch (e) {
      console.error(e);
      return false;
    }
  };
}
