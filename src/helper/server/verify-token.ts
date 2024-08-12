import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const verifyToken = (
  request: NextRequest,
): { userId: string } | null => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { userId: string };
    return decodedToken;
  } catch (error) {
    return null;
  }
};
