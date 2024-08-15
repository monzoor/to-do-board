import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@todo/app/api/lib";
import Ticket from "@todo/app/api/model/ticket/ticket.model";
import { authenticateUser, withAuth } from "../../helper";
import Category from "@todo/app/api/model/category/category.modal";
import History from "@todo/app/api/model/history/history.modal";
import { ErrorHandler, errorResponse } from "@todo/utils";

const createTicket = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request);

    if (!userId) {
      return errorResponse("Invalid token", 401);
    }

    const {
      title,
      description,
      category,
      dueDate,
      history = [],
    } = await request.json();

    // Fetch the category details
    const categoryDoc = await Category.findById(category).exec();
    if (!categoryDoc) {
      return errorResponse("Category not found", 404);
    }

    // Create the new history entry
    const historyEntry = {
      userId,
      previousCategory: "", // Set to an empty string if this is the initial creation
      newCategory: categoryDoc.name,
      historyDate: new Date(),
      dueDate, // Add dueDate to history entry
    };

    // Save history entry
    const newHistory = new History(historyEntry);
    await newHistory.save();

    // Create a new ticket
    const newTicket = new Ticket({
      title,
      description,
      assignTo: userId,
      category,
      dueDate, // Add dueDate
      history: [historyEntry, ...history], // Add the new history entry and existing history
      createdAt: new Date(),
      updatedAt: new Date(), // Set updatedAt to current date
    });

    const savedTicket = await newTicket.save();

    // Update the category to include the new ticket details
    await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          tickets: {
            title: savedTicket.title,
            description: savedTicket.description,
            assignTo: savedTicket.assignTo,
            dueDate: savedTicket.dueDate, // Add dueDate to the category tickets
            history: savedTicket.history,
            category: savedTicket.category,
            createdAt: savedTicket.createdAt,
            updatedAt: savedTicket.updatedAt, // Add updatedAt to the category tickets
          },
        },
      },
      { new: true },
    );

    return NextResponse.json({
      status: "success",
      data: savedTicket,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
};

export const POST = withAuth(createTicket);
