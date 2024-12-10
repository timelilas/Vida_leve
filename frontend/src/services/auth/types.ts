import { ProgressProps } from "../../@core/entities/progress/progress";
import { UserProps } from "../../@core/entities/user/user";

export interface HttpSignupDTO extends Pick<UserProps, "email" | "password"> {
  passwordConfirmation: string;
}

export interface HttpLoginDTO extends Pick<UserProps, "email" | "password"> {
  email: string;
  password: string;
}

export type HttpUpdateProfileDTO = Pick<
  UserProps,
  "name" | "phone" | "birthDate" | "gender"
>;

export type HttpCreateProgressDTO = Omit<ProgressProps, "id">;
