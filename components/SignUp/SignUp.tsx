"use client";
import React from "react";
import Link from "next/link";
import { useAuthStatus } from "@/lib/hooks/useAuth";
import { FaUserPlus } from "react-icons/fa6";

const SignUp = () => {
  const { data, isLoading } = useAuthStatus();
  const loggedIn = data?.isAuthenticated ?? false;

  if (isLoading) return null;
  if (loggedIn) return null;

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-200 via-base-300/30 to-base-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto text-center animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
          <FaUserPlus className="w-8 h-8 text-primary" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-base-content mb-5 leading-tight">
          Start Saving Today
        </h2>

        <p className="text-base-content/60 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Create your free account to track unlimited products and receive instant price drop alerts via Telegram or email.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-content font-semibold rounded-xl hover:brightness-110 transition-all duration-300 shadow-xl shadow-primary/25 text-lg"
          >
            <FaUserPlus className="w-5 h-5" />
            Create Free Account
          </Link>
          <Link
            href="/login"
            className="text-base-content/70 hover:text-base-content font-medium transition-colors duration-300"
          >
            Already have an account? <span className="text-primary hover:underline">Log in</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
