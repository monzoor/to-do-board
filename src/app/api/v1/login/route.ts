import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@todo/app/api/model/user/user.model";
import { connectToMongoDB } from "@todo/app/api/lib";
import { ErrorHandler, errorResponse } from "@todo/utils";

export async function POST(request: NextRequest) {
  try {
    await connectToMongoDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorHandler("Invalid credentials", 401);
    }

    // Create JWT and send response
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "365d",
      },
    );

    return NextResponse.json({
      status: "success",
      data: {
        token,
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
