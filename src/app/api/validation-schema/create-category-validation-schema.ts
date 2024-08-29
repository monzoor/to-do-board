import * as yup from "yup";

export const createCategoryValidationSchema = yup.object({
  name: yup.string().required("Name is required").trim(),
  description: yup.string().optional().trim(),
});
