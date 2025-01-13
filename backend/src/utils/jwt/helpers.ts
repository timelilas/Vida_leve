import * as jwt from "jsonwebtoken";
import { Payload } from "./types";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (payload: Payload): string => {
  const token = jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1y",
    notBefore: 0,
  });
  return token;
};

export const verifyToken = (token: string): Payload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    return decoded as Payload;
  } catch {
    return null;
  }
};
