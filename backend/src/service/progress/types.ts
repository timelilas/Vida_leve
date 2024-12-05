import { ProgressEntity } from "../../@core/entity/progress/ProgressEntity";

export interface UpsertProgressDTO extends Omit<ProgressEntity, "id"> {
  userId: number;
}
