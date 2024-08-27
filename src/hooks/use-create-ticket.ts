import { useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { selectCategories } from "@todo/libs/redux/slices/categories/selectors/get-categories";
import { ticketApi } from "@todo/app-api/ticket/ticket-api";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import { ICreateTicketFormInputs } from "@todo/app/components/create-ticket/types/create-ticket";
import { createTicketSchema } from "@todo/app/components/create-ticket/validation/create-ticket-schema";

export const useCreateTicket = ({
  closeTicketModal,
}: {
  closeTicketModal: () => void;
}): {
  register: UseFormRegister<ICreateTicketFormInputs>;
  handleSubmit: UseFormHandleSubmit<ICreateTicketFormInputs>;
  errors: FieldErrors<ICreateTicketFormInputs>;
  onSubmit: SubmitHandler<ICreateTicketFormInputs>;
  loading: boolean;
  getCategoriesList: { label: string; value: string }[];
} => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const categoriesItems = useAppSelector(selectCategories);
  const getCategoriesList =
    categoriesItems?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTicketFormInputs>({
    resolver: yupResolver(createTicketSchema),
  });

  const onSubmit = async (data: ICreateTicketFormInputs) => {
    if (loading) return;
    setLoading(true);

    try {
      const newData = {
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
      };
      const response = await ticketApi.createTicket(newData);
      if (response) {
        dispatch(getCategories());
        closeTicketModal();
      }
    } catch (error) {
      console.error("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    getCategoriesList,
    loading,
  };
};
