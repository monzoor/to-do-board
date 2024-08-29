import { UseFormRegister } from "react-hook-form";

export interface TextAreaProps {
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  label?: string;
  theme?: "light" | "dark";
}
