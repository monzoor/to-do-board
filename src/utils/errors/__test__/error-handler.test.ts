import { ErrorHandler } from "../error-handler";

describe("ErrorHandler", () => {
  it("should create an instance of ErrorHandler with the correct message and status", () => {
    const errorMessage = "Something went wrong";
    const statusCode = 404;
    const error = new ErrorHandler(errorMessage, statusCode);

    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe(errorMessage);
    expect(error.status).toBe(statusCode);
    expect(error.name).toBe("CustomError");
  });

  it('should have a name of "CustomError"', () => {
    const error = new ErrorHandler("Error occurred", 500);
    expect(error.name).toBe("CustomError");
  });

  it("should inherit from the Error class", () => {
    const error = new ErrorHandler("Error occurred", 500);
    expect(error).toBeInstanceOf(Error);
  });

  it("should correctly set the stack trace", () => {
    const error = new ErrorHandler("Error occurred", 500);
    expect(error.stack).toContain("CustomError"); // Adjusted to match the name set in the class
  });
});
