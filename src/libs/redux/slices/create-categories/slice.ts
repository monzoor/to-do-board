import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCategory } from "./thunks/create-categories";
import { CreateCategoriesState } from "./types/create-categories-state";
import { Category } from "@todo/types";

// Initial state
const initialState: CreateCategoriesState = {
  requested: false,
  data: null,
  errorOccurred: false,
  error: null,
};

const slice = createSlice({
  name: "createCategorySlice",
  initialState,
  reducers: {
    resetCreateCategories: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      createCategory.fulfilled,
      (state: CreateCategoriesState, action: PayloadAction<Category>) => {
        return {
          ...state,
          requested: false,
          errorOccurred: false,
          error: null,
          data: action.payload,
        };
      },
    );

    builder.addCase(createCategory.pending, (state: CreateCategoriesState) => {
      return {
        ...state,
        requested: true,
        errorOccurred: false,
        error: null,
      };
    });

    builder.addCase(
      createCategory.rejected,
      (state: CreateCategoriesState, action) => {
        return {
          ...state,
          requested: false,
          errorOccurred: true,
          error: action.error?.message || null,
        };
      },
    );
  },
});

export const {
  actions: { resetCreateCategories },
  reducer: createCategorySlice,
} = slice;
