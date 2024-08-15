import { authApi } from "@todo/app-api/auth/auth-api";
import { categoryApi } from "@todo/app-api/category/category-api";
import { UserResponse } from "@todo/app-api/types";
import { CategoryResponse } from "@todo/app-api/types/create-category-response";
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
      throw new Error("No authentication token found.");
    }

    // Fetch user data
    const userResponse = await authApi.getUser(token);
    const user = userResponse.data;

    // // Fetch categories data
    const categoriesResponse = await categoryApi.getCategories({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const categories = categoriesResponse;

    return { user, categories };
  } catch (error) {
    // Handle or log the error as needed
    console.error("App initialiser error:", error);
    throw error;
  }
};
