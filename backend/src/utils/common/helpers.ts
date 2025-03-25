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
