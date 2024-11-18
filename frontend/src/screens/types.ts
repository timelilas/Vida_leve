import { ValidationResult } from "../utils/validations/type";

export interface ErrorState<Fields> {
  field?: Fields;
  message?: string;
}

export type Validator = (data: any) => ValidationResult;
