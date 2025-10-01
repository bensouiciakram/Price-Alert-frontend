import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Alerts</h2>
          <div className="text-sm text-gray-500">Showing recent alerts</div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold">PlayStation 5 — Price dropped</h3>
              <p className="text-sm text-gray-500">
                Amazon • Triggered: 2025-09-30 14:26
              </p>
              <p className="mt-2 text-gray-700">
                Old price: <span className="line-through">$519.00</span> • New
                price: <span className="font-bold text-green-600">$499.00</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <a
                href="product-1.html"
                className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                View Product
              </a>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Mark as Read
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold">iPhone 15 — Price increased</h3>
              <p className="text-sm text-gray-500">
                Apple Store • Triggered: 2025-09-29 09:18
              </p>
              <p className="mt-2 text-gray-700">
                Old price: <span className="line-through">$999.00</span> • New
                price: <span className="font-bold text-red-600">$1,049.00</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <a
                href="#"
                className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                View Product
              </a>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Mark as Read
              </button>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-6 text-center text-gray-500">
            No more recent alerts.
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto text-center text-sm text-gray-500 py-8">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default page;
