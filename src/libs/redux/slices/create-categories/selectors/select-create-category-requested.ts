import { RootState } from "@todo/libs/redux/types/root-state";

export const selectCreateCategoryRequested = (state: RootState) =>
  state.createCategory.requested;
