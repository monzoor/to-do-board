import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { ICreateTicketFormInputs } from "../../app/components/create-ticket/types/create-ticket";

export interface UseCreateTicketReturn {
  register: UseFormRegister<ICreateTicketFormInputs>;
  handleSubmit: UseFormHandleSubmit<ICreateTicketFormInputs>;
  errors: FieldErrors<ICreateTicketFormInputs>;
  onSubmit: SubmitHandler<ICreateTicketFormInputs>;
  loading: boolean;
  getCategoriesList: { label: string; value: string }[];
}
