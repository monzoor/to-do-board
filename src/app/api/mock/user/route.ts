import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";

export async function GET(request: NextRequest) {
  try {
    // Mock user data
    const user = {
      id: "mock-user-id",
      userId: "mock-user-id",
      name: "Mock User",
      email: "user1@user.com",
    };

    // Return mock user data
    return NextResponse.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
}
