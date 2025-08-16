import { UserProps } from "../../../@core/entities/user/type";

export interface HttpSignupInputDTO {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface HttpSignupOutputDTO
  extends Omit<UserProps, "password" | "registrationDate" | "birthDate"> {
  birthDate: string | null;
  registrationDate: string;
}

export interface HttpLoginInputDTO {
  email: string;
  password: string;
}

export interface HttpLoginOutputDTO {
  id: number;
  token: string;
}
