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
    const currentDateOnly = getLocalDateOnly(currentDate);
    const currentDateOnlySlice = new Date(
      currentDateOnly.getTime() - 3600 * 24 * 1000 * (-1 + i)
    );

    if (!startDate || (startDateSlice && currentDateOnlySlice >= startDateSlice)) {
      const day = currentDateOnlySlice.getUTCDate();
      const weekDay = currentDateOnlySlice.getUTCDay();
      const month = currentDateOnlySlice.getUTCMonth();
      const year = currentDateOnlySlice.getUTCFullYear();
      const id = `${year}-${month}-${day}`;
      const dateData = { id, day, weekDay, month, year };

      mockedDays.push(dateData);
    }
  }

  return mockedDays;
}
