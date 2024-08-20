import { RootState } from "@todo/libs/redux/types/root-state";

export const selectCategoryRequested = (state: RootState) =>
  state?.categories?.requested;
