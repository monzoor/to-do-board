import { authApi } from "@todo/app-api/auth/auth-api";
import { categoryApi } from "@todo/app-api/category/category-api";
import { UserResponse } from "@todo/app-api/types";
import { CategoryResponse } from "@todo/app-api/types/create-category-response";
import { headers } from "next/headers";

// Define a custom error class
class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const appInitialiser = async (): Promise<{
  user: UserResponse;
  categories: CategoryResponse[];
}> => {
  const cookieHeader = headers().get("cookie");
  const token = cookieHeader?.split("authToken=")[1]?.split(";")[0];

  if (!token) {
    throw new AppError("No authentication token found.", 401);
  }

  try {
    const userResponse = await authApi.getUser(token);
    const user = userResponse.data;

    const categoriesResponse = await categoryApi.getCategories({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const categories = categoriesResponse;

    return { user, categories };
  } catch (error: unknown) {
    if (error instanceof Error && (error as any).response?.status) {
      const statusCode = (error as any).response.status;
      throw new AppError(error.message, statusCode);
    }
    throw new AppError("An unknown error occurred.", 500);
  }
};
