import * as yup from "yup";

export const signupSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters long")
      .required("Password is required"),
    username: yup.string().required("Username is required"),
  })
  .required();
