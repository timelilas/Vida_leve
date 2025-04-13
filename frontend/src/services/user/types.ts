import { GenderType } from "../../@core/entities/@shared/gender/type";

export interface HttpGetUserProfileOutputDTO {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  gender: GenderType | null;
  birthDate: string | null;
  registrationDate: string;
}

export interface HttpUpdateUserProfileOutputDTO {
  id: number;
  email: string;
  name: string;
  phone: string;
  gender: GenderType;
  birthDate: string;
  registrationDate: string;
}

export interface HttpUpdateUserProfileInputDTO {
  name: string;
  phone: string;
  gender: GenderType;
  birthDate: Date;
}
