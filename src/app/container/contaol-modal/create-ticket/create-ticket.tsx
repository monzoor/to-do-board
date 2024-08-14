import { useForm } from "react-hook-form";
import { ICreateTicketFormInputs } from "./types/create-ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTicketSchema } from "./validation/create-ticket-schema";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { selectCategories } from "@todo/libs/redux/slices/categories/selectors/get-categories";

const useCreateTicket = () => {
  const categoriesItems = useAppSelector(selectCategories);
  const getCategoriesList =
    (categoriesItems &&
      categoriesItems.map((category) => {
        return {
          label: category.name,
          value: category._id,
        };
      })) ||
    [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTicketFormInputs>({
    resolver: yupResolver(createTicketSchema),
  });

  const onSubmit = async (data: ICreateTicketFormInputs) => {
    console.log(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    getCategoriesList,
  };
};

export const CreateTicket = ({
  closeTicketModal,
}: {
  closeTicketModal: () => void;
}) => {
  const { register, handleSubmit, errors, onSubmit, getCategoriesList } =
    useCreateTicket();

  return (
    <div>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Ticket Title
          </label>
          <input
            autoComplete="new-name"
            type="text"
            id="ticket"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900"
            placeholder="Ticket title"
            {...register("title")}
          />
          <p className="mt-3 text-xs text-rose-400">{errors.title?.message}</p>
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Ticket Description
          </label>
          <textarea
            autoComplete="new-description"
            id="description"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900"
            placeholder="Category description"
            {...register("description")}
          />
          <p className="mt-3 text-xs text-rose-400">
            {errors.description?.message}
          </p>
        </div>
        <div className="mt-4">
          <label
            htmlFor="ticketCategory"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Ticket Category
          </label>
          <select
            id="ticketCategory"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900"
            {...register("category")}
          >
            <option value="">Select Category</option>
            {getCategoriesList.map((category) => {
              return (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>
          <p className="mt-3 text-xs text-rose-400">
            {errors.category?.message}
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900"
            {...register("dueDate")}
          />
          <p className="mt-3 text-xs text-rose-400">
            {errors.dueDate?.message}
          </p>
        </div>
        <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid pb-0 pt-6">
          <button
            className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
            type="button"
            onClick={closeTicketModal}
          >
            Close
          </button>
          <button
            className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
            type="submit"
          >
            Save category
          </button>
        </div>
      </form>
    </div>
  );
};
