import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState } from "./types/categories-state";
import { Categories } from "@todo/types";
import { getCategories } from "./thunks/get-categories";

const initialState: CategoriesState = {
  requested: false,
  data: null,
  errorOccurred: false,
  error: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setProgress: (state) => {
      state.requested = !state.requested;
    },
    setCategories: (state, action: PayloadAction<Categories>) => {
      state.data = action.payload;
    },
    resetCategories: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state: CategoriesState) => {
      return {
        ...state,
        requested: true,
        errorOccurred: false,
        error: null,
      };
    });
    builder.addCase(
      getCategories.fulfilled,
      (state: CategoriesState, action) => {
        return {
          ...state,
          requested: false,
          errorOccurred: false,
          error: null,
          data: action.payload,
        };
      },
    );
    builder.addCase(
      getCategories.rejected,
      (state: CategoriesState, action) => {
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
  actions: { setProgress, setCategories, resetCategories },
  reducer: categories,
} = slice;
