import { useState } from "react";
import { ErrorState, Validator } from "../screens/types";

interface UseFormParams<T> {
  initialState: T;
}

export function useForm<T extends Record<string, any>>(
  params: UseFormParams<T>
) {
  const [values, setValues] = useState(params.initialState);
  const [error, setError] = useState<ErrorState<keyof T | "all">>({});
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  function onSubmit(
    handleSubmit: () => void | Promise<void>,
    handleError: (error: Error) => void
  ) {
    return async () => {
      if (isSubmitting) return;

      setisSubmitting(true);
      setError({});

      try {
        await handleSubmit();
        setIsFormDirty(false);
      } catch (error: any) {
        handleError(error);
      } finally {
        setisSubmitting(false);
      }
    };
  }

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
    setIsFormDirty(true);
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return {
    data: { values, error, isSubmitting, isFormDirty },
    setError,
    handleChange,
    validateField,
    onSubmit,
  };
}
