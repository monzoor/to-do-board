import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { formatDate } from "@todo/utils";
import { TicketType } from "../ticket/type";
import { setDrafts } from "@todo/libs/redux/slices/draft/slice";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { Draft } from "@todo/libs/redux/slices/draft/type";
import { selectDraft } from "@todo/libs/redux/slices/draft/selector/select-draft";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { ticketApi } from "@todo/app-api/ticket/ticket-api";

export const TicketDetails = ({
  ticket,
  closeTicketModal,
}: {
  ticket: TicketType;
  closeTicketModal: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);

  const allDrafts = useAppSelector(selectDraft);
  const currentDraft = allDrafts.find(
    (draft: Draft) => draft.id === ticket._id,
  );

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm({
    defaultValues: useMemo(
      () => ({
        title: currentDraft?.title || ticket.title,
        description: currentDraft?.description || ticket.description,
        dueDate: currentDraft?.dueDate
          ? formatDate(new Date(currentDraft.dueDate))
          : ticket.dueDate
            ? formatDate(ticket.dueDate)
            : "",
      }),
      [ticket, currentDraft],
    ),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (currentDraft) {
      setValue("title", currentDraft.title);
      setValue("description", currentDraft.description);
      setValue("dueDate", currentDraft.dueDate);
    }
  }, [currentDraft, setValue]);

  const onSubmit = async (data: {
    title: string;
    description: string;
    dueDate: string;
  }) => {
    if (!ticket._id || !ticket.category) {
      console.error("Ticket ID or category is missing");
      return;
    }

    const updatedDrafts = allDrafts.filter((draft) => draft.id !== ticket._id);

    const newData = {
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate).toISOString(),
      ticketId: ticket._id,
      category: ticket.category,
    };

    try {
      const response = await ticketApi.updateTicket(newData);

      if (response.status === "success") {
        dispatch(setDrafts(updatedDrafts));
        dispatch(getCategories());
        closeTicketModal();
      } else {
        console.error("Failed to update the ticket", response);
      }
    } catch (error) {
      console.error("Error updating the ticket", error);
    }
  };

  const handleDraftSave = () => {
    if (isDirty) {
      const currentValues = getValues();

      if (!ticket._id) {
        return;
      }

      const updatedDrafts = allDrafts.filter(
        (draft) => draft.id !== ticket._id,
      );
      updatedDrafts.push({
        id: ticket._id,
        title: currentValues.title,
        description: currentValues.description,
        dueDate: currentValues.dueDate,
      });

      dispatch(setDrafts(updatedDrafts));
    }
  };

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
