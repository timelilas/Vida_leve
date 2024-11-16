export interface UserEntity {
  id: number;
  email: string;
  password: string;
  name: string | null;
  phone: string | null;
  birthDate: Date | null;
  gender: "masculino" | "feminino" | null;
}
