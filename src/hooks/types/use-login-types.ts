import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IFormInputs } from "@todo/app/login/types/login";

export interface UseLoginReturn {
  register: UseFormRegister<IFormInputs>;
  handleSubmit: UseFormHandleSubmit<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
  onSubmit: SubmitHandler<IFormInputs>;
  hasError: boolean;
  isLoading: boolean;
}
