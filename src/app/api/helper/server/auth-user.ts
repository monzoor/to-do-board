import { NextRequest } from "next/server";
import { ErrorHandler } from "@todo/utils";
import { getUserIdFromToken } from "./get-user-id-from-token";

export const authenticateUser = (request: NextRequest): string => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ErrorHandler("Unauthorized", 401);
  }

  const userId = getUserIdFromToken(token);

  if (!userId) {
    throw new ErrorHandler("Invalid token", 401);
  }

  return userId;
};
