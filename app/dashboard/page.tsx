import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-xl font-bold text-indigo-600">Price Monitor</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="dashboard.html" className="hover:text-indigo-600">
              Dashboard
            </a>
            <a href="alerts.html" className="hover:text-indigo-600">
              Alerts
            </a>
            <a href="login.html" className="hover:text-indigo-600">
              Logout
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Products</h2>
          <a
            href="add-product.html"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + Add Product
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold text-lg">PlayStation 5</h3>
            <p className="text-sm text-gray-500">Amazon</p>
            <p className="text-2xl text-green-600 font-bold mt-2">$499</p>
            <p className="text-gray-400 text-sm">Last updated: 10 min ago</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold text-lg">iPhone 15</h3>
            <p className="text-sm text-gray-500">Apple Store</p>
            <p className="text-2xl text-red-600 font-bold mt-2">$999</p>
            <p className="text-gray-400 text-sm">Last updated: 20 min ago</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
