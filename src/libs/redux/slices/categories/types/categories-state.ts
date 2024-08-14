import { ReduxRequest } from "@todo/libs/redux/types/redux-request";
import { Categories, Nullable } from "@todo/types";

export type CategoriesState = ReduxRequest<Nullable<Categories>>;
