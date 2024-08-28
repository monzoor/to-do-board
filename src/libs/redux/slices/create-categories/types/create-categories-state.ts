import { ReduxRequest } from "@todo/libs/redux/types/redux-request";
import { Category, Nullable } from "@todo/types";

export type CreateCategoriesState = ReduxRequest<Nullable<Category>>;
