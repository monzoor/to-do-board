import { useForm } from "react-hook-form";
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
}) => {
  const dispatch = useAppDispatch();

  const categoriesItems = useAppSelector(selectCategories);
  const getCategoriesList =
    (categoriesItems &&
      categoriesItems.map((category) => {
        return {
          label: category.name,
          value: category._id,
        };
      })) ||
    [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTicketFormInputs>({
    resolver: yupResolver(createTicketSchema),
  });

  const onSubmit = async (data: ICreateTicketFormInputs) => {
    const newData = {
      ...data,
      dueDate: new Date(data.dueDate).toISOString(),
    };
    const response = await ticketApi.createTicket(newData);
    if (response) {
      dispatch(getCategories());
      closeTicketModal();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    getCategoriesList,
  };
};
