import { NextRequest } from "next/server";
import { getUserIdFromToken, User } from "./get-user-id-from-token";
import { ErrorHandler } from "../../utils";

export const authenticateUser = (request: NextRequest): User => {
  // Extract token from Authorization header
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ErrorHandler("Authorization token missing or malformed", 401);
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new ErrorHandler("Unauthorized", 401);
  }

  const user = getUserIdFromToken(token);

  if (!user) {
    throw new ErrorHandler("Invalid token", 401);
  }

  return user;
};
