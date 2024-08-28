import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { formatDate } from "@todo/utils";
import { setDrafts } from "@todo/libs/redux/slices/draft/slice";
import { Draft } from "@todo/libs/redux/slices/draft/type";
import { selectDraft } from "@todo/libs/redux/slices/draft/selector/select-draft";
import { getCategories, useAppDispatch, useAppSelector } from "@todo/libs";
import { ticketApi } from "@todo/app-api/ticket/ticket-api";
import { TicketType } from "@todo/app/components/ticket/type";
import { ICreateTicketFormInputs } from "@todo/app/components/create-ticket/types/create-ticket";
import { UseTicketDetailsReturn } from "./types";

export const useTicketDetails = (
  ticket: TicketType,
  closeTicketModal: () => void,
): UseTicketDetailsReturn => {
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
  } = useForm<ICreateTicketFormInputs>({
    defaultValues: useMemo(
      () => ({
        title: currentDraft?.title || ticket.title,
        description: currentDraft?.description || ticket.description,
        dueDate: currentDraft?.dueDate
          ? new Date(formatDate(new Date(currentDraft.dueDate)))
          : ticket.dueDate
            ? new Date(formatDate(ticket.dueDate))
            : new Date(),
      }),
      [ticket, currentDraft],
    ),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (currentDraft) {
      setValue("title", currentDraft.title);
      setValue("description", currentDraft.description);
      setValue("dueDate", new Date(currentDraft.dueDate));
    }
  }, [currentDraft, setValue]);

  const onSubmit = async (data: ICreateTicketFormInputs) => {
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
        dueDate: currentValues.dueDate.toISOString(),
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
