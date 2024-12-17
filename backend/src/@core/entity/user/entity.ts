import { Gender } from "../@shared";

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  name: string | null;
  phone: string | null;
  birthDate: Date | null;
  gender: Gender | null;
}
