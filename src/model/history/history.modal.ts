import { historySchema } from "@todo/schema/history/history-schema";
import { IHistory } from "@todo/types/history";
import mongoose, { Model } from "mongoose";

const History: Model<IHistory> =
  mongoose.models.History || mongoose.model<IHistory>("History", historySchema);

export default History;
