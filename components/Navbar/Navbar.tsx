"use client";

import React from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { useLogout, useAuthStatus } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const logoutMutation = useLogout();
  const { data } = useAuthStatus();
  const loggedIn = data?.isAuthenticated ?? false;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-primary font-bold">
          Price Alert
        </Link>
      </div>

      <div className="flex-none">
        {/* 🔹 Mobile Menu */}
        <details className="dropdown">
          <summary className="btn m-1 md:hidden">
            <CiMenuBurger size={20} />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <Link href="/products/alerts">Alerts</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            {loggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </details>

        {/* 🔹 Desktop Menu */}
        <ul className="menu menu-horizontal px-1 max-md:hidden">
          <li>
            <Link href="/products/alerts">Alerts</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          {loggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
