import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";

export async function PATCH(request: NextRequest) {
  try {
    const { ticketId, title, description, category, dueDate } =
      await request.json();

    if (!ticketId || !title || !category) {
      return errorResponse("Missing required fields", 400);
    }

    // Mock data for the updated ticket
    const updatedTicket = {
      id: ticketId,
      title: title.trim(),
      description: description ? description.trim() : "",
      category: category.trim(),
      dueDate: dueDate
        ? new Date(dueDate).toISOString()
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          id: "mock-history-id-1",
          action: "updated",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Mock response data
    const responseData = {
      status: "success",
      data: updatedTicket,
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
