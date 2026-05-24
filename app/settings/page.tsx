import React from "react";
import { FaKey, FaBell, FaUser } from "react-icons/fa6";
import { NOTIFICATION_PREFERENCES } from "@/lib/constants";

const Page = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <main className="max-w-2xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <h2 className="font-serif text-3xl sm:text-4xl text-base-content mb-2">Settings</h2>
          <p className="text-base-content/50">Manage your account and notification preferences.</p>
        </div>

        <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden animate-fade-in-up stagger-1">
          <div className="card-body p-6 sm:p-8 space-y-10">
            {/* Demo Token */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FaKey className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base-content">Demo Access Token</h3>
              </div>
              <p className="text-sm text-base-content/50">
                Share this token to allow someone to try your demo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  readOnly
                  value="demo123"
                  className="input input-bordered flex-1 bg-base-200 border-white/10 text-base-content/70 font-mono"
                />
                <button className="btn btn-primary btn-sm sm:btn-md">Regenerate</button>
                <button className="btn btn-outline btn-sm sm:btn-md border-white/10">Revoke</button>
              </div>
              <p className="text-xs text-base-content/30">
                Current token expires: 2025-10-01 23:59
              </p>
            </section>

            <div className="h-px bg-white/5" />

            {/* Notifications */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <FaBell className="w-4 h-4 text-success" />
                </div>
                <h3 className="font-semibold text-base-content">Notification Preferences</h3>
              </div>
              <div className="space-y-3">
                {NOTIFICATION_PREFERENCES.map((label, i) => (
                  <label
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-base-300/20 border border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={i === 0}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="text-sm text-base-content/80">{label}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="h-px bg-white/5" />

            {/* Account */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
                  <FaUser className="w-4 h-4 text-info" />
                </div>
                <h3 className="font-semibold text-base-content">Account</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="btn btn-outline border-white/10 hover:bg-white/5">Change Password</button>
                <button className="btn btn-error btn-outline">Logout</button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
