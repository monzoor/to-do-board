"use client";

import { Button, Input, Loader } from "@todo/components";
import { URLS } from "@todo/contants";
import { useSignup } from "@todo/hooks";
import { useRouter } from "next/navigation";

export const SignUpContainer = () => {
  const router = useRouter();
  const { register, handleSubmit, errors, onSubmit, isLoading } = useSignup();

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          id="username"
          type="text"
          placeholder="Your username"
          register={register}
          error={errors.username?.message}
          theme="dark"
          label="Your username"
        />
      </div>
      <div>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          register={register}
          error={errors.email?.message}
          theme="dark"
          label="Your email"
        />
      </div>
      <div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          register={register}
          error={errors.password?.message}
          theme="dark"
          label="Password"
        />
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
