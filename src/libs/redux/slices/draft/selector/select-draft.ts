import { RootState } from "@todo/libs/redux/types/root-state";

export const selectDraft = (state: RootState) => state?.drafts.drafts;
