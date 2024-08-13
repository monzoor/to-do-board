import { api } from "@todo/libs";
import Cookies from "js-cookie";
import { APIResponse, LoginResponse, SignupResponse } from "../types";

export const authApi = {
  login: async (
    email: string,
    password: string,
  ): Promise<APIResponse<LoginResponse>> => {
    try {
      const response = await api.post<APIResponse<LoginResponse>>("/login", {
        email,
        password,
      });
      // Set the authToken cookie
      const { token } = response.data.data;
      Cookies.set("authToken", token, { expires: 7 }); // Set the cookie with a 7-day expiration

      return response.data;
    } catch (error) {
      // Handle or log the error as needed, can be more granular
      console.error("Login error:", error);
      throw error;
    }
  },
  signup: async (
    userName: string,
    email: string,
    password: string,
  ): Promise<APIResponse<SignupResponse>> => {
    try {
      const response = await api.post<APIResponse<SignupResponse>>("/signup", {
        userName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      // Handle or log the error as needed, can be more granular
      console.error("Signup error:", error);
      throw error;
    }
  },
};
