import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { ICreateCategoryFormInputs } from "@todo/app/components/create-category/types/create-category-type";

export interface UseCreateCategoryProps {
  closeCategoryModal: () => void;
}

export interface UseCreateCategoryReturn {
  register: UseFormRegister<ICreateCategoryFormInputs>;
  handleSubmit: UseFormHandleSubmit<ICreateCategoryFormInputs>;
  errors: FieldErrors<ICreateCategoryFormInputs>;
  onSubmit: SubmitHandler<ICreateCategoryFormInputs>;
  isSubmitting: boolean;
}
