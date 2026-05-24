"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  animate?: boolean;
  staggerIndex?: number;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function GlassCard({
  children,
  className = "",
  padding = "md",
  animate = false,
  staggerIndex,
}: GlassCardProps) {
  return (
    <div
      className={`card bg-base-100 border border-white/5 rounded-2xl overflow-hidden card-lift card-glow ${paddingClasses[padding]} ${className} ${
        animate ? "animate-fade-in-up" : ""
      } ${staggerIndex !== undefined ? `stagger-${Math.min(staggerIndex, 8)}` : ""}`}
      style={staggerIndex !== undefined ? { animationDelay: `${staggerIndex * 0.08}s` } : undefined}
    >
      {children}
    </div>
  );
}