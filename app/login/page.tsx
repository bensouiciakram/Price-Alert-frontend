"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import { loginSchema, LoginFormValues } from "@/lib/schemas";

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
    } catch {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <svg
              className="w-7 h-7 text-primary-content"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl text-base-content mb-2">Welcome Back</h1>
          <p className="text-base-content/50">Log in to continue tracking prices</p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden">
          <div className="card-body p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Username */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <FaUser className="w-4 h-4 text-primary" />
                  Username
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.username ? "border-error/50" : ""
                  }`}
                  placeholder="e.g. john_doe"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-error text-xs">{errors.username.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <FaLock className="w-4 h-4 text-primary" />
                  Password
                </label>
                <input
                  type="password"
                  className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.password ? "border-error/50" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-error text-xs">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || loginMutation.isPending}
                className="btn btn-primary w-full gap-2"
              >
                {isSubmitting || loginMutation.isPending ? (
                  "Logging in..."
                ) : (
                  <>
                    Log In
                    <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="h-px bg-white/5" />

            {/* Gmail Info */}
            <div className="text-center space-y-2">
              <p className="text-sm text-base-content/50">
                Connect your Gmail for price alerts:
              </p>
              <p className="text-xs text-base-content/30">
                You'll receive price drop notifications directly to your email.
              </p>
            </div>

            <p className="text-center text-sm text-base-content/50">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
