import { ReduxRequest } from "@todo/libs/redux/types/redux-request";
import { Nullable } from "@todo/types/nulable";
import { SignUpUser } from "@todo/types/signup";

export type SignupState = ReduxRequest<Nullable<SignUpUser>>;
