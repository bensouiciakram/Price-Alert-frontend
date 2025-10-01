import React from "react";

const page = () => {
  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <section className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">Your Products</h2>
          <a
            href="add-product.html"
            className="btn btn-primary btn-sm sm:btn-md"
          >
            + Add Product
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-lg">PlayStation 5</h3>
              <p className="text-sm text-gray-500">Amazon</p>
              <p className="text-2xl font-bold text-success mt-2">$499</p>
              <p className="text-xs sm:text-sm text-gray-400">
                Last updated: 10 min ago
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-lg">iPhone 15</h3>
              <p className="text-sm text-gray-500">Apple Store</p>
              <p className="text-2xl font-bold text-error mt-2">$999</p>
              <p className="text-xs sm:text-sm text-gray-400">
                Last updated: 20 min ago
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
