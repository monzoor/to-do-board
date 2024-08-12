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
});
