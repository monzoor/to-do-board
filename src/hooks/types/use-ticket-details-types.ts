import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { ICreateTicketFormInputs } from "@todo/app/components/create-ticket/types/create-ticket";
import { Draft } from "@todo/libs";

export interface UseTicketDetailsReturn {
  isEditingTitle: boolean;
  setIsEditingTitle: (value: boolean) => void;
  isEditingDescription: boolean;
  setIsEditingDescription: (value: boolean) => void;
  isEditingDueDate: boolean;
  setIsEditingDueDate: (value: boolean) => void;
  handleSubmit: UseFormHandleSubmit<ICreateTicketFormInputs>; // Correct type for handleSubmit
  control: Control<ICreateTicketFormInputs>;
  currentDraft: Draft | undefined;
  onSubmit: SubmitHandler<ICreateTicketFormInputs>;
  handleDraftSave: () => void;
  isDirty: boolean;
  loading: boolean;
}
