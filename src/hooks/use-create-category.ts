import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
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
import {
  createCategory,
  resetCreateCategories,
  selectCreateCategoryErrorOccurred,
  selectCreateCategoryRequested,
} from "@todo/libs/redux/slices/create-categories";
import toast from "react-hot-toast";

interface UseCreateCategoryProps {
  closeCategoryModal: () => void;
}

interface UseCreateCategoryReturn {
  register: UseFormRegister<ICreateCategoryFormInputs>;
  handleSubmit: UseFormHandleSubmit<ICreateCategoryFormInputs>;
  errors: FieldErrors<ICreateCategoryFormInputs>;
  onSubmit: SubmitHandler<ICreateCategoryFormInputs>;
  isSubmitting: boolean;
}

export const useCreateCategory = ({
  closeCategoryModal,
}: UseCreateCategoryProps): UseCreateCategoryReturn => {
  const dispatch = useAppDispatch();
  const isRequested = useAppSelector(selectCreateCategoryRequested);
  const hasError = useAppSelector(selectCreateCategoryErrorOccurred);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error("Something went wrong");
      setIsSubmitting(false);
    }
  }, [hasError]);

  const onSubmit: SubmitHandler<ICreateCategoryFormInputs> = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    await dispatch(createCategory(data));

    if (!hasError) {
      await dispatch(getCategories());
      dispatch(resetCreateCategories());
      closeCategoryModal();
    }

    setIsSubmitting(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
};
