import React from "react";

const Card = () => {
  return (
    <div className="card w-full max-w-sm sm:max-w-md lg:max-w-lg bg-base-100 shadow-md rounded-xl mx-auto">
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl lg:text-2xl">
          PlayStation 5
        </h2>
        <h3 className="text-sm sm:text-base text-gray-500">Amazon</h3>
        <p className="text-primary text-xl sm:text-2xl lg:text-3xl font-bold mt-2">
          $499
        </p>
        <p className="text-xs sm:text-sm text-gray-400">
          Last updated: 5 min ago
        </p>
      </div>
    </div>
  );
};

export default Card;
