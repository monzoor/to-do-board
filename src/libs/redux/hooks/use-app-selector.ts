import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../types/root-state";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
