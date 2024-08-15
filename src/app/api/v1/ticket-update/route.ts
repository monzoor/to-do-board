import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@todo/app/api/lib";
import Ticket from "@todo/app/api/model/ticket/ticket.model";
import { authenticateUser, withAuth } from "@todo/helper";
import Category from "@todo/app/api/model/category/category.modal";
import History from "@todo/app/api/model/history/history.modal";
import { ErrorHandler, errorResponse } from "@todo/utils";
import { Types } from "mongoose";
import { ICategory } from "../../types/category";

const updateTicket = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request);
    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const { ticketId, title, description, category, dueDate } =
      await request.json();

    const ticketObjectId = new Types.ObjectId(ticketId);
    const categoryObjectId = new Types.ObjectId(category);

    const categoryByTicketID = (await Category.findOne({
      "tickets._id": ticketObjectId,
    }).exec()) as ICategory;
    if (!categoryByTicketID) {
      throw new ErrorHandler("Ticket not found", 404);
    }

    const ticket = categoryByTicketID.tickets.find(
      (t) => (t._id as Types.ObjectId).toString() === ticketId,
    );

    if (!ticket) {
      throw new ErrorHandler("Ticket not found in the current category", 404);
    }

    const categoryDoc = await Category.findById(categoryObjectId).exec();
    if (!categoryDoc) {
      throw new ErrorHandler("Category not found", 404);
    }

    const previousCategory = ticket.category;

    // Create the new history entry
    const historyEntry = {
      userId,
      previousCategory: previousCategory.toString(),
      newCategory: categoryDoc.name,
      historyDate: new Date(),
      dueDate: new Date(dueDate),
    };

    // Save history entry
    const newHistory = new History(historyEntry);
    await newHistory.save();

    // Update the ticket
    ticket.title = title;
    ticket.description = description;
    ticket.category = category;
    ticket.dueDate = new Date(dueDate);
    ticket.updatedAt = new Date();
    ticket.history.push(newHistory);

    const updatedTicket = await ticket.save();

    // If the category has changed, update the old and new categories
    if (previousCategory.toString() !== category) {
      await Category.findByIdAndUpdate(previousCategory, {
        $pull: { tickets: { _id: ticketId } },
      });
      await Category.findByIdAndUpdate(
        category,
        {
          $push: {
            tickets: {
              _id: updatedTicket._id,
              title: updatedTicket.title,
              description: updatedTicket.description,
              assignTo: updatedTicket.assignTo,
              dueDate: updatedTicket.dueDate,
              history: updatedTicket.history,
              category: updatedTicket.category,
              createdAt: updatedTicket.createdAt,
              updatedAt: updatedTicket.updatedAt,
            },
          },
        },
        { new: true },
      );
    }

    return NextResponse.json({
      status: "success",
      data: updatedTicket,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
};

export const PATCH = withAuth(updateTicket);
