import { ProgressEntity } from "../../entity/ProgressEntity"

export interface CreateProgressDTO extends Omit<ProgressEntity, "id">{
  userId: number
}