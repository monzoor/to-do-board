import { authApi } from "@todo/app-api/auth/auth-api";
import { categoryApi } from "@todo/app-api/category/category-api";
import { UserResponse } from "@todo/app-api/types";
import { CategoryResponse } from "@todo/app-api/types/create-category-response";
import { ErrorHandler } from "@todo/utils";
import { headers } from "next/headers";

export const appInitialiser = async (): Promise<{
  user: UserResponse;
  categories: CategoryResponse[];
}> => {
  try {
    // Get the cookie value
    const cookieHeader = headers().get("cookie");
    const token = cookieHeader?.split("authToken=")[1]?.split(";")[0];

    if (!token) {
      throw new ErrorHandler("No authentication token found.", 401);
    }

    // Fetch user data
    const userResponse = await authApi.getUser(token);
    const user = userResponse.data;

    // Fetch categories data
    const categoriesResponse = await categoryApi.getCategories({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const categories = categoriesResponse;

    return { user, categories };
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ErrorHandler(error.message, 500);
    }

    // Handle any other unknown errors
    throw new ErrorHandler("An unknown error occurred.", 500);
  }
};
