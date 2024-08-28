import { categories } from "./slices/categories/slice";
import { createCategorySlice } from "./slices/create-categories";
import { drafts } from "./slices/draft/slice";
import { user } from "./slices/user/slice";

export const reducer = {
  user,
  categories,
  drafts,
  createCategory: createCategorySlice,
};
