import { DateData } from "./types";

export const mockedDays: DateData[] = new Array(3650)
  .fill(null)
  .map((_, index) => {
    const date = new Date(Date.now() - 3600 * 24 * 1000 * (-1 + index));
    const day = date.getDate();
    const weekDay = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const id = `${day}-${month}-${year}`;

    const dateData = { id, day, weekDay, month, year };
    return dateData;
  });
