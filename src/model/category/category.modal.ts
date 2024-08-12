import { categorySchema } from "@todo/schema/category/category-schema";
import { ICategory } from "@todo/types/category";
import mongoose, { Model } from "mongoose";

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);

export default Category;
