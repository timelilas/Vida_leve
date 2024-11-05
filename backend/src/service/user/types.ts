import { UserEntity } from "../../entity/UserEntity";

export type CreateUserDTO = Pick<UserEntity, "userName" | "email" | "senha">

export interface UpdateUserDTO extends Partial<Omit<UserEntity, "senha" | "email" | "id">>{
  id: number
}