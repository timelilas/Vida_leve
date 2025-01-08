import { UserEntity } from "../../@core/entity/user/entity";

export type CreateUserDTO = Pick<UserEntity, "email" | "password">;

export interface UpdateUserDTO
  extends Partial<Omit<UserEntity, "password" | "email" | "id">> {
  id: number;
}
