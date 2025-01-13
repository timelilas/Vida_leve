import { UserProps } from "../../@core/entities/user/type";

export interface HttpUpdateProfileOutputDTO
  extends Omit<UserProps, "password" | "birthDate"> {
  birthDate: string;
}

export type HttpUpdateProfileInputDTO = Pick<
  UserProps,
  "name" | "phone" | "birthDate" | "gender"
>;
