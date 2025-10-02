"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const addProductSchema = z.object({
  url: z.string().url("Enter a valid URL"),
  threshold: z
    .string()
    .min(1, "Desired price is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, {
      message: "Enter a valid positive number",
    }),
  freq: z.enum(["3600", "14400", "86400"]),
  name: z.string().optional(),
});

type AddProductFormValues = z.infer<typeof addProductSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { url: "", threshold: "", freq: "86400", name: "" },
  });

  const onSubmit = async (values: AddProductFormValues) => {
    const payload = {
      url: values.url,
      threshold: Number(values.threshold),
      freq: Number(values.freq),
      name: values.name?.trim() || undefined,
    };
    console.log("submit add product", payload);
    reset({ url: "", threshold: "", freq: "86400", name: "" });
  };
  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      {/* Main */}
      <main className="max-w-3xl mx-auto py-12 px-4">
        <div className="card shadow-xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl">Add a Product to Monitor</h2>
            <p className="text-sm text-gray-500">
              Paste a product URL and set a target price. We'll check it
              periodically and alert you when it drops below your threshold.
            </p>

            <form className="form-control gap-4 mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Product URL */}
              <div>
                <label className="label">
                  <span className="label-text">Product URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.amazon.com/..."
                  className={`input input-bordered w-full ${errors.url ? "input-error" : ""}`}
                  aria-invalid={!!errors.url}
                  {...register("url")}
                />
                {errors.url && (
                  <span className="text-error text-xs mt-1">{errors.url.message}</span>
                )}
              </div>

              {/* Price + Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Desired Price (USD)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 450.00"
                    className={`input input-bordered w-full ${errors.threshold ? "input-error" : ""}`}
                    aria-invalid={!!errors.threshold}
                    {...register("threshold")}
                  />
                  {errors.threshold && (
                    <span className="text-error text-xs mt-1">{errors.threshold.message}</span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Check Frequency</span>
                  </label>
                  <select
                    className={`select select-bordered w-full ${errors.freq ? "select-error" : ""}`}
                    aria-invalid={!!errors.freq}
                    {...register("freq")}
                  >
                    <option value="3600">Every hour</option>
                    <option value="14400">Every 4 hours</option>
                    <option value="86400">Daily</option>
                  </select>
                  {errors.freq && (
                    <span className="text-error text-xs mt-1">{errors.freq.message}</span>
                  )}
                </div>
              </div>

              {/* Friendly Name */}
              <div>
                <label className="label">
                  <span className="label-text">Optional: Friendly Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. My PS5 Alert"
                  className="input input-bordered w-full"
                  {...register("name")}
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
                <a href="dashboard.html" className="link link-hover">
                  Cancel
                </a>
              </div>
            </form>

            <p className="text-xs text-gray-400 mt-4">Form includes client-side validation.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto text-center text-sm text-gray-500 py-8">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default Page;
