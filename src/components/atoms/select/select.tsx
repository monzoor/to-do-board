import { SelectProps } from "./types";

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  register,
  error,
}) => {
  return (
    <div className="mt-4">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={id}
        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900"
        {...register(id)}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}
    </div>
  );
};
