import type { Browser } from "puppeteer";
import { BuildingName, BuildingNumber, URLs } from "../constants";
import { format } from "date-fns";

interface ReservationScraperProps {
  date: Date;
  building: BuildingName;
}

class ReservationScraper {
  private _url = URLs.reservation;
  private browser: Browser;

  constructor({ browser }: { browser: Browser }) {
    this.browser = browser;
  }

  scrape = async ({ date, building }: ReservationScraperProps) => {
    const page = await this.browser.newPage();
    await page.goto(this._url);

    await page.waitForSelector("#ys_usersearch");

    await page.$eval(
      "#appDate",
      (el, reservation_date) => ((el as HTMLInputElement).value = reservation_date),
      format(date, "yyyy-MM-dd")
    );

    // 제4공학관 선택하기
    await page.select("#uBuilding", BuildingNumber[building].toString());

    // 조회하기 버튼 클릭
    await page.click("#ys_usersearch > form > a.button.icon.search");

    // 제4공학관 Response 가져오기
    await page.waitForResponse((res) => res.url().includes("act=bookingstatus") && res.ok());

    await page.screenshot({
      path: `./screenshots/reservation_${building}_${format(date, "yyyy-MM-dd")}.png`,
    });
  };
}

export default ReservationScraper;
