import * as Yup from "yup";

export const updateTicketValidationSchema = Yup.object().shape({
  ticketId: Yup.string().required("Ticket ID is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  dueDate: Yup.date().required("Due date is required"),
});
