import jwt from "jsonwebtoken";

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    return decoded.userId;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
