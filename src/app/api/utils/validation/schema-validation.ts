import * as yup from "yup";
import { NextResponse } from "next/server";

type ValidationResult =
  | { isValid: true; response: null }
  | { isValid: false; response: ReturnType<typeof NextResponse.json> };

export const validateSchema = async (
  schema: yup.ObjectSchema<any>,
  data: any,
): Promise<ValidationResult> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, response: null };
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      const response = NextResponse.json(
        { status: "error", message: validationError.errors.join(", ") },
        { status: 400 },
      );
      return { isValid: false, response };
    }
    throw validationError;
  }
};
