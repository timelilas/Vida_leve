import { ProgressProps } from "../../@core/entities/progress/progress";
import { UserProps } from "../../@core/entities/user/user";

export type HttpSignupOutputDTO = Omit<UserProps, "password">;

export interface HttpSignupInputDTO
  extends Pick<UserProps, "email" | "password"> {
  passwordConfirmation: string;
}

export interface HttpLoginInputDTO
  extends Pick<UserProps, "email" | "password"> {
  email: string;
  password: string;
}

export interface HttpLoginOutputDTO {
  id: number;
  token: string;
}

export interface HttpUpdateProfileOutputDTO
  extends Omit<UserProps, "password" | "birthDate"> {
  birthDate: string;
}

export type HttpUpdateProfileInputDTO = Pick<
  UserProps,
  "name" | "phone" | "birthDate" | "gender"
>;
