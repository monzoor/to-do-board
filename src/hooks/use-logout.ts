import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UseLogoutReturn } from "./types";

export const useLogout = (): UseLogoutReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    window.location.href = "/login";
  };

  return { isAuthenticated, logout };
};
