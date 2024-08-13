import userSchema from "@todo/app/api/schema/user/user-schema";
import { IUser } from "@todo/app/api/types/user";
import mongoose, { Model } from "mongoose";

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
