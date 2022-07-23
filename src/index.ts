import puppeteer from "puppeteer";
import { YONSEI_STUDENT_ID, YONSEI_STUDENT_PW } from "./config";
import ReservationScraper from "./scrapers/ReservationScraper";
import { loginToYonseiSpaceSystem } from "./utils";

const yonseiSpaceCrawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    await loginToYonseiSpaceSystem({
      browser,
      id: YONSEI_STUDENT_ID,
      pw: YONSEI_STUDENT_PW,
    });

    const resevationScraper = new ReservationScraper({ browser });

    await resevationScraper.scrape({
      building: "Engineering_1",
      date: new Date("2022-08-06"),
    });

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};

yonseiSpaceCrawler();
