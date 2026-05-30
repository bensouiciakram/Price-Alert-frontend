"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaArrowRight } from "react-icons/fa";
import { signupSchema, SignupFormValues } from "@/lib/schemas";

const Page = () => {
  const router = useRouter();
  const { mutate: registerUser, isPending, isError, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    registerUser(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        re_password: data.confirmPassword,
      },
      {
        onSuccess: () => {
          reset();
          router.push("/register/verify");
        },
        onError: () => {
          alert("Something went wrong during registration.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <FaUserPlus className="w-7 h-7 text-primary-content" />
          </div>
          <h1 className="font-serif text-3xl text-base-content mb-2">Create Account</h1>
          <p className="text-base-content/50">Start tracking prices for free</p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden">
          <div className="card-body p-6 sm:p-8 space-y-5">
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

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <FaEnvelope className="w-4 h-4 text-primary" />
                  Email
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.email ? "border-error/50" : ""
                  }`}
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-error text-xs">{errors.email.message}</p>
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <FaLock className="w-4 h-4 text-primary" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.confirmPassword ? "border-error/50" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-error text-xs">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="btn btn-primary w-full gap-2"
              >
                {isSubmitting || isPending ? (
                  "Signing Up..."
                ) : (
                  <>
                    Sign Up
                    <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {isError && (
                <p className="text-error text-center text-sm">
                  {error instanceof Error ? error.message : "Registration failed."}
                </p>
              )}
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
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
