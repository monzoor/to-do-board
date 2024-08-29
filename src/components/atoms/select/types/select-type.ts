import { UseFormRegister } from "react-hook-form";

export interface SelectProps {
  id: string;
  label: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<any>;
  error?: string;
}
