import { GenderType } from "../../@core/entities/@shared/gender/type";

export interface ProfileFormData {
  name: string;
  phone: string;
  birthDate: string;
  gender: GenderType | null;
}

export interface ProfileFormSubmitData {
  name: string;
  phone: string;
  birthDate: Date;
  gender: GenderType;
}
