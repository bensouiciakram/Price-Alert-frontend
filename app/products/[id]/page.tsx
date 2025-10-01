import React from "react";
import PriceHistoryChart from "@/components/ProductChart/ProductChart";

const Page = () => {
  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Product Info */}
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://via.placeholder.com/400x250"
                alt="product"
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">PlayStation 5</h2>
              <p className="text-sm text-gray-500">Store: Amazon</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="text-3xl font-bold text-success">$499.00</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Your Threshold</p>
                  <p className="text-lg font-semibold">$450.00</p>
                  <button className="btn btn-sm btn-outline mt-2">
                    Edit Threshold
                  </button>
                </div>

                <div className="text-sm text-gray-400">
                  <p>Last checked: 5 minutes ago</p>
                  <p>
                    Monitor status:{" "}
                    <span className="font-medium text-success">Active</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button className="btn btn-error">Delete Monitor</button>
                  <a href="dashboard.html" className="btn btn-outline btn-sm">
                    Back to Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chart + Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price History */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <PriceHistoryChart />
                <p className="text-xs text-gray-400 mt-3">
                  (Integrate chart library like Recharts / Chart.js when
                  converting to React)
                </p>
              </div>
            </div>

            {/* Recent Records */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-lg">Recent Price Records</h3>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full text-sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-09-30 14:25</td>
                        <td>$499.00</td>
                        <td className="text-success">—</td>
                      </tr>
                      <tr>
                        <td>2025-09-29 09:10</td>
                        <td>$519.00</td>
                        <td className="text-error">- $20</td>
                      </tr>
                      <tr>
                        <td>2025-09-28 08:12</td>
                        <td>$529.00</td>
                        <td className="text-error">- $10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto text-center text-sm text-gray-500 py-8">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default Page;
