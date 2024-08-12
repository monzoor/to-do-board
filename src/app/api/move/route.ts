import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@todo/lib";
import { authenticateUser, getUserIdFromToken, withAuth } from "@todo/helper";
import { IHistory } from "@todo/types/history";
import Category from "@todo/model/category/category.modal";
import { Types } from "mongoose";
import { ICategory } from "@todo/types/category";
import { ErrorHandler, errorResponse } from "@todo/utils";

const moveTicket = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request);

    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const { ticketId, newCategoryId } = await request.json();

    if (!ticketId || !newCategoryId) {
      throw new ErrorHandler("Missing required fields", 400);
    }

    const ticketObjectId = new Types.ObjectId(ticketId);
    const newCategoryObjectId = new Types.ObjectId(newCategoryId);

    // Validate ticketId and newCategoryId
    if (!ticketObjectId || !newCategoryObjectId) {
      throw new ErrorHandler("Invalid ticketId or newCategoryId", 400);
    }

    // Fetch the ticket
    const categoryByTicketID = (await Category.findOne({
      "tickets._id": newCategoryObjectId,
    }).exec()) as ICategory;

    if (!categoryByTicketID) {
      throw new ErrorHandler("Ticket not found", 404);
    }

    // Fetch the current and new categories
    const currentCategory = await Category.findById(
      categoryByTicketID._id,
    ).exec();
    const newCategory = await Category.findById(newCategoryObjectId).exec();

    if (!currentCategory) {
      throw new ErrorHandler("Current category not found", 404);
    }

    if (!newCategory) {
      throw new ErrorHandler("New category not found", 404);
    }

    // Create history entry
    const historyEntry: IHistory = {
      userId,
      previousCategory: currentCategory.name,
      newCategory: newCategory.name,
      historyDate: new Date(),
    };

    const ticket = categoryByTicketID.tickets.find(
      (t) => (t._id as Types.ObjectId).toString() === ticketId,
    );

    if (!ticket) {
      throw new ErrorHandler("Ticket not found in the current category", 404);
    }

    ticket?.history.push(historyEntry);

    // Update the current category to remove the ticket
    await Category.findByIdAndUpdate(
      currentCategory._id,
      { $pull: { tickets: { _id: ticketId } } },
      { new: true },
    );

    // Update the new category to include the ticket
    const currentValue = await Category.findByIdAndUpdate(
      newCategoryId,
      {
        $push: {
          tickets: ticket,
        },
      },
      { new: true },
    );

    return NextResponse.json({
      message: "Ticket moved successfully",
      ticket: currentValue,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
};

export const POST = withAuth(moveTicket);
