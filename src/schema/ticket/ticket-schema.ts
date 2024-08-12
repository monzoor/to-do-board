import { Schema } from "mongoose";
import { ITicket } from "@todo/types/ticket";
import { historySchema } from "../history/history-schema";

export const ticketSchema: Schema<ITicket> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  history: [historySchema],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
