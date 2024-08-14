import * as yup from "yup";

// Helper function to strip time from a date
const startOfDay = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

// Calculate one day ahead from the current date
const minDueDate = startOfDay(new Date(Date.now() + 24 * 60 * 60 * 1000));

export const createTicketSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    dueDate: yup
      .date()
      .nullable()
      .required("Expire date is required")
      .min(
        minDueDate,
        "Expire date must be at least one day ahead of the current date",
      )
      .typeError("Invalid date format"),
  })
  .required();
