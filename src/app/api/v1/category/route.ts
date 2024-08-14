import { connectToMongoDB } from "@todo/app/api/lib";
import Category from "@todo/app/api/model/category/category.modal";
import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, withAuth } from "@todo/helper";
import { ErrorHandler, errorResponse } from "@todo/utils";

const createCategory = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request);

    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const { name, description } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      throw new ErrorHandler(
        "Name is required and must be a non-empty string",
        400,
      );
    }

    if (
      description &&
      (typeof description !== "string" || description.trim().length === 0)
    ) {
      throw new ErrorHandler(
        "Description, if provided, must be a non-empty string",
        400,
      );
    }

    const newCategory = new Category({
      name: name.trim(),
      description: description ? description.trim() : "",
      createdAt: new Date(),
    });

    const savedCategory = await newCategory.save();

    return NextResponse.json({
      status: "success",
      data: savedCategory,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
};

const getCategories = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request);

    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
};

export const POST = withAuth(createCategory);
export const GET = withAuth(getCategories);
