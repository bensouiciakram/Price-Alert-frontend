import React from "react";

const page = () => {
  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen px-4 sm:px-6">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center text-primary text-xl sm:text-2xl mb-6">
            Enter Demo Token
          </h2>

          <form className="form-control gap-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your token"
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Login
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
