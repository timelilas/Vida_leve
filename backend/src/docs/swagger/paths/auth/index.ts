import { login } from "./login";
import { signup } from "./signup";

export const authPaths = {
  "/auth/signup": { post: signup },
  "/auth/login": { post: login },
};
