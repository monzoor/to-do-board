import { UseFormRegister } from "react-hook-form";
type Theme = "light" | "dark";

export interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  theme?: Theme;
  label?: string;
}
