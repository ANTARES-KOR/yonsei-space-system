import { format } from "date-fns";
import { Browser } from "puppeteer";
import { URLs } from "../constants";
import { BuildingUID, ParsedReservation, Reservation, RoomUID } from "../types";
import uniqueBy from "./uniqueBy";
import { omit } from "radash";

export const getUpcomingWeeklyReservation = async (
  browser: Browser,
  option: { numOfWeek: number; building_uid: BuildingUID; room_uid: RoomUID }
): Promise<ParsedReservation[]> => {
  const page = await browser.newPage();

  await page.goto(URLs.weeklyReservation);

  await page.waitForResponse((res) => res.url().includes("act=bookingstatus3") && res.ok());

  // 신촌캠퍼스 선택
  await page.select("#uCampus", "SC");
  // 건물 조회
  await page.select("#uBuilding", option.building_uid.toString());
  // 강의실 선택
  await page.waitForSelector("option[value='" + option.room_uid + "']");
  await page.select("#uRoom", option.room_uid.toString());
  // 조회 버튼 클릭
  await page.click("#ys_memberarea > form > a.button.icon.search");

  const reservations: Reservation[] = [];

  await page.waitForSelector("#calendar");

  for (let i = 0; i < option.numOfWeek; i++) {
    const weeklyBookingStatusResponse = await page.waitForResponse(
      (res) => res.url().includes("act=bookingstatus3") && res.ok()
    );
    const data = await weeklyBookingStatusResponse.json();
    reservations.push(...data);
    await page.click(".fc-button-next");
  }

  page.close();

  const deduplicated_reservations = uniqueBy(reservations, (reservation) => reservation.start);

  const parsedReservations = deduplicated_reservations.map((reservation) => {
    const start_number = parseInt(reservation.start, 10) * 1000;
    const end_number = parseInt(reservation.end, 10) * 1000;
    const date = new Date(start_number);

    return {
      ...omit(reservation, ["start", "end", "color", "textColor"]),
      start: format(new Date(start_number), "HH:mm"),
      end: format(new Date(end_number), "HH:mm"),
      date: format(date, "yyyy-MM-dd"),
    };
  });

  return parsedReservations;
};
