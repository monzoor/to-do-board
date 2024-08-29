"use client";

import { Button, Input, Loader } from "@todo/components";
import { URLS } from "@todo/contants";
import { useLogin } from "@todo/hooks";
import { useRouter } from "next/navigation";

export const LoginContainer = () => {
  const router = useRouter();
  const { register, handleSubmit, errors, onSubmit, hasError, isLoading } =
    useLogin();

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          register={register}
          error={errors.email?.message}
          theme="dark"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          register={register}
          error={errors.password?.message}
          theme="dark"
        />
        {hasError && (
          <p className="mt-3 text-xs text-red-400">
            Invalid credentials. Please try again.
          </p>
        )}
      </div>
      <Button disabled={isLoading} type="submit" color="blue">
        {isLoading ? <Loader /> : <span>Sign in</span>}
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Button asUrl width="w-auto" onClick={() => router.push(URLS.SIGNUP)}>
          Sign up
        </Button>
      </p>
    </form>
  );
};
