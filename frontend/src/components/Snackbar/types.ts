export type SnackbarVariant = "success" | "error" | "neutral";

export interface SnackbarProps {
  message: string;
  duration: number;
  variant: SnackbarVariant;
}
