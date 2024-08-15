import { yupResolver } from "@hookform/resolvers/yup";
import { categoryApi } from "@todo/api/category/category-api";
import { ICreateCategoryFormInputs } from "@todo/app/components/create-category/types/create-category-type";
import { createCategorySchema } from "@todo/app/components/create-category/validation/create-category-validation";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import { useForm } from "react-hook-form";

export const useCreateCategory = ({
  closeCategoryModal,
}: {
  closeCategoryModal: () => void;
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCategoryFormInputs>({
    resolver: yupResolver(createCategorySchema),
  });

  const onSubmit = async (data: ICreateCategoryFormInputs) => {
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
      console.error("Failed to create category", error);
      throw new Error("Failed to create category");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
