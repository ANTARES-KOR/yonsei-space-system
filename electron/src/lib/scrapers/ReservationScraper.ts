import type { Browser } from "puppeteer";
import { BuildingName, BuildingNo, RoomNo, URLs } from "../../core/constants";
import { format } from "date-fns";
import fs from "fs";

interface ReservationScraperProps {
  date: Date;
  building: BuildingName;
  room: string;
}

class ReservationScraper {
  private _url = URLs.reservation;
  private browser: Browser;

  constructor({ browser }: { browser: Browser }) {
    this.browser = browser;
  }

  scrape = async ({ date, building, room }: ReservationScraperProps) => {
    const page = await this.browser.newPage();
    await page.goto(this._url);

    await page.waitForSelector("#ys_usersearch");

    await page.$eval(
      "#appDate",
      (el, reservation_date) => ((el as HTMLInputElement).value = reservation_date),
      format(date, "yyyy-MM-dd")
    );

    // select building
    await page.select("#uBuilding", BuildingNo[building].toString());

    // click search btn
    await page.click("#ys_usersearch > form > a.button.icon.search");

    // select room
    const room_no = RoomNo[building][room];
    if (!room_no) throw new Error(`${building} ${room} is not defined`);
    const roomSelector = `#ys_roomlist > form > table > tbody > tr > td:nth-child(1) > input[value="${room_no}"]`;
    await page.waitForSelector(roomSelector);
    await page.click(roomSelector);

    // wait for page load & booking status to appear.
    await page.waitForSelector("#ys_timetable");
    await page.waitForResponse((res) => res.url().includes("act=bookingstatus") && res.ok());

    !fs.existsSync("screenshots") && fs.mkdirSync("screenshots");
    await page.screenshot({
      path: `./screenshots/reservation-${building}-${room}-${format(date, "yyyyMMdd")}.png`,
    });

    // get room reservation info
    const reservations = await page.$$eval(".fc-event", (els) =>
      els.map((el) => {
        const duration = el.querySelector(".fc-event-time")?.textContent;
        const event_name = el.querySelector(".fc-event-title")?.textContent;
        return { event_name, duration };
      })
    );

    return {
      room,
      building,
      date: format(date, "yyyy-MM-dd"),
      reservations,
    };
  };
}

export default ReservationScraper;
