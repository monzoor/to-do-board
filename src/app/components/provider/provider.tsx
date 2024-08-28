"use client";

import { setCategories } from "@todo/libs";
import { receiveUser } from "@todo/libs/redux/slices/user";
import store from "@todo/libs/redux/store";
import { AppStore } from "@todo/libs/redux/types/app-store";
import { Nullable, Categories, User } from "@todo/types";
import React, { useRef } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: React.ReactNode;
  initialStoreData: {
    user: Nullable<User>;
    categories: Nullable<Categories>;
  };
}
const StoreProvider = ({ children, initialStoreData }: StoreProviderProps) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
    if (initialStoreData && initialStoreData.user) {
      storeRef.current.dispatch(receiveUser(initialStoreData.user));
    }
    if (initialStoreData && initialStoreData.categories) {
      storeRef.current.dispatch(setCategories(initialStoreData.categories));
    }
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
