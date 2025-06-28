export type SnackbarVariant = "success" | "error" | "warning" | "neutral";

export interface SnackbarProps {
  message: string;
  duration: number;
  variant: SnackbarVariant;
  isVisible: boolean;
}
