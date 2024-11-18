import { useState } from "react";
import { ErrorState, Validator } from "../screens/types";

export function useForm<T extends Record<string, any>>(initialState: T) {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState<ErrorState<keyof T>>({});
  const [isLoading, setIsLoading] = useState(false);

  function validateField(field: keyof T, value: any, validator: Validator) {
    const validationResult = validator(value);

    if (!validationResult.success && (error.field === field || !error.field)) {
      const error = validationResult.error;
      return setError({ message: error, field });
    }

    if (validationResult.success && error.field === field) {
      return setError({});
    }
  }

  function handleChange(field: keyof T, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return {
    data: { values, error, isLoading },
    setError,
    setIsLoading,
    handleChange,
    validateField,
  };
}
