import mongoose, { Document } from "mongoose";

export interface IHistory extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  previousCategory: string;
  newCategory: string;
  historyDate: Date;
}
