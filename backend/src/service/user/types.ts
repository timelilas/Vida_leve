import { UserEntity } from "../../entity/UserEntity";

export type CreateUserDTO = Pick<UserEntity, "email" | "password">;

export interface UpdateUserDTO
  extends Partial<Omit<UserEntity, "password" | "email" | "id">> {
  id: number;
}
