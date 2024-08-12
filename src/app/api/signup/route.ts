import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import User from "@todo/model/user/user.model";
import { connectToMongoDB } from "@todo/lib";

export async function POST(request: NextRequest) {
  try {
    await connectToMongoDB();

    const { username, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "365d" },
    );

    return NextResponse.json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
