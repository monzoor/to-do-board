import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useLogout = () => {
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
