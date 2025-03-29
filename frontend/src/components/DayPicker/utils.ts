import { DateData } from "./types";

export function createMockedDays(count: number) {
  const mockedDays: DateData[] = Array.from({ length: count }, (_, index) => {
    const date = new Date(Date.now() - 3600 * 24 * 1000 * (-1 + index));
    const day = date.getDate();
    const weekDay = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const id = `${year}-${month}-${day}`;

    const dateData = { id, day, weekDay, month, year };
    return dateData;
  });

  return mockedDays;
}
