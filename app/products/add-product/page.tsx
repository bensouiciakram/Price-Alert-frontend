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

      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="bg-white shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Add a product to monitor</h2>
          <p className="text-sm text-gray-500 mb-6">
            Paste a product URL and set a target price. We'll check it
            periodically and alert you when it drops below your threshold.
          </p>

          <form action="dashboard.html" method="GET" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product URL
              </label>
              <input
                name="url"
                type="url"
                required
                placeholder="https://www.amazon.com/..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Desired Price (USD)
                </label>
                <input
                  name="threshold"
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 450.00"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Check Frequency
                </label>
                <select
                  name="freq"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="3600">Every hour</option>
                  <option value="14400">Every 4 hours</option>
                  <option value="86400" selected>
                    Daily
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Optional: Friendly Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g. My PS5 Alert"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
              >
                Add Product
              </button>
              <a
                href="dashboard.html"
                className="text-sm text-gray-600 hover:underline"
              >
                Cancel
              </a>
            </div>
          </form>

          <p className="text-xs text-gray-400 mt-4">
            Note: This demo form redirects to the dashboard. Hook this to your
            API to actually create a monitor.
          </p>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto text-center text-sm text-gray-500 py-8">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default page;
