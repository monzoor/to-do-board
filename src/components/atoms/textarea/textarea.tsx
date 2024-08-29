import { TextAreaProps } from "./types";

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  placeholder,
  register,
  error,
  label,
  theme = "light",
}) => {
  const isDarkMode = theme === "dark";

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`mb-2 block text-sm font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {label}
        </label>
      )}
      <textarea
        autoComplete={`new-${id}`}
        id={id}
        className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-md border p-2.5 ${
          isDarkMode
            ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            : "focus:border-primary-600 focus:ring-primary-600 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400"
        }`}
        placeholder={placeholder}
        {...register(id)}
      />
      {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}
    </div>
  );
};
