import { ProgressProps } from "../../@core/entities/progress/type";

export type HttpCreateProgressInputDTO = Omit<
  ProgressProps,
  "currentCaloriePlan"
>;
