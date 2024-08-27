import jwt from "jsonwebtoken";
import { ErrorHandler } from "../../utils";

export interface User {
  userId: string;
  id: string;
}

export const getUserIdFromToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    const userData = {
      ...decoded,
      id: decoded?.userId,
    };
    return userData;
  } catch (error) {
    throw new ErrorHandler("Invalid token", 401);
  }
};
