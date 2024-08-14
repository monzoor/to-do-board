import * as yup from "yup";

export const createTicketSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    dueDate: yup
      .date()
      .nullable()
      .required("Expire date is required")
      .typeError("Invalid date format"),
  })
  .required();
