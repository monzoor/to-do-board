import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@todo/app/api/model/user/user.model";
import { connectToMongoDB } from "@todo/app/api/lib";
import { ErrorHandler, errorResponse } from "@todo/utils";

export async function GET(request: NextRequest) {
  try {
    await connectToMongoDB();

    // Extract token from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse("Authorization token missing or malformed", 401);
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    if (!decoded.userId) {
      return errorResponse("Invalid token", 401);
    }

    // Fetch the user data from the database
    const user = await User.findById(decoded.userId).exec();
    if (!user) {
      return errorResponse("User not found", 404);
    }

    // Return user data
    return NextResponse.json({
      status: "success",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.username, // Include any other user fields you want to return
        },
      },
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
}
