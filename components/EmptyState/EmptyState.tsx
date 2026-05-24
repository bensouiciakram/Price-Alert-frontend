"use client";

import React from "react";
import { IconType } from "react-icons";
import Link from "next/link";

interface EmptyStateProps {
  icon?: IconType;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-20 animate-fade-in-up">
      {Icon && (
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-base-300 flex items-center justify-center">
          <Icon className="w-10 h-10 text-base-content/20" />
        </div>
      )}
      <h3 className="font-serif text-2xl sm:text-3xl text-base-content mb-3">
        {title}
      </h3>
      {description && (
        <p className="text-base-content/50 max-w-md mx-auto mb-8">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content font-semibold rounded-xl hover:brightness-110 transition-all duration-300"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content font-semibold rounded-xl hover:brightness-110 transition-all duration-300"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}