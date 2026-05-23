import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="font-serif text-lg text-gradient-amber">
              Price Alert
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-base-content/50">
            <Link href="/products" className="hover:text-base-content transition-colors duration-300">
              Products
            </Link>
            <Link href="/products/alerts" className="hover:text-base-content transition-colors duration-300">
              Alerts
            </Link>
            <Link href="/settings" className="hover:text-base-content transition-colors duration-300">
              Settings
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-base-content/40">
            &copy; {new Date().getFullYear()} Price Alert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
