"use client";

import Link from "next/link";
import React from "react";
import { useWebsites } from "@/lib/hooks/useWebsites";
import { Website } from "@/lib";
import { FaArrowRight } from "react-icons/fa6";

const CallToAction = () => {
  const { data, isLoading, isError } = useWebsites();
  const websites: Website[] = data ?? [];

  const extractDomain = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <section className="relative overflow-hidden hero-gradient min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle mb-8">
          <span className="w-2 h-2 rounded-full bg-success animate-breathe" />
          <span className="text-sm font-medium text-base-content/80">Live Price Monitoring</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up stagger-1 font-serif text-4xl sm:text-5xl lg:text-7xl font-normal leading-tight tracking-tight">
          Track Prices
          <br />
          <span className="text-gradient-amber">Never Overpay Again</span>
        </h1>

        {/* Description */}
        <p className="animate-fade-in-up stagger-2 mt-6 sm:mt-8 text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          Add products from your favorite stores and get instant alerts when
          prices drop below your target threshold.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up stagger-3 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products/add-product"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-content font-semibold rounded-xl hover:brightness-110 transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-primary/40 text-lg"
          >
            Start Monitoring
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 text-base-content/80 font-medium rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            View Your Products
          </Link>
        </div>

        {/* Supported Websites */}
        <div className="animate-fade-in-up stagger-4 mt-12 sm:mt-16">
          <p className="text-xs uppercase tracking-widest text-base-content/40 mb-4 font-medium">
            Supported Stores
          </p>

          {isLoading && (
            <p className="text-base-content/40 text-sm">Loading stores...</p>
          )}
          {isError && (
            <p className="text-error/70 text-sm">Failed to load stores.</p>
          )}
          {!isLoading && !isError && websites.length === 0 && (
            <p className="text-base-content/40 text-sm">No stores found.</p>
          )}

          {!isLoading && !isError && websites.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {websites.map((site, index) => (
                <div
                  key={site.id ?? site.url}
                  className="animate-fade-in-up glass-subtle rounded-full px-4 py-2 text-sm font-medium text-base-content/70 hover:text-base-content hover:bg-white/5 transition-all duration-300"
                  style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                >
                  {extractDomain(site.url)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
