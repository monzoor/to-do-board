import { AxiosError } from "axios";

export function clientErrorHandler(error: unknown): never {
  if (error instanceof AxiosError) {
    console.error("Axios error:", {
      message: error.message,
      status: error.response?.status,
      // headers: error.response?.headers,
    });

    switch (error.response?.status) {
      case 401:
        throw new Error("Unauthorized access - please log in again.");
      case 404:
        throw new Error("Resource not found.");
      case 500:
        throw new Error("Internal server error - please try again later.");
      default:
        throw new Error("An unexpected error occurred - please try again.");
    }
  } else {
    throw new Error("An unknown error occurred - please try again.");
  }
}
