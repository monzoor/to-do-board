"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authApi } from "@todo/app-api/auth/auth-api";
import { IFormSignupInputs } from "@todo/app/signup/types/signup";
import { signupSchema } from "@todo/app/signup/validation/signup-validation";
import { useAppDispatch, resetUser } from "@todo/libs";
import { UseSignupReturn } from "./types";

export const useSignup = (): UseSignupReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormSignupInputs>({
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  const onSubmit = async (data: IFormSignupInputs) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await authApi.signup(data);
      if (response?.data) {
        router.push("/login");
      }
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error?.data,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
};
