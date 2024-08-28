import { api } from "@todo/libs";
import { APIResponse } from "../types";
import { CategoryResponse } from "../types/create-category-response";
import { AxiosRequestConfig } from "axios";
import { API_URLS } from "@todo/contants";
import { ICreateCategoryFormInputs } from "@todo/app/components/create-category/types/create-category-type";

export const categoryApi = {
  createCategory: async ({ name, description }: ICreateCategoryFormInputs) => {
    const response = await api.post<APIResponse<CategoryResponse>>(
      API_URLS.CATEGORY,
      {
        name,
        description,
      },
    );
    return response.data.data as CategoryResponse;
  },
  getCategories: async (config?: AxiosRequestConfig | null | {}) => {
    const response = await api.get<APIResponse<CategoryResponse[]>>(
      API_URLS.CATEGORY,
      config || {},
    );
    return response.data.data;
  },
};
