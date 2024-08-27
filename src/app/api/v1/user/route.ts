import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@todo/app/api/lib";
import { ErrorHandler, errorResponse } from "@todo/utils";
import { authenticateUser } from "../../helper";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectToMongoDB();

    const user = authenticateUser(request);

    if (!user) {
      response.cookies.set("authToken", "", { expires: new Date(0) });
      throw new ErrorHandler("User not found", 404);
    }

    // Return user data
    return NextResponse.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return errorResponse("Invalid token", 401);
  }
}
