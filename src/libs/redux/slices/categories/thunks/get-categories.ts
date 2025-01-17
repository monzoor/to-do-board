import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "@todo/app-api/category/category-api";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await categoryApi.getCategories();
    return response;
  },
);
