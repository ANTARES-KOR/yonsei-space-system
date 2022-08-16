import puppeteer from "puppeteer";
import loginToYonseiSpaceSystem from "./loginToYonseiSpaceSystem";
import { YONSEI_STUDENT_ID, YONSEI_STUDENT_PW } from "../../core/config";

export const handleLogin = async (id: string, pw: string) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    await loginToYonseiSpaceSystem({
      browser,
      id,
      pw,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
