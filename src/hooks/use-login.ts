"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { IFormInputs } from "@todo/app/login/types/login";
import { loginSchema } from "@todo/app/login/validation/login-validation";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { authUser, resetUser } from "@todo/libs/redux/slices/user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseLoginReturn } from "./types";

export const useLogin = (): UseLoginReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.data) {
      window.location.href = "/";
    }
  }, [user.data]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, []);

  useEffect(() => {
    if (user.errorOccurred) {
      setIsSubmitting(false);
    }
  }, [user.errorOccurred]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);
    await dispatch(authUser(data));
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    hasError: !!(user && user?.errorOccurred),
    isLoading: isSubmitting,
  };
};
