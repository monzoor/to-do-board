import { ICategory } from "@todo/app/api/types/category";
import { Schema } from "mongoose";
import { ticketSchema } from "../ticket/ticket-schema";

// Updated category schema to include userId
export const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tickets: [ticketSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
