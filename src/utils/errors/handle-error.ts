import { NextResponse } from "next/server";
import { errorResponse } from "./error-response";

class ErrorHandler extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "CustomError";
  }
}

export const handleError = (error: unknown): NextResponse => {
  if (error instanceof ErrorHandler) {
    return errorResponse(error.message, error.status as number);
  }

  if (error instanceof Error) {
    return errorResponse(error.message, 400); // Assuming 400 for client-side errors
  }

  return errorResponse("An unknown error occurred.", 500);
};
