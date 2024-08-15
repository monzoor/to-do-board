"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { IFormInputs } from "@todo/app/login/types/login";
import { loginSchema } from "@todo/app/login/validation/login-validation";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { authUser } from "@todo/libs/redux/slices/user";
import { AppDispatch } from "@todo/libs/redux/types/app-dispatch";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const useLogin = (): {
  register: any;
  handleSubmit: any;
  errors: any;
  onSubmit: any;
  hasError: boolean;
  isLoading: boolean;
} => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.data) {
      window.location.href = "/";
    }
  }, [user.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: IFormInputs) => {
    await dispatch(authUser(data));
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    hasError: !!(user && user?.errorOccurred),
    isLoading: user?.requested,
  };
};
