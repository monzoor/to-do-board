import * as yup from "yup";

export const createTicketValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  dueDate: yup
    .date()
    .required("Due date is required")
    .typeError("Invalid date format"),
  history: yup
    .array()
    .of(
      yup.object({
        userId: yup.string().required(),
        previousCategory: yup.string().required(),
        newCategory: yup.string().required(),
        historyDate: yup.date().required(),
        dueDate: yup.date().required(),
      }),
    )
    .default([]),
});
