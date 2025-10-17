"use client";

import Link from "next/link";
import React from "react";
import { useWebsites } from "@/lib/hooks/useWebsites";
import { Website } from "@/lib"; // adjust path if needed

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
    <div className="hero bg-primary text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Monitor Product Prices in Real-Time
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl opacity-90">
            Add products from supported websites and get instant alerts when
            prices drop below your target.
          </p>

          {/* CTA Button */}
          <Link href="/products/add-product">
            <button className="mt-6 btn btn-soft rounded-lg text-primary font-bold bg-white hover:bg-gray-200 px-8">
              Start Monitoring
            </button>
          </Link>

          {/* Supported Websites */}
          <div className="mt-10">
            <h2 className="text-sm uppercase tracking-wide text-white/80 mb-3">
              Supported Websites
            </h2>

            {/* Loading / Error / Empty states */}
            {isLoading && (
              <p className="text-white/70 text-sm">Loading websites...</p>
            )}
            {isError && (
              <p className="text-red-200 text-sm">Failed to load websites.</p>
            )}
            {!isLoading && !isError && websites.length === 0 && (
              <p className="text-white/70 text-sm">
                No supported websites found.
              </p>
            )}

            {/* Websites list */}
            {!isLoading && !isError && websites.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {websites.map((site) => (
                  <div
                    key={site.id ?? site.url}
                    className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition"
                  >
                    {extractDomain(site.url)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
