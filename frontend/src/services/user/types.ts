import { GenderType } from "../../@core/entities/@shared/gender/type";

export interface HttpGetUserProfileOutputDTO {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  gender: GenderType | null;
  birthDate: string | null;
  imageUrl: string | null;
  registrationDate: string;
}

export interface HttpUpdateUserProfileOutputDTO {
  id: number;
  email: string;
  name: string;
  phone: string;
  gender: GenderType;
  birthDate: string;
  imageUrl: string | null;
  registrationDate: string;
}

export interface HttpUpdateUserProfileInputDTO {
  name: string;
  phone: string;
  gender: GenderType;
  birthDate: Date;
}

export interface HttpSetProfileImageInputDTO {
  data: { name: string; uri: string; type: string } | File;
}

export interface HttpSetProfileImageOutputDTO {
  imageUrl: string;
}
