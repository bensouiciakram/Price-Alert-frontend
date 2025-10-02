"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  token: z
    .string()
    .min(1, "Token is required")
    .max(512, "Token is too long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { token: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    // TODO: replace with real auth call
    console.log("login with token", values.token);
    reset();
  };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen px-4 sm:px-6">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center text-primary text-xl sm:text-2xl mb-6">
            Enter Demo Token
          </h2>

          <form className="form-control gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-1">
              <input
                type="text"
                placeholder="Enter your token"
                className={`input input-bordered w-full ${errors.token ? "input-error" : ""}`}
                {...register("token")}
                aria-invalid={!!errors.token}
              />
              {errors.token && (
                <span className="text-error text-xs mt-1">{errors.token.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-xs sm:text-sm text-center text-gray-500">
            Token will expire after a limited time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
