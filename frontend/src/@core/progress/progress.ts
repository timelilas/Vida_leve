export type ActitivyFrequency = "pouca" | "leve" | "moderada" | "intensa";

export interface ProgressProps {
  id: number;
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActitivyFrequency;
}
