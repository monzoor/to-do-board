class ErrorHandler extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "CustomError";
  }
}

export const handleError = (error: unknown): never => {
  if (error instanceof ErrorHandler) {
    throw error;
  }

  if (error instanceof Error) {
    throw new ErrorHandler(error.message, 400); // Assuming 400 for client-side errors
  }

  throw new ErrorHandler("An unknown error occurred.", 500);
};
