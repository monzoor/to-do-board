import { Button, Loader } from "@todo/components";
import { useCreateTicket } from "@todo/hooks";

export const CreateTicket = ({
  closeTicketModal,
}: {
  closeTicketModal: () => void;
}) => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    getCategoriesList,
    loading,
  } = useCreateTicket({
    closeTicketModal,
  });

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
          <Button color="gray" width="w-auto" onClick={closeTicketModal}>
            Cancel
          </Button>
          <Button disabled={loading} color="green" width="w-auto" type="submit">
            {loading ? <Loader /> : <span>Create ticket</span>}
          </Button>
        </div>
      </form>
    </div>
  );
};
