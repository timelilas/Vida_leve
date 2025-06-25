import { GenderType } from "../../@core/entities/@shared/gender/type";
import { UserProps } from "../../@core/entities/user/type";

interface SetProfileImageMOBILE {
  platform: "mobile";
  data: { name: string; uri: string; type: string };
}

interface SetProfileImageWEB {
  platform: "web";
  data: File;
}

export type SetProfileImageParams = SetProfileImageMOBILE | SetProfileImageWEB;

export interface UserQueryState
  extends Pick<UserProps, "id" | "email" | "name" | "gender" | "phone" | "imageUrl"> {
  birthDate: string | null;
  registrationDate: string;
}

export interface UpdateUserProfileParams {
  name: string;
  phone: string;
  gender: GenderType;
  birthDate: Date;
}
