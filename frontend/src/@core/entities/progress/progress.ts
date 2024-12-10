export type ActitivyFrequency = "pouca" | "leve" | "moderada" | "intensa";

export interface ProgressProps {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActitivyFrequency;
}
