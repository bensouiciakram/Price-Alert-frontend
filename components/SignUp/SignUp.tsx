"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const handleTokenPageRedirect = () => {
    router.push("/login"); // or a page where they paste their token
  };

  return (
    <div className="hero bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="hero-content text-center max-w-2xl">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Access with Token Only
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-600">
            This demo requires a valid{" "}
            <span className="font-semibold">access token</span>. Tokens are
            provided directly by the administrator. If you already have one, you
            can continue below.
          </p>
          <button
            onClick={handleTokenPageRedirect}
            className="mt-6 btn bg-primary text-white rounded-md px-6 py-3 text-sm sm:text-base font-semibold hover:bg-primary/90"
          >
            Enter Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
