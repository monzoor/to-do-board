import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "@todo/app-api/category/category-api";

export const createCategory = createAsyncThunk(
  "createCategories/createCategories",
  async (data: { name: string; description: string }) => {
    const response = await categoryApi.createCategory(data);
    return response;
  },
);
