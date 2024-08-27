import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { formatDate } from "@todo/utils";
import { setDrafts } from "@todo/libs/redux/slices/draft/slice";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { Draft } from "@todo/libs/redux/slices/draft/type";
import { selectDraft } from "@todo/libs/redux/slices/draft/selector/select-draft";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { ticketApi } from "@todo/app-api/ticket/ticket-api";
import { TicketType } from "@todo/app/components/ticket/type";

export const useTicketDetails = (
  ticket: TicketType,
  closeTicketModal: () => void,
) => {
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
      console.error("Error updating the ticket");
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

  return {
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
    currentDraft, // Include currentDraft here
  };
};
