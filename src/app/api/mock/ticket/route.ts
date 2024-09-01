import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, dueDate } = await request.json();

    if (!title || !category) {
      return errorResponse("Missing required fields", 400);
    }

    // Mock data for the created ticket
    const newTicket = {
      id: "mock-ticket-id",
      title: title.trim(),
      description: description ? description.trim() : "",
      category: category.trim(),
      dueDate: dueDate
        ? new Date(dueDate).toISOString()
        : new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          id: "mock-history-id-1",
          action: "created",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Mock response data
    const responseData = {
      status: "success",
      data: newTicket,
    };

    // Return mock response data
    return NextResponse.json(responseData);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
}
