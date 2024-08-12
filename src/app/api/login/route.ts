import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@todo/model/user/user.model";
import { connectToMongoDB } from "@todo/lib";

export async function POST(request: NextRequest) {
  try {
    await connectToMongoDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
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
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
