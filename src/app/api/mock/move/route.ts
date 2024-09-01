import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";

export async function POST(request: NextRequest) {
  try {
    const { ticketId, newCategoryId } = await request.json();

    if (!ticketId || !newCategoryId) {
      return errorResponse("Missing required fields", 400);
    }

    // Mock data for the moved ticket
    const movedTicket = {
      id: ticketId,
      title: "Mock Ticket",
      description: "Description for Mock Ticket",
      category: newCategoryId,
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          id: "mock-history-id-1",
          action: "moved",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Mock response data
    const responseData = {
      status: "success",
      data: movedTicket,
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
