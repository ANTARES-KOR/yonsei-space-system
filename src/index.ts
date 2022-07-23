import puppeteer from "puppeteer";
import { YONSEI_STUDENT_ID, YONSEI_STUDENT_PW } from "./config";
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

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};

yonseiSpaceCrawler();
