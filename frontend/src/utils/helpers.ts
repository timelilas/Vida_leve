import { DateData } from "../components/dayPicker/types";

export function toCapitalized(input: string): string {
  const words = input.split("-");
  const capitalizedWords = words.map((word) => {
    return `${word[0].toUpperCase()}${word.slice(1).toLocaleLowerCase()}`;
  }, "");
  return capitalizedWords.join("-");
}

export function numberToMonth(number: number): string {
  return Intl.DateTimeFormat("pt-br", { month: "long" }).format(
    new Date().setMonth(number - 1)
  );
}

export function dateToPTBR(date: Date) {
  const day = `0${date.getUTCDate()}`.slice(-2);
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function formatDateToISO(date: string) {
  const [day, month, year] = date.split("/");
  const sanitizedDay = day === "29" && month === "02" ? "28" : day;
  return `${year}-${month}-${sanitizedDay}`;
}

export function getMonthNameFromIndex(index: number) {
  if (index < 0) {
    return "";
  }

  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  return monthNames[index] || "";
}

export function getWeekdayFromIndex(index: number) {
  if (index < 0) {
    return "";
  }

  const weekdays = [
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "domingo",
  ];

  return weekdays[index] || "";
}

export function convertDateToDateData(date: Date): DateData {
  return {
    id: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    weekDay: date.getDay(),
  };
}
