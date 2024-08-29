import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DraftState, Draft } from "./types";

const initialState: DraftState = {
  drafts: [],
};

const slice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    // Action to replace drafts with new data
    setDrafts: (state, action: PayloadAction<Draft[]>) => {
      state.drafts = action.payload;
    },
    resetDrafts: () => initialState,
  },
});

export const {
  actions: { setDrafts, resetDrafts },
  reducer: drafts,
} = slice;
