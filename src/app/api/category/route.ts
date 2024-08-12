import { connectToMongoDB } from "@todo/lib";
import Category from "@todo/model/category/category.modal";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@todo/helper";

const createCategory = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const { name, description } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Name is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (
      description &&
      (typeof description !== "string" || description.trim().length === 0)
    ) {
      return NextResponse.json(
        { message: "Description, if provided, must be a non-empty string" },
        { status: 400 },
      );
    }

    const newCategory = new Category({
      name: name.trim(),
      description: description ? description.trim() : "",
      createdAt: new Date(),
    });

    const savedCategory = await newCategory.save();

    return NextResponse.json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

const getCategories = async (req: NextRequest) => {
  try {
    await connectToMongoDB();

    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

export const POST = withAuth(createCategory);
export const GET = withAuth(getCategories);
