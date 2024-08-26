import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./verify-token";

export const withAuth = (
  handler: (request: NextRequest) => Promise<NextResponse>,
) => {
  return async (request: NextRequest) => {
    const token = verifyToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // request.headers.set("userId", token.userId);
    return handler(request);
  };
};
