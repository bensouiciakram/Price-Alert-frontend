"use client";

import React from "react";
import { IconType } from "react-icons";

interface SectionHeaderProps {
  icon: IconType;
  title: string;
  className?: string;
}

export default function SectionHeader({ icon: Icon, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-2 mb-4 pb-3 border-b border-white/5 ${className}`}>
      <Icon className="w-4 h-4 text-primary" />
      <h3 className="font-semibold text-base-content">{title}</h3>
    </div>
  );
}