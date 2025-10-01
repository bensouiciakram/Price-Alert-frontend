import React from "react";

const SignUp = () => {
  return (
    <div className="hero bg-gray-100 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="hero-content text-center max-w-2xl">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Get Started for Free
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600">
            Create an account in seconds and start monitoring your first product
            today. No credit card required.
          </p>
          <button className="mt-6 btn bg-indigo-600 text-white rounded-lg px-6 py-3 text-sm sm:text-base font-semibold hover:bg-indigo-700">
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
