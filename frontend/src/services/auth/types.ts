import { UserProps } from "../../@core/entities/user/type";

export interface HttpSignupInputDTO {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type HttpSignupOutputDTO = Omit<UserProps, "password">;

export interface HttpLoginInputDTO {
  email: string;
  password: string;
}

export interface HttpLoginOutputDTO {
  id: number;
  token: string;
}
