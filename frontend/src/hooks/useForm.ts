import { useState } from "react";
import { ErrorState, Validator } from "../screens/types";

type GeneralFields = "connection";

export function useForm<T extends Record<string, any>>(initialState: T) {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState<ErrorState<keyof T | GeneralFields>>({});
  const [isSubmitting, setisSubmitting] = useState(false);

  function validateField(field: keyof T, value: any, validator: Validator) {
    const validationResult = validator(value);

    if (!validationResult.success) {
      if (error.field === field || !error.field) {
        return setError({ message: validationResult.error, field });
      }
    }

    if (validationResult.success && error.field === field) {
      return setError({});
    }
  }

  function handleChange<K extends keyof T>(field: K, value: T[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return {
    data: { values, error, isSubmitting },
    setError,
    handleChange,
    validateField,
    setisSubmitting,
  };
}
