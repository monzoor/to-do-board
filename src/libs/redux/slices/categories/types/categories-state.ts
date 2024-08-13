import { ReduxRequest } from "@todo/libs/redux/types/redux-request";
import { Categories } from "@todo/types/category";
import { Nullable } from "@todo/types/nulable";

export type CategoriesState = ReduxRequest<Nullable<Categories>>;
