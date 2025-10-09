"use client";

import React from "react";

export default function EmailVerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Check your email
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          We’ve sent you a confirmation link. Please check your inbox and click
          the link to verify your account.
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">
          Didn’t get the email? Check your spam folder or request a new one.
        </p>
      </div>
    </div>
  );
}
