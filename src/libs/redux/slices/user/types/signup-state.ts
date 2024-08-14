import { ReduxRequest } from "@todo/libs/redux/types/redux-request";
import { Nullable, SignUpUser } from "@todo/types";

export type SignupState = ReduxRequest<Nullable<SignUpUser>>;
