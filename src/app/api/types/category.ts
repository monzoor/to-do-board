import mongoose from "mongoose";
import { ITicket } from "./ticket";

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  tickets: ITicket[];
  createdAt: Date;
  userId: mongoose.Types.ObjectId;
}
