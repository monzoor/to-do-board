import { RootState } from "@todo/libs/redux/types/root-state";

export const selectUser = (state: RootState) => state?.user.data;
