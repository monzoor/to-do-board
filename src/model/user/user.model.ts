import userSchema from "@todo/schema/user/user-schema";
import { IUser } from "@todo/types/user";
import mongoose, { Model } from "mongoose";

// Avoid recompiling the model if it already exists
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
