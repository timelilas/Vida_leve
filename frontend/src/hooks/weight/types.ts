import { WeightProps } from "../../@core/entities/weight/type";

export interface WeightHistoryQueryState {
  weights: { id: number; date: string; weight: number }[];
  hasMore: boolean;
}

export type AddWeightParams = Pick<WeightProps, "date" | "weight">;
