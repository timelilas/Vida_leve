import { GenderType } from "../@shared/gender";

export interface UserProps {
  id: number;
  email: string;
  password: string;
  name: string | null;
  phone: string | null; // apenas números, ex: 21999453553
  birthDate: Date | null;
  gender: GenderType | null;
}
