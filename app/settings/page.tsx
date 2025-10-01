import React from "react";

const Page = () => {
  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      {/* Main */}
      <main className="max-w-3xl mx-auto py-12 px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-8">
            <h2 className="card-title text-2xl">Settings</h2>

            {/* Demo Token */}
            <section className="space-y-2">
              <h3 className="text-sm font-medium">Demo Access Token</h3>
              <p className="text-sm text-gray-500">
                Share this token to allow someone to try your demo. Tokens can
                be revoked or regenerated.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <input
                  type="text"
                  readOnly
                  value="demo123"
                  className="input input-bordered flex-1 bg-base-200"
                />
                <button className="btn btn-primary">Regenerate</button>
                <button className="btn btn-outline">Revoke</button>
              </div>
              <p className="text-xs text-gray-400">
                Current token expires: 2025-10-01 23:59
              </p>
            </section>

            {/* Notifications */}
            <section>
              <h3 className="text-sm font-medium">Notification Preferences</h3>
              <p className="text-sm text-gray-500 mb-2">
                (Demo only — UI only)
              </p>
              <div className="form-control gap-2">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="label-text">Email alerts</span>
                </label>
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text">Slack alerts</span>
                </label>
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text">Telegram alerts</span>
                </label>
              </div>
            </section>

            {/* Account */}
            <section>
              <h3 className="text-sm font-medium">Account</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <button className="btn btn-outline">Change Password</button>
                <button className="btn btn-error text-white">Logout</button>
              </div>
            </section>
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
