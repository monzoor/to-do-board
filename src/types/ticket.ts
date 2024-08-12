import { Document, Schema } from "mongoose";
import { IHistory } from "./history";

export interface ITicket extends Document {
  title: string;
  description: string;
  assignTo?: Schema.Types.ObjectId;
  history: IHistory[];
  category: Schema.Types.ObjectId;
  createdAt: Date;
}
