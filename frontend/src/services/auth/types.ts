import { GenderType } from "../../@core/user/user";

export interface HttpSignupDTO {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface HttpLoginDTO {
  email: string;
  password: string;
}

export interface HttpProfileFormDTO {
  name: string;
  phone: string;
  birthDate: string;
  gender: GenderType;
}

export interface HttpProgressFormDTO {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: string;
}
