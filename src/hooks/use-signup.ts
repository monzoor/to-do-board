"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "@todo/app-api/auth/auth-api";
import { IFormSignupInputs } from "@todo/app/signup/types/signup";
import { signupSchema } from "@todo/app/signup/validation/signup-validation";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useSignup = (): {
  register: any;
  handleSubmit: any;
  errors: any;
  onSubmit: any;
  isLoading: boolean;
} => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormSignupInputs>({
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => {
    if (user.data) {
      router.push("/login");
    }
  }, [user.data]);

  useEffect(() => {
    if (user.errorOccurred) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
    }
  }, [user.errorOccurred]);

  const onSubmit = async (data: IFormSignupInputs) => {
    await authApi.signup(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading: user?.requested,
  };
};
