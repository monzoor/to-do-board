import { api } from "@todo/libs";
import { APIResponse } from "../types";
import { CategoryResponse } from "../types/create-category-response";

export const categoryApi = {
  createCategory: async (name: string, description: string) => {
    try {
      const response = await api.post<APIResponse<CategoryResponse>>(
        "/category",
        {
          name,
          description,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Create category error:", error);
      throw error;
    }
  },
  getCategories: async () => {
    try {
      const response =
        await api.get<APIResponse<CategoryResponse[]>>("/category");
      return response.data.data;
    } catch (error) {
      console.error("Get categories error:", error);
      throw error;
    }
  },
};
