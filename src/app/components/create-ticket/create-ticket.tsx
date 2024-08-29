import { Button, Input, Loader, Select, TextArea } from "@todo/components";
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
          <Input
            type="text"
            id="ticket"
            placeholder="Ticket title"
            register={register}
            error={errors.title?.message}
            label="Ticket Title"
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
        <div className="mt-4">
          <Select
            id="ticketCategory"
            label="Ticket Category"
            options={getCategoriesList}
            register={register}
            error={errors.category?.message}
          />
        </div>

        <div className="mb-4">
          <Input
            type="date"
            id="dueDate"
            placeholder="Due Date"
            register={register}
            error={errors.dueDate?.message}
            label="Due Date"
          />
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
