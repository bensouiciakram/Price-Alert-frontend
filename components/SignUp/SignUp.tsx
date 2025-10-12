"use client";
import React from "react";
import Link from "next/link";
import { useAuthStatus } from "@/lib/hooks/useAuth";

const SignUp = () => {
  const { data, isLoading } = useAuthStatus();
  const loggedIn = data?.isAuthenticated ?? false;

  // While loading, you can return nothing or a small skeleton
  if (isLoading) return null;

  if (loggedIn) return null; // 🔹 Hide SignUp if user is already logged in

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Create Your Account
        </h1>

        <p className="mt-4 text-base text-gray-600">
          To access our platform, please register with your{" "}
          <span className="font-semibold">username</span>,{" "}
          <span className="font-semibold">email</span>, and{" "}
          <span className="font-semibold">password</span>. This will allow you
          to securely log in and start using our services.
        </p>

        <div className="mt-6">
          <Link
            href="/register"
            className="bg-primary text-white rounded-md px-6 py-3 text-base font-semibold hover:bg-primary/90"
          >
            Create Account
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
