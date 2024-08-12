import { NextRequest } from "next/server";
import { getUserIdFromToken } from "@todo/helper";
import { ErrorHandler } from "@todo/utils";

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
