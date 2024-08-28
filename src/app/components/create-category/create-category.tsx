import { Loader } from "@todo/components";
import { useCreateCategory } from "@todo/hooks/use-create-category";

export const CreateCategory = ({
  closeCategoryModal,
}: {
  closeCategoryModal: () => void;
}) => {
  const { register, handleSubmit, errors, onSubmit, isLoading } =
    useCreateCategory({
      closeCategoryModal,
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
            Category Name
          </label>
          <input
            autoComplete="new-name"
            type="text"
            id="name"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900"
            placeholder="Category name"
            {...register("name")}
          />
          <p className="mt-3 text-xs text-rose-400">{errors.name?.message}</p>
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Category Description
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

        <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid pb-0 pt-6">
          <button
            className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
            type="button"
            onClick={closeCategoryModal}
          >
            Close
          </button>
          <button
            disabled={isLoading}
            className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
            type="submit"
          >
            {isLoading ? <Loader /> : "Save category"}
          </button>
        </div>
      </form>
    </div>
  );
};
