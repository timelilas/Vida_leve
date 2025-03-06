import { GenderType } from "../../@core/entities/@shared/gender/type";
import { UserProps } from "../../@core/entities/user/type";

export interface UserQueryState
  extends Pick<UserProps, "id" | "email" | "name" | "gender" | "phone"> {
  birthDate: string | null;
}

export interface UpdateUserProfileParams {
  name: string;
  phone: string;
  gender: GenderType;
  birthDate: Date;
}
