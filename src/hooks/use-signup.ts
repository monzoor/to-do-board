"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "@todo/api/auth/auth-api";
import { IFormSignupInputs } from "@todo/app/signup/types/signup";
import { signupSchema } from "@todo/app/signup/validation/signup-validation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useSignup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignupInputs>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: IFormSignupInputs) => {
    try {
      console.log("Signup data:", data);
      await authApi.signup(data);
      router.push("/login"); // Redirect to root URL on success
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
