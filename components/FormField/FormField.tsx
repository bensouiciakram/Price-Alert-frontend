"use client";

import React from "react";
import { IconType } from "react-icons";

interface FormFieldProps {
  name: string;
  label: string;
  icon?: IconType;
  type?: "text" | "password" | "email" | "number" | "url" | "select";
  error?: { message?: string };
  placeholder?: string;
  options?: { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (...args: any[]) => any;
}

export default function FormField({
  name,
  label,
  icon: Icon,
  type = "text",
  error,
  placeholder,
  options,
  register,
}: FormFieldProps) {
  const isSelect = type === "select";

  const inputClasses = `input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
    error ? "border-error/50" : ""
  }`;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        {label}
      </label>

      {isSelect ? (
        <select className={inputClasses} {...register(name)}>
          <option value="">{placeholder || "Select..."}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          {...register(name)}
        />
      )}

      {error?.message && (
        <span className="text-error text-xs">{error.message}</span>
      )}
    </div>
  );
}