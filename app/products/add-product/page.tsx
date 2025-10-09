"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProduct } from "../../../lib";

// ✅ Updated schema
const addProductSchema = z.object({
  url: z.string().url("Enter a valid URL"),
  threshold: z
    .string()
    .min(1, "Desired price is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, {
      message: "Enter a valid positive number",
    }),
  // allow 1 minute scraping option
  freq: z.enum(["10", "3600", "14400", "86400"]),
  name: z.string().optional(),
  channel: z
    .enum(["telegram", "gmail"])
    .refine((val) => !!val, { message: "Please select a channel" }),
});

type AddProductFormValues = z.infer<typeof addProductSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      url: "",
      threshold: "",
      freq: "86400",
      name: "",
      channel: "telegram",
    },
  });

  // Use the React Query hook
  const addProduct = useAddProduct();

  const onSubmit = async (values: AddProductFormValues) => {
    try {
      // Transform form data to match API expectations
      const productData = {
        product_url: values.url,
        channel: values.channel,
        threshold: Number(values.threshold),
        frequency: Number(values.freq),
      };

      // Call the mutation
      const result = await addProduct.mutateAsync(productData);

      // Show success message
      console.log("Product added successfully:", result.message);

      // Reset form on success
      reset({
        url: "",
        threshold: "",
        freq: "86400",
        name: "",
        channel: "telegram",
      });

      // Show success notification
      alert(
        "Product added successfully! We'll start monitoring it for price changes."
      );
    } catch (error) {
      console.error("Failed to add product:", error);
      // Handle error - you could show a toast notification here
      alert("Failed to add product. Please try again.");
    }
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

            {/* Success Message */}
            {addProduct.isSuccess && (
              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Product added successfully! We'll start monitoring it for
                  price changes.
                </span>
              </div>
            )}

            {/* Error Message */}
            {addProduct.isError && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {addProduct.error?.message ||
                    "Failed to add product. Please try again."}
                </span>
              </div>
            )}

            <form
              className="form-control gap-4 mt-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Product URL */}
              <div>
                <label className="label">
                  <span className="label-text">Product URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.amazon.com/..."
                  className={`input input-bordered w-full ${
                    errors.url ? "input-error" : ""
                  }`}
                  aria-invalid={!!errors.url}
                  {...register("url")}
                />
                {errors.url && (
                  <span className="text-error text-xs mt-1">
                    {errors.url.message}
                  </span>
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
                    className={`input input-bordered w-full ${
                      errors.threshold ? "input-error" : ""
                    }`}
                    aria-invalid={!!errors.threshold}
                    {...register("threshold")}
                  />
                  {errors.threshold && (
                    <span className="text-error text-xs mt-1">
                      {errors.threshold.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Check Frequency</span>
                  </label>
                  <select
                    className={`select select-bordered w-full ${
                      errors.freq ? "select-error" : ""
                    }`}
                    aria-invalid={!!errors.freq}
                    {...register("freq")}
                  >
                    <option value="10">Every 1 minute</option>
                    <option value="3600">Every hour</option>
                    <option value="14400">Every 4 hours</option>
                    <option value="86400">Daily</option>
                  </select>
                  {errors.freq && (
                    <span className="text-error text-xs mt-1">
                      {errors.freq.message}
                    </span>
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

              {/* 🔔 Alert Channel */}
              <div>
                <label className="label">
                  <span className="label-text">Alert Channel</span>
                </label>
                <select
                  className={`select select-bordered w-full ${
                    errors.channel ? "select-error" : ""
                  }`}
                  aria-invalid={!!errors.channel}
                  {...register("channel")}
                >
                  <option value="telegram">Telegram</option>
                  <option value="gmail">Gmail</option>
                </select>
                {errors.channel && (
                  <span className="text-error text-xs mt-1">
                    {errors.channel.message}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={addProduct.isPending}
                >
                  {addProduct.isPending ? "Adding..." : "Add Product"}
                </button>
                <a href="dashboard.html" className="link link-hover">
                  Cancel
                </a>
              </div>
            </form>

            <p className="text-xs text-gray-400 mt-4">
              Form includes client-side validation.
            </p>
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
