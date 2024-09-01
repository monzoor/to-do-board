import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email !== "user1@user.com" || password !== "password") {
    throw new ErrorHandler("Invalid credentials", 401);
  }
  const data = {
    token: "mock-token-123456",
    user: {
      id: "mock-user-id",
      name: "Mock User",
      email: "mockuser@example.com",
    },
  };

  try {
    return NextResponse.json({
      status: "success",
      data,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
}
