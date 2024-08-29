import { Controller } from "react-hook-form";
import { formatDate } from "@todo/utils";
import { TicketType } from "../ticket/type";
import { useTicketDetails } from "@todo/hooks";
import { Button, Loader } from "@todo/components";

export const TicketDetails = ({
  ticket,
  closeTicketModal,
}: {
  ticket: TicketType;
  closeTicketModal: () => void;
}) => {
  const {
    isEditingTitle,
    setIsEditingTitle,
    isEditingDescription,
    setIsEditingDescription,
    isEditingDueDate,
    setIsEditingDueDate,
    handleSubmit,
    control,
    onSubmit,
    handleDraftSave,
    currentDraft,
    loading,
    isDirty,
  } = useTicketDetails(ticket, closeTicketModal);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start bg-slate-200 p-4">
        <div className="pb-3 font-bold">
          Title{" "}
          {currentDraft?.title &&
            currentDraft.title !== ticket.title &&
            "(draft)"}
        </div>
        <Controller
          name="title"
          control={control}
          render={({ field }) =>
            isEditingTitle ? (
              <input
                {...field}
                className="w-full rounded border px-2 py-1"
                type="text"
                onBlur={() => setIsEditingTitle(false)}
              />
            ) : (
              <div
                className="w-full cursor-pointer"
                onClick={() => setIsEditingTitle(true)}
              >
                {ticket.title}
              </div>
            )
          }
        />
      </div>

      <div className="flex flex-col items-start bg-slate-200 p-4">
        <div className="pb-3 font-bold">
          Description{" "}
          {currentDraft?.description &&
            currentDraft.description !== ticket.description &&
            "(draft)"}
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) =>
            isEditingDescription ? (
              <textarea
                {...field}
                className="w-full rounded border px-2 py-1"
                onBlur={() => setIsEditingDescription(false)}
              />
            ) : (
              <div
                className="w-full cursor-pointer"
                onClick={() => setIsEditingDescription(true)}
              >
                {ticket.description}
              </div>
            )
          }
        />
      </div>

      <div className="flex flex-col items-start bg-slate-200 p-4">
        <div className="pb-3 font-bold">
          Due Date{" "}
          {currentDraft?.dueDate &&
            currentDraft.dueDate !== ticket.dueDate &&
            "(draft)"}
        </div>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) =>
            isEditingDueDate ? (
              <input
                {...field}
                className="w-full rounded border px-2 py-1"
                type="date"
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split("T")[0]
                    : field.value
                }
                onBlur={() => setIsEditingDueDate(false)}
              />
            ) : (
              <div
                className="w-full cursor-pointer"
                onClick={() => setIsEditingDueDate(true)}
              >
                {ticket.dueDate ? formatDate(ticket.dueDate) : "No due date"}
              </div>
            )
          }
        />
      </div>

      <div className="flex h-[160px] flex-col items-start overflow-y-auto bg-slate-200 p-4">
        <div className="pb-3 font-bold">History</div>
        <div className="flex-grow">
          {ticket.history?.map((history) => (
            <div key={history._id} className="flex flex-col">
              <p className="py-1 text-xs">
                Has been moved to{" "}
                <span className="font-bold capitalize">
                  {history.newCategory}
                </span>{" "}
                on {formatDate(history.historyDate)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid pb-0 pt-6">
        <Button
          width="w-auto"
          color="gray"
          onClick={() => {
            handleDraftSave();
            closeTicketModal();
          }}
        >
          Close
        </Button>
        <Button
          color="green"
          width="w-auto"
          type="submit"
          disabled={!isDirty || loading}
        >
          {loading ? <Loader /> : "Save"}
        </Button>
      </div>
    </form>
  );
};
