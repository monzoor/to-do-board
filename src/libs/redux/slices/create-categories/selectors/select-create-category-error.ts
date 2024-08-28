import { RootState } from "@todo/libs/redux/types/root-state";

export const selectCreateCategoryErrorOccurred = (state: RootState) =>
  state.createCategory.errorOccurred;
