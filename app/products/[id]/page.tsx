import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
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
            <a href="settings.html" className="hover:text-indigo-600">
              Settings
            </a>
            <a href="login.html" className="hover:text-indigo-600">
              Logout
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow rounded-xl p-6">
            <img
              src="https://via.placeholder.com/400x250"
              alt="product image"
              className="w-full rounded-md mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold mb-1">PlayStation 5</h2>
            <p className="text-sm text-gray-500 mb-4">Store: Amazon</p>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Current Price</p>
                <p className="text-3xl font-bold text-green-600">$499.00</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Your Threshold</p>
                <p className="text-lg font-semibold">$450.00</p>
                <button className="mt-2 px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
                  Edit Threshold
                </button>
              </div>

              <div className="text-sm text-gray-400">
                <p>Last checked: 5 minutes ago</p>
                <p>
                  Monitor status:{" "}
                  <span className="font-medium text-green-600">Active</span>
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Delete Monitor
                </button>
                <a
                  href="dashboard.html"
                  className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Back to Dashboard
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Price History</h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-md text-gray-400">
                [Price History Chart Here]
              </div>
              <p className="text-xs text-gray-400 mt-3">
                (Integrate chart library like Recharts / Chart.js when
                converting to React)
              </p>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Recent Price Records
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-500">
                    <tr>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Change</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-t">
                      <td className="py-3">2025-09-30 14:25</td>
                      <td className="py-3">$499.00</td>
                      <td className="py-3 text-green-600">—</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3">2025-09-29 09:10</td>
                      <td className="py-3">$519.00</td>
                      <td className="py-3 text-red-600">-$20</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3">2025-09-28 08:12</td>
                      <td className="py-3">$529.00</td>
                      <td className="py-3 text-red-600">- $10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
