import { api } from "@todo/libs";
import { APIResponse } from "../types";
import { CategoryResponse } from "../types/create-category-response";
import { AxiosRequestConfig } from "axios";
import { handleError } from "@todo/utils";
import { ErrorResponse } from "../types/error";
import { API_URLS } from "@todo/contants";

export const categoryApi = {
  createCategory: async (name: string, description: string) => {
    try {
      const response = await api.post<APIResponse<CategoryResponse>>(
        API_URLS.CATEGORY,
        {
          name,
          description,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Create category error:", error);
      return handleError(error);
    }
  },
  getCategories: async (config?: AxiosRequestConfig | null | {}) => {
    try {
      const response = await api.get<APIResponse<CategoryResponse[]>>(
        API_URLS.CATEGORY,
        config || {},
      );
      return response.data.data;
    } catch (error: ErrorResponse) {
      console.error("Get categories error:", error);
      throw {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data?.message,
      };
    }
  },
};
