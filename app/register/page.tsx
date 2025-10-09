"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🧩 Validation Schema
const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      console.log("Signup Data:", data);
      // 🔹 Make your backend API call here
      // await fetch("/api/signup/", { method: "POST", body: JSON.stringify(data) });
      reset();
      alert("Signup successful!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-base-200 text-base-content min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="card shadow-xl bg-base-100 w-full max-w-md sm:max-w-lg md:max-w-md">
          <div className="card-body">
            <h2 className="card-title text-2xl md:text-3xl mb-2 text-center">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              Sign up to track your favorite products and receive alerts when
              prices drop.
            </p>

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

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
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

              {/* Confirm Password */}
              <div>
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  className={`input input-bordered w-full ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full mt-2"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <div className="divider">Optional</div>

            {/* ✅ Telegram Connection Section */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                Connect your Telegram account to receive price alerts directly:
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
                This will not log you in — it only links your Telegram account
                for alert delivery.
              </p>
            </div>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a href="/login" className="link link-hover text-primary">
                Log in
              </a>
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
