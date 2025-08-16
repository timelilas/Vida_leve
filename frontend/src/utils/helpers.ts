import { MealType } from "../@core/entities/@shared/mealType/type";
import { DateIntervalType, PlainDate } from "../@types";
import { DateData } from "../components/DayPicker/types";
import mime from "mime";

export function toCapitalized(input: string): string {
  const words = input.split("-");
  const capitalizedWords = words.map((word) => {
    return `${word[0].toUpperCase()}${word.slice(1).toLocaleLowerCase()}`;
  }, "");
  return capitalizedWords.join("-");
}

export function numberToMonthName(number: number): string {
  return Intl.DateTimeFormat("pt-br", { month: "long" }).format(
    new Date().setMonth(number - 1)
  );
}

export function dateToPTBR(date: Date, options?: { year?: "2-digits" | "full" }) {
  const day = `0${date.getUTCDate()}`.slice(-2);
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const year =
    options?.year === "2-digits"
      ? `${date.getUTCFullYear()}`.slice(-2)
      : date.getUTCFullYear();

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
    "dezembro"
  ];

  return monthNames[index] || "";
}

export function getWeekdayFromIndex(index: number) {
  if (index < 0) {
    return "";
  }

  const weekdays = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado"
  ];

  return weekdays[index] || "";
}

export function convertDateToLocalDateData(date: Date): DateData {
  return {
    id: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    weekDay: date.getDay(),
    isoDate: date.toISOString()
  };
}

export function formatDateToLabel(date: Date, type: "long" | "short") {
  const day = date.getUTCDate();
  const weekDay = date.getUTCDay();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const formattedDay = `0${day}`.slice(-2);
  const weekdayName = toCapitalized(getWeekdayFromIndex(weekDay)).split("-")[0];
  const monthName = toCapitalized(getMonthNameFromIndex(month)).slice(0, 3);

  if (type === "short") {
    return `${weekdayName}, ${formattedDay} ${monthName.toUpperCase()} - ${year}`;
  }

  return `${weekdayName}, ${formattedDay} de ${monthName} - ${year}`;
}

export function transformFoodNameIntoSlug(name: string) {
  if (!name.length) {
    return "";
  }

  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]|\,/g, "")
    .replace(/\s\-\s/g, "-")
    .replace(/\s/g, "-");
}

export function getTitleFromMealType(type: MealType | null) {
  switch (type) {
    case "cafe-da-manha":
      return "Café da manhã";
    case "lanche":
      return "Lanche";
    case "almoco":
      return "Almoço";
    case "jantar":
      return "Jantar";
    case "outro":
      return "Outros";
    default:
      return "";
  }
}

export function generateLocalDateRange(
  intervalType: DateIntervalType,
  dateData: PlainDate | Date
) {
  const { day, month, weekDay, year } =
    dateData instanceof Date
      ? {
          year: dateData.getFullYear(),
          month: dateData.getMonth(),
          day: dateData.getDate(),
          weekDay: dateData.getDay()
        }
      : dateData;

  return intervalType === "monthly"
    ? {
        from: new Date(year, month, 1),
        to: new Date(year, month + 1, 0)
      }
    : {
        from: new Date(year, month, day - weekDay),
        to: new Date(year, month, day + 6 - weekDay)
      };
}

export function getLocalDateOnly(date?: Date) {
  const currentDate = date || new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
}

export function parseBase64String(base64: string) {
  const [mimeInfo, data] = base64.split(",");
  const mimeType = mimeInfo.split(";")[0].split(":")[1];
  const extension = mime.getExtension(mimeType);

  return {
    data,
    mimeType,
    extension
  };
}
