import { UserEntity } from "../../@core/entity/user/UserEntity";

export type CreateUserDTO = Pick<UserEntity, "email" | "password">;

export interface UpdateUserDTO
  extends Partial<Omit<UserEntity, "password" | "email" | "id">> {
  id: number;
}
