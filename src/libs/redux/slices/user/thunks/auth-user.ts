import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@todo/app-api/auth/auth-api";
import { IFormInputs } from "@todo/app/login/types/login";
import { IFormSignupInputs } from "@todo/app/signup/types/signup";

export const authUser = createAsyncThunk(
  "user/authUser",
  async (data: IFormInputs) => {
    const response = await authApi.login(data);
    return response.data;
  },
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data: IFormSignupInputs) => {
    const response = await authApi.signup(data);
    return response.data;
  },
);
