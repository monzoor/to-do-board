import { User, Nullable, Categories } from "@todo/types";
import { headers } from "next/headers";

export const getInitialStoreData = (): {
  user: Nullable<User>;
  categories: Nullable<Categories>;
} => {
  // Get headers from the current request context
  const headerValues = headers();

  // Extract the custom headers
  const userHeader = headerValues.get("x-user");
  const categoriesHeader = headerValues.get("x-categories");

  // Parse the custom headers if they exist
  const user = userHeader ? JSON.parse(userHeader) : null;
  const categories = categoriesHeader ? JSON.parse(categoriesHeader) : [];

  return {
    user,
    categories,
  };
};
