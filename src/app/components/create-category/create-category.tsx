import { Button, Input, Loader, TextArea } from "@todo/components";
import { useCreateCategory } from "@todo/hooks";

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
          <Input
            type="text"
            id="name"
            placeholder="Category name"
            register={register}
            error={errors.name?.message}
            label="Category Name"
          />
        </div>

        <div>
          <TextArea
            id="description"
            placeholder="Category description"
            register={register}
            error={errors.description?.message}
            label="Ticket Description"
          />
        </div>

        <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid pb-0 pt-6">
          <Button color="gray" width="w-auto" onClick={closeCategoryModal}>
            Cancel
          </Button>
          <Button
            color="green"
            width="w-auto"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Create category"}
          </Button>
        </div>
      </form>
    </div>
  );
};
