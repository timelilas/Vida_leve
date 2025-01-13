import { UserProps } from "../../@core/entities/user/type";

export interface HttpSignupInputDTO
  extends Pick<UserProps, "email" | "password"> {
  passwordConfirmation: string;
}

export type HttpSignupOutputDTO = Omit<UserProps, "password">;

export interface HttpLoginInputDTO
  extends Pick<UserProps, "email" | "password"> {
  email: string;
  password: string;
}

export interface HttpLoginOutputDTO {
  id: number;
  token: string;
}
