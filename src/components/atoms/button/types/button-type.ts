export interface ButtonProps {
  color?: "blue" | "green" | "gray";
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
  asUrl?: boolean;
}
