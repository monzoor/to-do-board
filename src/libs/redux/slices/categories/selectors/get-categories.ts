import { RootState } from "@todo/libs/redux/types/root-state";

export const selectCategories = (state: RootState) => state?.categories.data;
