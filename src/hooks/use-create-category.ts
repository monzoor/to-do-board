import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateCategoryFormInputs } from "@todo/app/components/create-category/types/create-category-type";
import { createCategorySchema } from "@todo/app/components/create-category/validation/create-category-validation";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createCategory,
  resetCreateCategories,
  selectCreateCategoryErrorOccurred,
  selectCreateCategoryRequested,
} from "@todo/libs/redux/slices/create-categories";
import toast from "react-hot-toast";
import { UseCreateCategoryProps, UseCreateCategoryReturn } from "./types";
import { selectCreateCategoryErrorMessage } from "@todo/libs/redux/slices/create-categories/selectors";
import { getCategories } from "@todo/libs/redux/slices/categories";

export const useCreateCategory = ({
  closeCategoryModal,
}: UseCreateCategoryProps): UseCreateCategoryReturn => {
  const dispatch = useAppDispatch();
  const isRequested = useAppSelector(selectCreateCategoryRequested);
  const hasError = useAppSelector(selectCreateCategoryErrorOccurred);
  const errorMessage = useAppSelector(
    selectCreateCategoryErrorMessage,
  ) as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (hasError) {
      toast.error(errorMessage);
      setIsSubmitting(false);
      setIsLoading(false);
    }
  }, [hasError, errorMessage]);

  const onSubmit: SubmitHandler<ICreateCategoryFormInputs> = async (data) => {
    if (isSubmitting || isLoading) return;

    setIsSubmitting(true);
    setIsLoading(true);

    await dispatch(createCategory(data));

    if (!hasError) {
      await dispatch(getCategories());
      dispatch(resetCreateCategories());
      closeCategoryModal();
      toast.success("Category created successfully");
    }

    setIsSubmitting(false);
    setIsLoading(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    isLoading,
  };
};
