import mongoose, { Document } from "mongoose";
import { IHistory } from "./history";

export interface ITicket extends Document {
  title: string;
  description: string;
  assignTo?: mongoose.Schema.Types.ObjectId;
  history: IHistory[];
}
