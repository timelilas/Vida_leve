export function getDateFromTimezone(timeZone: string) {
  try {
    const localDateString = new Date().toLocaleDateString("en-CA", {
      timeZone,
    });

    return new Date(localDateString);
  } catch {
    return new Date();
  }
}

export function getDateOnlyFromDate(date: Date) {
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth();
  const utcDay = date.getUTCDate();

  return new Date(utcYear, utcMonth, utcDay);
}
