"use client";

import { useLogout } from "@todo/hooks";

export const Header = () => {
  const { isAuthenticated, logout } = useLogout();

  return (
    <div className="relative flex h-12 w-screen items-center justify-center bg-white text-center font-bold shadow-md">
      <h1 className="absolute left-1/2 -translate-x-1/2 transform">
        <svg width="220" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="0"
            y="4"
            width="40"
            height="40"
            rx="8"
            ry="8"
            fill="#0079BF"
          />
          <rect x="10" y="14" width="8" height="20" fill="white" />
          <rect x="24" y="14" width="8" height="14" fill="white" />

          <text
            x="52"
            y="34"
            fontFamily="Verdana, Geneva, sans-serif"
            fontSize="20"
            fontWeight="bold"
            fill="#0079BF"
          >
            TODO Board
          </text>
        </svg>
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
