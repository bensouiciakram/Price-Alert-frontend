"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

// 🧩 Validation Schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Page = () => {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(data);
      reset();
      alert("Login successful!");
      router.push("/");
    } catch (error) {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="bg-base-200 text-base-content min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="card shadow-xl bg-base-100 w-full max-w-md sm:max-w-lg md:max-w-md">
          <div className="card-body">
            <h2 className="card-title text-2xl md:text-3xl mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              Log in to your account to continue tracking your favorite
              products.
            </p>

            {/* 🔹 Login Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-control gap-4"
              noValidate
            >
              {/* Username */}
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.username ? "input-error" : ""
                  }`}
                  placeholder="e.g. john_doe"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-error text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loginMutation.isPending}
                className="btn btn-primary w-full mt-2"
              >
                {isSubmitting || loginMutation.isPending
                  ? "Logging in..."
                  : "Log In"}
              </button>
            </form>

            <div className="divider">Optional</div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                Connect your Telegram account to receive alerts:
              </p>

              <script
                async
                src="https://telegram.org/js/telegram-widget.js?22"
                data-telegram-login="YOUR_TELEGRAM_BOT_USERNAME"
                data-size="large"
                data-userpic="false"
                data-auth-url="https://your-backend-domain.com/api/connect/telegram/"
                data-request-access="write"
              ></script>

              <p className="text-xs text-gray-400 mt-1">
                This will only link your Telegram account for alert delivery.
              </p>
            </div>

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link href="/register" className="link link-hover text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs sm:text-sm text-gray-500 py-6">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default Page;
