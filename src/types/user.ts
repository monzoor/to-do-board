import { LoginResponse } from "@todo/api/types";

export type User = Omit<LoginResponse, "token">;
