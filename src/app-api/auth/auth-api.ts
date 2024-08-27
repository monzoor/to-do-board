import { api } from "@todo/libs";
import Cookies from "js-cookie";
import {
  APIResponse,
  LoginResponse,
  SignupResponse,
  UserResponse,
} from "../types";
import { IFormInputs } from "@todo/app/login/types/login";
import { IFormSignupInputs } from "@todo/app/signup/types/signup";
import { ErrorResponse } from "../types/error";
import { API_URLS } from "@todo/contants";

export const authApi = {
  login: async (
    credentials: IFormInputs,
  ): Promise<APIResponse<LoginResponse>> => {
    const response = await api.post<APIResponse<LoginResponse>>(
      API_URLS.LOGIN,
      credentials,
    );
    // Set the authToken cookie
    const { token } = response.data.data;
    Cookies.set("authToken", token, { expires: 7 }); // Set the cookie with a 7-day expiration

    return response.data;
  },

  signup: async (
    data: IFormSignupInputs,
  ): Promise<APIResponse<SignupResponse>> => {
    try {
      const response = await api.post<APIResponse<SignupResponse>>(
        API_URLS.SIGNUP,
        data,
      );
      return response.data;
    } catch (error: ErrorResponse) {
      throw {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data?.message,
      };
    }
  },

  getUser: async (token: string): Promise<APIResponse<UserResponse>> => {
    const response = await api.get<APIResponse<UserResponse>>(API_URLS.USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};
