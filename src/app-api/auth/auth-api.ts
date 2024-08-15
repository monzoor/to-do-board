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
import { ErrorHandler, handleError } from "@todo/utils";

export const authApi = {
  login: async (
    credentials: IFormInputs,
  ): Promise<APIResponse<LoginResponse>> => {
    try {
      const response = await api.post<APIResponse<LoginResponse>>(
        "/login",
        credentials,
      );
      // Set the authToken cookie
      const { token } = response.data.data;
      Cookies.set("authToken", token, { expires: 7 }); // Set the cookie with a 7-day expiration

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return handleError(error);
    }
  },

  signup: async (
    data: IFormSignupInputs,
  ): Promise<APIResponse<SignupResponse>> => {
    try {
      const response = await api.post<APIResponse<SignupResponse>>(
        "/signup",
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      return handleError(error);
    }
  },

  getUser: async (token: string): Promise<APIResponse<UserResponse>> => {
    try {
      if (!token) {
        throw new ErrorHandler("No authentication token found.", 401);
      }

      const response = await api.get<APIResponse<UserResponse>>("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Get user error:", error);
      return handleError(error);
    }
  },
};
