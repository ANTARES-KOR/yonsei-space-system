import type { Browser } from "puppeteer";
import { URLs } from "../constants";

interface LoginUserProps {
  id: string;
  pw: string;
  browser: Browser;
}

const loginToYonseiSpaceSystem = async ({ browser, id, pw }: LoginUserProps) => {
  const page = await browser.newPage();

  await page.goto(URLs.home);
  await page.waitForSelector("input#ysid.solid", {
    visible: true,
    timeout: 10000,
  });

  await page.$eval(
    "input#ysid.solid",
    (el, id) => {
      (el as HTMLInputElement).value = id;
    },
    id
  );

  await page.$eval(
    "input#yspwd.solid",
    (el, password) => {
      (el as HTMLInputElement).value = password;
    },
    pw
  );

  await page.click("img#ysloginbtn");
  await page.waitForSelector("#ys_memberarea", {
    timeout: 10000,
  });
};

export default loginToYonseiSpaceSystem;
