import { ICategory } from "@todo/types/category";
import { Schema } from "mongoose";
import { ticketSchema } from "../ticket/ticket-schema";

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
});
