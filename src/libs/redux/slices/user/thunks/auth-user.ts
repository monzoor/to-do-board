import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@todo/api/auth/auth-api";
import { IFormInputs } from "@todo/app/login/types/login";

export const authUser = createAsyncThunk(
  "user/authUser",
  async (data: IFormInputs) => {
    const response = await authApi.login(data.email, data.password);
    return response.data;
  },
);
