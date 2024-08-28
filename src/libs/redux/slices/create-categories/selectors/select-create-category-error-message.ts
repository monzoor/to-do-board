import { RootState } from "@todo/libs/redux/types/root-state";

export const selectCreateCategoryErrorMessage = (state: RootState) =>
  state.createCategory.error;
