import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types/user-state";
import { User } from "@todo/types/user";
import { authUser } from "./thunks/auth-user";

const initialState: UserState = {
  requested: false,
  data: null,
  errorOccurred: false,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestUser: (state) => {
      state.requested = true;
    },
    receiveUser: (state, action: PayloadAction<User>) => {
      state.requested = false;
      state.data = action.payload;
    },
    userError: (state, action) => {
      state.requested = false;
      state.errorOccurred = true;
      state.error = action.payload;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state: UserState) => {
      return {
        ...state,
        requested: true,
        errorOccurred: false,
        error: null,
      };
    });
    builder.addCase(authUser.fulfilled, (state: UserState, action) => {
      return {
        ...state,
        requested: false,
        errorOccurred: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(authUser.rejected, (state: UserState, action) => {
      return {
        ...state,
        requested: false,
        errorOccurred: true,
        error: action.error?.message || null,
      };
    });
  },
});

export const {
  actions: { requestUser, receiveUser, userError, resetUser },
  reducer: user,
} = slice;
