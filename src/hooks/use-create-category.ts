import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryApi } from "@todo/app-api/category/category-api";
import { ICreateCategoryFormInputs } from "@todo/app/components/create-category/types/create-category-type";
import { createCategorySchema } from "@todo/app/components/create-category/validation/create-category-validation";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { selectCategoryRequested } from "@todo/libs/redux/slices/categories/selectors/get-category-requested";

export const useCreateCategory = ({
  closeCategoryModal,
}: {
  closeCategoryModal: () => void;
}): {
  register: UseFormRegister<ICreateCategoryFormInputs>;
  handleSubmit: UseFormHandleSubmit<ICreateCategoryFormInputs>;
  errors: FieldErrors<ICreateCategoryFormInputs>;
  onSubmit: SubmitHandler<ICreateCategoryFormInputs>;
  isSubmitting: boolean;
} => {
  const isRequested = useAppSelector(selectCategoryRequested);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCategoryFormInputs>({
    resolver: yupResolver(createCategorySchema),
  });

  useEffect(() => {
    setIsSubmitting(isRequested);
  }, [isRequested]);

  const onSubmit: SubmitHandler<ICreateCategoryFormInputs> = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await categoryApi.createCategory(
        data.name,
        data.description,
      );
      if (response.status === "success") {
        dispatch(getCategories());
        closeCategoryModal();
      }
    } catch (error) {
      console.error("Failed to create category");
      throw new Error("Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
};
