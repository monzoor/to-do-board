import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";
import {
  initialCategoryData,
  movedTicketFromCategory1ToCategory2,
} from "../data/initial-category-data";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // get moved cookie
    const cookieStore = cookies();
    const hasMoved = cookieStore.get("moved");

    // Mock categories data with tickets and history
    const categories = !hasMoved
      ? initialCategoryData
      : movedTicketFromCategory1ToCategory2;

    // Return mock categories data
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
}

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();

    // Mock category data
    const newCategory = {
      id: "mock-category-id",
      name: name.trim(),
      description: description ? description.trim() : "",
      createdAt: new Date(),
      userId: "mock-user-id",
      tickets: [],
    };

    // Return mock category data
    return NextResponse.json({
      status: "success",
      data: newCategory,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
}
