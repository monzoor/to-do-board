import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler, errorResponse } from "../../utils";

export async function GET(request: NextRequest) {
  try {
    // Calculate dynamic due dates
    const currentDate = new Date();
    const backDate = new Date(currentDate);
    backDate.setDate(currentDate.getDate() - 1);

    const sixHoursLeft = new Date(currentDate);
    sixHoursLeft.setHours(currentDate.getHours() + 6);

    const twoDaysAhead = new Date(currentDate);
    twoDaysAhead.setDate(currentDate.getDate() + 2);

    // Mock categories data with tickets and history
    const categories = [
      {
        id: "mock-category-id-1",
        name: "Mock Category 1",
        description: "Description for Mock Category 1",
        createdAt: currentDate.toISOString(),
        userId: "mock-user-id",
        tickets: [
          {
            id: "mock-ticket-id-1",
            title: "Mock Ticket 1",
            description: "Description for Mock Ticket 1",
            category: "mock-category-id-1",
            dueDate: backDate.toISOString(),
            createdAt: currentDate.toISOString(),
            updatedAt: currentDate.toISOString(),
            history: [
              {
                id: "mock-history-id-1",
                action: "created",
                timestamp: currentDate.toISOString(),
              },
              {
                id: "mock-history-id-2",
                action: "updated",
                timestamp: currentDate.toISOString(),
              },
            ],
          },
          {
            id: "mock-ticket-id-2",
            title: "Mock Ticket 2",
            description: "Description for Mock Ticket 2",
            category: "mock-category-id-1",
            dueDate: sixHoursLeft.toISOString(),
            createdAt: currentDate.toISOString(),
            updatedAt: currentDate.toISOString(),
            history: [
              {
                id: "mock-history-id-3",
                action: "created",
                timestamp: currentDate.toISOString(),
              },
            ],
          },
        ],
      },
      {
        id: "mock-category-id-2",
        name: "Mock Category 2",
        description: "Description for Mock Category 2",
        createdAt: currentDate.toISOString(),
        userId: "mock-user-id",
        tickets: [
          {
            id: "mock-ticket-id-3",
            title: "Mock Ticket 3",
            description: "Description for Mock Ticket 3",
            category: "mock-category-id-2",
            dueDate: twoDaysAhead.toISOString(),
            createdAt: currentDate.toISOString(),
            updatedAt: currentDate.toISOString(),
            history: [
              {
                id: "mock-history-id-4",
                action: "created",
                timestamp: currentDate.toISOString(),
              },
            ],
          },
        ],
      },
    ];

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
      createdAt: new Date().toISOString(),
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
