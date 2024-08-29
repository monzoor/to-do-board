import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketApi } from "@todo/app-api/ticket/ticket-api";
import {
  getCategories,
  selectCategories,
  useAppDispatch,
  useAppSelector,
} from "@todo/libs";
import { ICreateTicketFormInputs } from "@todo/app/components/create-ticket/types/create-ticket";
import { createTicketSchema } from "@todo/app/components/create-ticket/validation/create-ticket-schema";
import { UseCreateTicketReturn } from "./types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useCreateTicket = ({
  closeTicketModal,
}: {
  closeTicketModal: () => void;
}): UseCreateTicketReturn => {
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

    const newData = {
      ...data,
      dueDate: new Date(data.dueDate).toISOString(),
    };
    const response = ticketApi.createTicket(newData);

    toast.promise(response, {
      loading: "Loading",
      success: () => {
        dispatch(getCategories());
        closeTicketModal();
        setLoading(false);
        return "Ticket created successfully";
      },
      error: (error: AxiosError | any) => {
        setLoading(false);
        return error?.response?.data?.message || "Something went wrong";
      },
    });
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
