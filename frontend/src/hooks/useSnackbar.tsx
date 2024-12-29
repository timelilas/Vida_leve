import { useState } from "react";
import { Snackbar, SnackbarVariant } from "../components/snackbar/Snackbar";
import { Text } from "react-native";

interface SnackbarState {
  id: number | string;
  duration: number;
  message: string;
  visible: boolean;
  variant: SnackbarVariant;
}

type SnackbarOptions = Pick<SnackbarState, "message" | "variant" | "duration">;

export function useSnackbar() {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    id: 0,
    duration: 0,
    message: "",
    visible: false,
    variant: "neutral",
  });

  function showSnackbar(options: SnackbarOptions) {
    setSnackbarState({ visible: true, id: Date.now(), ...options });
  }

  function renderSnackbar() {
    if (!snackbarState.visible) return null;

    return (
      <Snackbar
        key={snackbarState.id}
        duration={snackbarState.duration}
        message={snackbarState.message}
        variant={snackbarState.variant}
      />
    );
  }

  return {
    showSnackbar,
    Snackbar: renderSnackbar,
  };
}
