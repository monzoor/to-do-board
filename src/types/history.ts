import { Document, Schema } from "mongoose";

export interface IHistory extends Document {
  userId: Schema.Types.ObjectId;
  previousCategory: string;
  newCategory: string;
  historyDate: Date;
}
