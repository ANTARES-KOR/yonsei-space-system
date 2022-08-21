import { nextSaturday } from "date-fns";

// TODO : KR locale 사용.
const getUpcomingSaturDays = (): Date[] => {
  const saturdays: Date[] = [];

  const current_datestring = new Date().toLocaleDateString();

  let target_date = new Date(current_datestring);

  while (saturdays.length < 2) {
    target_date = nextSaturday(target_date);
    saturdays.push(target_date);
  }

  return saturdays;
};

export default getUpcomingSaturDays;
