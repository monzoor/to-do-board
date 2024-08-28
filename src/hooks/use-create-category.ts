import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { ICreateCategoryFormInputs } from "@todo/app/components/create-category/types/create-category-type";
import { createCategorySchema } from "@todo/app/components/create-category/validation/create-category-validation";
import {
  createCategory,
  resetCreateCategories,
  selectCreateCategoryErrorOccurred,
  selectCreateCategoryRequested,
  selectCreateCategoryErrorMessage,
  getCategories,
  useAppDispatch,
  useAppSelector,
} from "@todo/libs";
import { UseCreateCategoryProps, UseCreateCategoryReturn } from "./types";

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
