"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useLogout, useAuthStatus } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { isActive } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const logoutMutation = useLogout();
  const { data } = useAuthStatus();
  const loggedIn = data?.isAuthenticated ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActiveLink = (href: string) => isActive(href, pathname);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                <svg
                  className="w-4 h-4 text-primary-content"
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
              <span className="font-serif text-xl tracking-tight text-gradient-amber">
                Price Alert
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group ${
                    isActiveLink(link.href)
                      ? "text-primary"
                      : "text-base-content/70 hover:text-base-content"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      isActiveLink(link.href)
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}

              <div className="h-6 w-px bg-white/10 mx-2" />

              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-base-content/70 hover:text-error transition-colors duration-300 rounded-lg hover:bg-error/10"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-semibold bg-primary text-primary-content rounded-lg hover:brightness-110 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <IoClose className="w-6 h-6 text-base-content" />
              ) : (
                <CiMenuBurger className="w-6 h-6 text-base-content" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-16 right-0 bottom-0 w-72 glass-strong border-l border-white/10 transform transition-transform duration-500 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 space-y-2">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  isActiveLink(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:text-base-content hover:bg-white/5"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-white/10 my-4" />

            {loggedIn ? (
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="w-full text-left px-4 py-3 text-base font-medium text-error/80 hover:text-error hover:bg-error/10 rounded-lg transition-all duration-300"
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-3 text-base font-semibold bg-primary text-primary-content rounded-lg text-center hover:brightness-110 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;