"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { IFormInputs } from "@todo/app/login/types/login";
import { loginSchema } from "@todo/app/login/validation/login-validation";
import { authUser } from "@todo/libs/redux/slices/user";
import { AppDispatch } from "@todo/libs/redux/types/app-dispatch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      await dispatch(authUser(data));
      router.push("/"); // Redirect to root URL on success
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
