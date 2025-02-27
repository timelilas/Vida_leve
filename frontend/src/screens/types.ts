type ValidationResult = { success: true } | { success: false; error: string };

export interface ErrorState<Fields> {
  field?: Fields;
  message?: string;
}

export type Validator = (data: any) => ValidationResult;
