import { ProgressEntity } from "../../@core/entity/progress/ProgressEntity";

export interface CreateProgressDTO extends Omit<ProgressEntity, "id"> {
  userId: number;
}

export interface UpsertProgressDTO extends Omit<ProgressEntity, "id"> {
  userId: number;
}
