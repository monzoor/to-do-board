import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./root-reducer";

 const store = () => {
  return configureStore({
    reducer,
  });
};

export default store;