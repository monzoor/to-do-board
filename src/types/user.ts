import { LoginResponse } from "@todo/app-api/types";

export type User = Omit<LoginResponse, "token">;
