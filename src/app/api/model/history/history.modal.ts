import { historySchema } from "@todo/app/api/schema/history/history-schema";
import { IHistory } from "@todo/app/api/types/history";
import mongoose, { Model } from "mongoose";

const History: Model<IHistory> =
  mongoose.models.History || mongoose.model<IHistory>("History", historySchema);

export default History;
