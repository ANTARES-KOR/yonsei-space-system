import type { Browser } from "puppeteer";

interface ReservationScraperProps {
  browser: Browser;
  reservationDate: string;
}

class ReservationScraper {
  private url = "https://space.yonsei.ac.kr/reservation.php?mid=K02";

  scrape = async ({ browser }: ReservationScraperProps) => {
    const page = await browser.newPage();
    await page.goto(this.url);

    await page.waitForSelector("#ys_usersearch");

    await page.$eval("#appDate", (el) => ((el as HTMLInputElement).value = "2022-08-06"));

    // 제4공학관 선택하기
    await page.click("#uBuilding");
    await page.waitForSelector("#uBuilding > option:nth-child(2)");
    await page.select("#uBuilding", "124");

    // 조회하기 버튼 클릭
    await page.click("#ys_usersearch > form > a.button.icon.search");

    // 제4공학관 조회 결과 확인
    await page.waitForResponse((res) => res.url().includes("act=bookingstatus") && res.ok());
    await page.screenshot({ path: "./img/engineer4.png" });
  };
}
