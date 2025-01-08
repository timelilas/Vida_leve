import { useCallback, useState } from "react";
import { Snackbar, SnackbarVariant } from "../components/snackbar/Snackbar";

interface SnackbarState {
  id: number | string;
  message: string;
  duration: number;
  variant: SnackbarVariant;
}

type SnackbarOptions = Pick<SnackbarState, "message" | "variant" | "duration">;

export function useSnackbar() {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    id: 0,
    duration: 0,
    message: "",
    variant: "neutral",
  });

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    setSnackbarState({ id: Date.now(), ...options });
  }, []);

  const renderSnackbar = useCallback(() => {
    return (
      <Snackbar
        key={snackbarState.id}
        duration={snackbarState.duration}
        message={snackbarState.message}
        variant={snackbarState.variant}
      />
    );
  }, [
    snackbarState.id,
    snackbarState.duration,
    snackbarState.message,
    snackbarState.variant,
  ]);

  return {
    showSnackbar,
    Snackbar: renderSnackbar,
  };
}
