import React from "react";

const Page = () => {
  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-primary font-bold">
            Price Monitor
          </a>
        </div>
        <nav className="flex gap-4">
          <a href="dashboard.html" className="link link-hover">
            Dashboard
          </a>
          <a href="alerts.html" className="link link-hover">
            Alerts
          </a>
          <a href="settings.html" className="link link-hover">
            Settings
          </a>
          <a href="login.html" className="link link-hover">
            Logout
          </a>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto py-12 px-4">
        <div className="card shadow-xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl">Add a Product to Monitor</h2>
            <p className="text-sm text-gray-500">
              Paste a product URL and set a target price. We'll check it
              periodically and alert you when it drops below your threshold.
            </p>

            <form
              action="dashboard.html"
              method="GET"
              className="form-control gap-4 mt-4"
            >
              {/* Product URL */}
              <div>
                <label className="label">
                  <span className="label-text">Product URL</span>
                </label>
                <input
                  name="url"
                  type="url"
                  required
                  placeholder="https://www.amazon.com/..."
                  className="input input-bordered w-full"
                />
              </div>

              {/* Price + Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Desired Price (USD)</span>
                  </label>
                  <input
                    name="threshold"
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 450.00"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Check Frequency</span>
                  </label>
                  <select
                    name="freq"
                    className="select select-bordered w-full"
                    defaultValue="86400"
                  >
                    <option value="3600">Every hour</option>
                    <option value="14400">Every 4 hours</option>
                    <option value="86400">Daily</option>
                  </select>
                </div>
              </div>

              {/* Friendly Name */}
              <div>
                <label className="label">
                  <span className="label-text">Optional: Friendly Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. My PS5 Alert"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
                <a href="dashboard.html" className="link link-hover">
                  Cancel
                </a>
              </div>
            </form>

            <p className="text-xs text-gray-400 mt-4">
              Note: This demo form redirects to the dashboard. Hook this to your
              API to actually create a monitor.
            </p>
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
