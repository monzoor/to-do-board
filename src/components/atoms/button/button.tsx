import React from "react";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
  color = "blue",
  width = "w-full",
  disabled = false,
  onClick,
  children,
  type = "button",
  asUrl = false,
}) => {
  const baseClasses =
    "mb-1 mr-1 rounded-md text-sm font-bold uppercase shadow outline-none transition-all duration-150 ease-linear focus:outline-none";

  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white disabled:bg-blue-200",
    green:
      "bg-green-600 hover:bg-green-700 focus:ring-green-300 text-white disabled:bg-green-200",
    gray: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 text-white disabled:bg-gray-200",
    url: "text-primary-600 cursor-pointer font-medium hover:underline",
  };

  const buttonClasses = asUrl
    ? `${baseClasses} ${colorClasses.url} ${width}`
    : `${baseClasses} ${colorClasses[color]} ${width} ${asUrl ? "" : "flex items-center justify-center px-6 py-3"}`;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};
