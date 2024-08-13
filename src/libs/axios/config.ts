import axios from "axios";
import Cookies from "js-cookie";
import { apiValidation, unauthorized } from "./catcher";

// Base URL for API
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token if available
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken"); // Adjust cookie name as needed

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Remove Authorization header if no token
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        unauthorized();
      } else if (status === 422) {
        apiValidation(error);
      }
    }

    return Promise.reject(error);
  },
);

export { api };
