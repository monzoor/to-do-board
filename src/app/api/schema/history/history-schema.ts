import { IHistory } from "@todo/app/api/types/history";
import { Schema } from "mongoose";

export const historySchema: Schema<IHistory> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  previousCategory: {
    type: String,
  },
  newCategory: {
    type: String,
    required: true,
  },
  historyDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});
