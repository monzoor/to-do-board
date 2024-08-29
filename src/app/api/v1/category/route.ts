import { connectToMongoDB } from "@todo/app/api/lib";
import Category from "@todo/app/api/model/category/category.modal";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";
import { authenticateUser, withAuth } from "../../helper";
import { validateSchema } from "../../utils/validation/schema-validation";
import { createCategoryValidationSchema } from "../../validation-schema/create-category-validation-schema";

const createCategory = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request)?.userId;

    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const requestBody = await request.json();
    const validationResponse = await validateSchema(
      createCategoryValidationSchema,
      requestBody,
    );
    if (!validationResponse.isValid) {
      return validationResponse.response;
    }

    const { name, description } = requestBody;

    const newCategory = new Category({
      name: name.trim(),
      description: description ? description.trim() : "",
      createdAt: new Date(),
      userId: userId, // Ensure category is associated with the authenticated user
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

    const userId = authenticateUser(request)?.userId;

    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const categories = await Category.find({ userId: userId }).sort({
      createdAt: 1,
    });

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
