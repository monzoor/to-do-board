import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@todo/app/api/lib";
import { authenticateUser, withAuth } from "../../helper";
import Category from "@todo/app/api/model/category/category.modal";
import History from "@todo/app/api/model/history/history.modal";
import { ErrorHandler, errorResponse } from "../../utils";
import { Types } from "mongoose";
import { ICategory } from "../../types/category";
import { validateSchema } from "../../utils/validation/schema-validation";
import { updateTicketValidationSchema } from "../../validation-schema/update-ticket-validation-schema";

const updateTicket = async (request: NextRequest) => {
  try {
    await connectToMongoDB();

    const userId = authenticateUser(request)?.userId;
    if (!userId) {
      throw new ErrorHandler("Invalid token", 401);
    }

    const requestBody = await request.json();
    const validationResponse = await validateSchema(
      updateTicketValidationSchema,
      requestBody,
    );
    if (!validationResponse.isValid) {
      return validationResponse.response;
    }

    const { ticketId, title, description, category, dueDate } = requestBody;

    const ticketObjectId = new Types.ObjectId(ticketId);
    const categoryObjectId = new Types.ObjectId(category);

    const categoryByTicketID = await Category.findOne({
      _id: categoryObjectId,
    }).exec();

    if (!categoryByTicketID) {
      throw new ErrorHandler("category not found", 404);
    }

    const ticket = categoryByTicketID.tickets.find(
      (t) => (t._id as Types.ObjectId).toString() === ticketId,
    );

    if (!ticket) {
      throw new ErrorHandler("Ticket not found in the current category", 404);
    }

    // Create the new history entry
    const historyEntry = {
      userId,
      previousCategory: categoryByTicketID.name,
      newCategory: categoryByTicketID.name,
      historyDate: new Date(),
      dueDate: new Date(dueDate),
    };

    // Save history entry
    const newHistory = new History(historyEntry);
    await newHistory.save();

    // Update the ticket
    ticket.title = title;
    ticket.description = description;
    ticket.category = categoryObjectId;
    ticket.dueDate = new Date(dueDate);
    ticket.updatedAt = new Date();
    ticket.history.push(newHistory);

    await categoryByTicketID.save();

    return NextResponse.json({
      status: "success",
      data: ticket,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return errorResponse(error.message, error.status);
    }

    return errorResponse("Server Error", 500);
  }
};

export const PATCH = withAuth(updateTicket);
