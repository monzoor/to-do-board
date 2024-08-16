"use client";

import { useLogout } from "@todo/hooks/use-logout";

export const Header = () => {
  const { isAuthenticated, logout } = useLogout();

  return (
    <div className="relative flex h-12 w-screen items-center justify-center bg-white text-center font-bold shadow-md">
      <h1 className="absolute left-1/2 -translate-x-1/2 transform">
        TODO BOARD
      </h1>
      {isAuthenticated && (
        <a
          href="#"
          onClick={logout}
          className="absolute right-4 text-blue-500 hover:underline"
        >
          Logout
        </a>
      )}
    </div>
  );
};
