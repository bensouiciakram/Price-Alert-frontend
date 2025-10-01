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
        <div className="bg-white shadow rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold">Settings</h2>

          <section className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">
              Demo Access Token
            </h3>
            <p className="text-sm text-gray-500">
              Share this token to allow someone to try your demo. Tokens can be
              revoked or regenerated.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="text"
                readOnly
                value="demo123"
                className="flex-1 border rounded-lg px-4 py-2 bg-gray-50 focus:outline-none"
              />
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Regenerate
              </button>
              <button className="px-4 py-2 border rounded-md text-sm text-gray-700">
                Revoke
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Current token expires: 2025-10-01 23:59
            </p>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-700">
              Notification Preferences
            </h3>
            <p className="text-sm text-gray-500 mb-2">(Demo only — UI only)</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked className="w-4 h-4" />
                <span className="text-sm">Email alerts</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Slack alerts</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Telegram alerts</span>
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-700">Account</h3>
            <div className="mt-2 flex gap-3">
              <button className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Change Password
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto text-center text-sm text-gray-500 py-8">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default page;
