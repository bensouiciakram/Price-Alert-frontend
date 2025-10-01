import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Enter Demo Token
        </h2>
        <form>
          <input
            type="text"
            placeholder="Enter your token"
            className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Token will expire after a limited time.
        </p>
      </div>
    </div>
  );
};

export default page;
