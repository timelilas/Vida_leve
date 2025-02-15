import { DateInput } from "./Date";
import { DefaultInput } from "./Default";
import { PasswordInput } from "./Password";

export const Input = DefaultInput as typeof DefaultInput & {
  Date: typeof DateInput;
  Password: typeof PasswordInput;
};

Input.Date = DateInput;
Input.Password = PasswordInput;
