import React from "react";
import Link from "next/link";

const Card = () => {
  return (
    <div className="card w-full max-w-sm bg-white shadow-md rounded-xl mx-auto hover:shadow-lg transition">
      <div className="card-body p-5">
        <h2 className="card-title text-lg sm:text-xl font-bold">
          PlayStation 5
        </h2>
        <h3 className="text-sm text-gray-500">Amazon</h3>

        <p className="text-green-600 text-xl sm:text-2xl font-bold mt-2">
          $499
        </p>

        <p className="text-xs text-gray-400">Last checked: 5 min ago</p>

        <div className="mt-3 flex gap-2">
          <Link href="/products/1">
            <button className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700">
              View Details
            </button>
          </Link>
          <button className="btn btn-sm border text-gray-600 hover:bg-gray-50">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
