import { FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";
import { IFormSignupInputs } from "@todo/app/signup/types/signup";

export interface UseSignupReturn {
  register: UseFormRegister<IFormSignupInputs>;
  handleSubmit: (
    callback: SubmitHandler<IFormSignupInputs>,
  ) => (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: FieldErrors<IFormSignupInputs>;
  onSubmit: SubmitHandler<IFormSignupInputs>;
  isLoading: boolean;
}
