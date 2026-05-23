"use client";

import React from "react";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

export default function EmailVerificationPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden text-center">
          <div className="card-body p-8 sm:p-10 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <FaEnvelope className="w-8 h-8 text-primary" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-base-content">
              Check Your Email
            </h1>

            <p className="text-base-content/60 leading-relaxed">
              We&apos;ve sent you a confirmation link. Please check your inbox and click
              the link to verify your account.
            </p>

            <div className="p-4 rounded-xl bg-base-300/30 border border-white/5">
              <p className="text-sm text-base-content/40">
                Didn&apos;t get the email? Check your spam folder or{" "}
                <Link href="/register" className="text-primary hover:underline">
                  try again
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
