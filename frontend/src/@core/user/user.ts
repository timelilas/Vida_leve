import { GenderType } from "../common/gender";

export interface UserProps {
  id: number;
  email: string;
  password: string;
  name: string | null;
  phone: string | null;
  birthDate: Date | null;
  gender: GenderType | null;
}
