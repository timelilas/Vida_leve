import { UserProps } from "../../@core/entities/user/type";

interface UserProfileData extends Omit<UserProps, "password" | "birthDate"> {
  birthDate: string | null;
}

export type HttpGetProfileOutputDTO = UserProfileData;

export type HttpUpdateProfileOutputDTO = UserProfileData;

export type HttpUpdateProfileInputDTO = Pick<
  UserProps,
  "name" | "phone" | "birthDate" | "gender"
>;
