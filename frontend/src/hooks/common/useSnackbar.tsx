import { useCallback, useState } from "react";
import { Snackbar } from "../../components/Snackbar/Index";
import { SnackbarVariant } from "../../components/Snackbar/types";

interface SnackbarState {
  id: number | string;
  message: string;
  duration: number;
  variant: SnackbarVariant;
  isVisible: boolean;
}

type SnackbarOptions = Pick<SnackbarState, "message" | "variant" | "duration"> & {
  id?: number;
};

export function useSnackbar() {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    id: 0,
    duration: 0,
    message: "",
    variant: "neutral",
    isVisible: false
  });

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    setSnackbarState({ id: `${Date.now()}`, ...options, isVisible: true });
  }, []);

  const closeAllSnackbars = useCallback(() => {
    setSnackbarState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  const renderSnackbar = useCallback(() => {
    return (
      <Snackbar
        key={snackbarState.id}
        isVisible={snackbarState.isVisible}
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
    snackbarState.isVisible
  ]);

  return {
    showSnackbar,
    closeAllSnackbars,
    Snackbar: renderSnackbar
  };
}
