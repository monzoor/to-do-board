import { ReduxRequest } from "@todo/libs/redux/types/redux-request";
import { User, Nullable } from "@todo/types";

export type UserState = ReduxRequest<Nullable<User>>;
