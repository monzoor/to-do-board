import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { formatDate } from "@todo/utils";
import { TicketType } from "../ticket/type";

export const TicketDetails = ({
  ticket,
  closeTicketModal,
}: {
  ticket: TicketType;
  closeTicketModal: () => void;
}) => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: ticket.title,
      description: ticket.description,
    },
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const onSubmit = (data: { title: string; description: string }) => {
    console.log("Updated ticket data:", data);
    closeTicketModal();
  };

  const handleDraftSave = () => {
    console.log("Draft saved");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start bg-slate-200 p-4">
        <div className="pb-3 font-bold">Title</div>
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
                {field.value}
              </div>
            )
          }
        />
      </div>

      <div className="flex flex-col items-start bg-slate-200 p-4">
        <div className="pb-3 font-bold">Description</div>
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
                {field.value}
              </div>
            )
          }
        />
      </div>

      <div className="flex flex-col items-start bg-slate-200 p-4">
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
        <button
          className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
          onClick={() => {
            handleDraftSave();
            closeTicketModal();
          }}
        >
          Close
        </button>
        <button
          className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};
