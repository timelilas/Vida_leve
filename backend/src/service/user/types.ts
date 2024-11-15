import { UserEntity } from "../../entity/UserEntity";

export type CreateUserDTO = Pick<UserEntity, "name" | "email" | "password">;

export interface UpdateUserDTO
  extends Partial<Omit<UserEntity, "password" | "email" | "id">> {
  id: number;
}
