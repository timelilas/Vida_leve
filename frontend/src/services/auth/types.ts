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
  gender: string;
}
