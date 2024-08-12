import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@todo/lib";
import Ticket from "@todo/model/ticket/ticket.model";
import { authenticateUser, getUserIdFromToken, withAuth } from "@todo/helper";
import Category from "@todo/model/category/category.modal";
import { Schema } from "mongoose";
import History from "@todo/model/history/history.modal";
import { IHistory } from "@todo/types/history";
import { ErrorHandler, errorResponse } from "@todo/utils";

const createTicket = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request);

    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const { title, description, category, history = [] } = await request.json();

    // Fetch the category details
    const categoryDoc = await Category.findById(category).exec();
    if (!categoryDoc) {
      throw new ErrorHandler("Category not found", 404);
    }

    // Create the new history entry
    const historyEntry: IHistory = {
      userId,
      previousCategory: "", // Set to an empty string if this is the initial creation
      newCategory: categoryDoc.name,
      historyDate: new Date(),
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
      history: [historyEntry, ...history], // Add the new history entry and existing history
      createdAt: new Date(),
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
            history: savedTicket.history,
            category: savedTicket.category,
            createdAt: savedTicket.createdAt,
          },
        },
      },
      { new: true },
    );

    return NextResponse.json({
      message: "Ticket created successfully",
      ticket: savedTicket,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
};

export const POST = withAuth(createTicket);
