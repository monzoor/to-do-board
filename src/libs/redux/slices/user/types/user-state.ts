import { ReduxRequest } from "@todo/libs/redux/types/redux-request";
import { Nullable } from "@todo/types/nulable";
import { User } from "@todo/types/user";

export type UserState = ReduxRequest<Nullable<User>>;
