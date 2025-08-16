import { getLocalDateOnly } from "../../utils/helpers";
import { DateData } from "./types";

export function createMockedDays(limit: number, startDate?: Date) {
  let mockedDays: DateData[] = [];

  const startDateOnly = startDate ? getLocalDateOnly(startDate) : null;

  const startDateSlice = startDateOnly
    ? new Date(startDateOnly.getTime() - 3600 * 24 * 1000)
    : null;

  for (let i = 0; i < limit; i++) {
    const currentDate = new Date();
    const currentDateOnlySlice = new Date(currentDate.getTime() - 3600 * 24 * 1000 * (-1 + i));

    if (!startDate || (startDateSlice && currentDateOnlySlice >= startDateSlice)) {
      const day = currentDateOnlySlice.getDate();
      const weekDay = currentDateOnlySlice.getDay();
      const month = currentDateOnlySlice.getMonth();
      const year = currentDateOnlySlice.getFullYear();

      const id = `${year}-${month}-${day}`;
      const isoDate = currentDateOnlySlice.toISOString();
      const dateData = { id, day, weekDay, month, year, isoDate };

      mockedDays.push(dateData);
    }
  }

  return mockedDays;
}
