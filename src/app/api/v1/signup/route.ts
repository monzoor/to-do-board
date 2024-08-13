import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import User from "@todo/app/api/model/user/user.model";
import { connectToMongoDB } from "@todo/lib";
import { ErrorHandler, errorResponse } from "@todo/utils";

export async function POST(request: NextRequest) {
  try {
    await connectToMongoDB();

    const { username, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorHandler("Email already exists", 400);
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "365d" },
    );

    return NextResponse.json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
}
