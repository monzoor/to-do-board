"use client";

import { Button, Loader } from "@todo/components";
import { URLS } from "@todo/contants";
import { useSignup } from "@todo/hooks";
import { useRouter } from "next/navigation";

export const SignUpContainer = () => {
  const router = useRouter();
  const { register, handleSubmit, errors, onSubmit, isLoading } = useSignup();

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your username
        </label>
        <input
          autoComplete="new-username"
          type="username"
          id="username"
          className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Your name"
          {...register("username")}
        />
        <p className="mt-3 text-xs text-rose-400">{errors.username?.message}</p>
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          autoComplete="new-email"
          type="email"
          id="email"
          className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="name@company.com"
          {...register("email")}
        />
        <p className="mt-3 text-xs text-rose-400">{errors.email?.message}</p>
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          autoComplete="new-password"
          type="password"
          id="password"
          placeholder="••••••••"
          className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...register("password")}
        />
        <p className="mt-3 text-xs text-red-400">{errors.password?.message}</p>
      </div>

      <Button disabled={isLoading} type="submit" color="blue">
        {isLoading ? <Loader /> : <span>Sign up</span>}
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Button asUrl width="w-auto" onClick={() => router.push(URLS.LOGIN)}>
          Login
        </Button>
      </p>
    </form>
  );
};
