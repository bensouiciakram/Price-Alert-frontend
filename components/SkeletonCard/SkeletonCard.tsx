"use client";

import React from "react";

interface SkeletonCardProps {
  lines?: number;
  animate?: boolean;
}

export default function SkeletonCard({ lines = 3, animate = true }: SkeletonCardProps) {
  return (
    <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden">
      <div className="card-body space-y-4">
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className={`skeleton-shimmer rounded ${
              i === 0 ? "h-6 w-3/4" : i === lines - 1 ? "h-4 w-1/2" : "h-4 w-2/3"
            } ${animate ? "" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, columns = 3 }: { count?: number; columns?: 1 | 2 | 3 }) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${colClasses[columns]} gap-6`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="animate-fade-in"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <SkeletonCard lines={4} />
        </div>
      ))}
    </div>
  );
}