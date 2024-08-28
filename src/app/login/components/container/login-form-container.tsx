"use client";

import { Loader } from "@todo/components";
import { URLS } from "@todo/contants";
import { useLogin } from "@todo/hooks/use-login";
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
        {hasError && (
          <p className="mt-3 text-xs text-red-400">
            Invalid credentials. Please try again.
          </p>
        )}
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
      >
        {isLoading ? <Loader /> : <span>Sign in</span>}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <button
          type="button"
          className="text-primary-600 dark:text-primary-500 cursor-pointer font-medium hover:underline"
          onClick={() => router.push(URLS.SIGNUP)}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};
