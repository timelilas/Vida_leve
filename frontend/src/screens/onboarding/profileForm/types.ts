import { GenderType } from "../../../@core/entities/@shared/gender";

export interface ProfileFormData {
  name: string;
  phone: string;
  birthDate: string;
  gender: GenderType | null;
}
