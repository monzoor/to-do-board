type Theme = "light" | "dark";

export interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
  theme?: Theme;
  label?: string;
}
