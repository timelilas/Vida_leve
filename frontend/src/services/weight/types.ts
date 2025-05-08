interface WeightRecordOutput {
  id: number;
  date: string;
  weight: number;
}

export interface HttpGetWeightHistoryInputDTO {
  limit: number;
  offset: number;
}

export interface HttpGetWeightHistoryOutputDTO {
  weights: WeightRecordOutput[];
  hasMore: boolean;
}

export interface HttpDeleteWeightInputDTO {
  id: number;
}

export interface HttpAddWeightInputDTO {
  date: string;
  weight: number;
}

export type HttpAddWeightOutputDTO = WeightRecordOutput;
