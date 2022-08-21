import puppeteer from "puppeteer";
import { URLs, RoomNo, BuildingNo } from "../constants";
import { getUpcomingFourSaturdays, loginToYonseiSpaceSystem } from "../utils";
import { format } from "date-fns";

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

  getRoomReservations = async (building: string, room: string) => {
    try {
      const building_no = BuildingNo[building];
      const room_no = RoomNo[building][room];

      if (!building_no || !room_no) return false;
      const saturdays = getUpcomingFourSaturdays();

      const reservations = await Promise.all(
        saturdays.map((date) => this._getDailyReservations({ date, building_no, room_no }))
      );

      return reservations.filter(Boolean);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  private _getDailyReservations = async ({
    date,
    building_no,
    room_no,
  }: GetDailyReservationProps) => {
    try {
      if (!this.browser) throw new Error("Browser is not initialized");
      const page = await this.browser.newPage();
      await page.goto(URLs.reservation);

      await page.waitForSelector("#ys_usersearch");

      await page.$eval(
        "#appDate",
        (el, reservation_date) => ((el as HTMLInputElement).value = reservation_date),
        format(date, "yyyy-MM-dd")
      );

      // select building
      await page.select("#uBuilding", building_no.toString());

      // click search btn
      await page.click("#ys_usersearch > form > a.button.icon.search");
      await page.waitForSelector("#ys_roomlist > form");

      // select room
      const roomSelector = `#ys_roomlist > form > table > tbody > tr > td:nth-child(1) > input[value="${room_no}"]`;
      const isAvailable = !!(await page.$(roomSelector));

      // if room is not available, return result
      if (!isAvailable) {
        return {
          date: format(date, "yyyy-MM-dd"),
          reservations: null,
          not_available: true,
        };
      }

      await page.click(roomSelector);

      // wait for page load & booking status to appear.
      await page.waitForSelector("#ys_timetable");
      await page.waitForResponse((res) => res.url().includes("act=bookingstatus") && res.ok());

      // get room reservation info
      const reservations = await page.$$eval(".fc-event", (els) =>
        els.map((el) => {
          const duration = el.querySelector(".fc-event-time")?.textContent;
          const event_name = el.querySelector(".fc-event-title")?.textContent;
          return { event_name, duration };
        })
      );

      return {
        date: format(date, "yyyy-MM-dd"),
        reservations,
        not_available: false,
      };
    } catch (e) {
      console.error(e);
    }
  };
}
