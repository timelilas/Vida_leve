export interface AddWeightDTO {
  userId: number;
  weight: number;
  date: Date;
}

export interface GetWeightHistoryDTO {
  userId: number;
  limit: number;
  offset: number;
}

export interface GetWeightByIdDTO {
  userId: number;
  id: number;
}

export interface GetWeightsByDateDTO {
  userId: number;
  from: Date;
  to: Date;
}

export interface DeleteWeightDTO {
  userId: number;
  id: number;
}
