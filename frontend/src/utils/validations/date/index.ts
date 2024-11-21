import { ValidationResult } from "../type";
import { invalidDateFormatMsg, invalidDateMsg } from "./variables";

export function validateDate(datePTBR: string): ValidationResult {
  if (!datePTBR.match(/^([0-9]){2}\/([0-9]){2}\/([0-9]){4}$/)) {
    return { success: false, error: invalidDateFormatMsg };
  }

  const [dayString, monthString, yearString] = datePTBR.split("/");
  const day = parseInt(dayString);
  const month = parseInt(monthString);
  const year = parseInt(yearString);

  if (month < 1 || month > 12) {
    return { success: false, error: invalidDateMsg };
  }

  if (day < 1 || day > new Date(year, month, 0).getDate()) {
    return { success: false, error: invalidDateMsg };
  }

  return { success: true };
}
