"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProduct } from "../../../lib";

const addProductSchema = z.object({
  url: z.string().url("Enter a valid URL"),
  threshold: z
    .string()
    .min(1, "Desired price is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, {
      message: "Enter a valid positive number",
    }),
  freq: z.enum(["", "3600", "14400", "86400"]).refine((val) => val !== "", {
    message: "Please select a valid frequency",
  }),
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
      freq: "",
      channel: "gmail",
    },
  });

  const addProduct = useAddProduct();

  const onSubmit = async (values: AddProductFormValues) => {
    try {
      const productData = {
        product_url: values.url,
        channel: values.channel,
        threshold: Number(values.threshold),
        frequency: Number(values.freq),
      };

      const result = await addProduct.mutateAsync(productData);
      console.log("Product added successfully:", result.message);

      reset({
        url: "",
        threshold: "",
        freq: "3600",
        channel: "telegram",
      });

      alert(
        "Product added successfully! We'll start monitoring it for price changes."
      );
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <section className="max-w-3xl mx-auto py-12 sm:py-16 px-6 sm:px-8">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Add Product to Monitor
        </h2>

        <div className="card bg-base-100 shadow-xl rounded-2xl">
          <div className="card-body p-8 sm:p-10 space-y-8">
            {/* Alerts */}
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
                  Product added successfully! We&apos;ll start monitoring it for
                  price changes.
                </span>
              </div>
            )}

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

            {/* Form */}
            <form
              className="form-control space-y-8"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* URL */}
              <div className="space-y-2">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-base">
                    Product URL
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.amazon.com/..."
                  className={`input input-bordered w-full h-11 focus:outline-none focus:ring-0 ${
                    errors.url ? "input-error" : ""
                  }`}
                  {...register("url")}
                />
                {errors.url && (
                  <span className="text-error text-xs mt-1">
                    {errors.url.message}
                  </span>
                )}
              </div>

              {/* Price and Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text font-semibold text-base">
                      Desired Price (USD)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 450.00"
                    className={`input input-bordered w-full h-11 focus:outline-none focus:ring-0 ${
                      errors.threshold ? "input-error" : ""
                    }`}
                    {...register("threshold")}
                  />
                  {errors.threshold && (
                    <span className="text-error text-xs mt-1">
                      {errors.threshold.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text font-semibold text-base">
                      Check Frequency
                    </span>
                  </label>
                  <select
                    className={`select select-bordered w-full h-11 focus:outline-none focus:ring-0 focus:shadow-none focus:border-base-300 ${
                      errors.freq ? "select-error" : ""
                    }`}
                    style={{ boxShadow: "none" }}
                    {...register("freq")}
                  >
                    <option value="">Select frequency</option>
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

              {/* Alert Channel */}
              <div className="space-y-2">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-base">
                    Alert Channel
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full h-11 focus:outline-none focus:ring-0 focus:shadow-none focus:border-base-300 ${
                    errors.channel ? "select-error" : ""
                  }`}
                  style={{ boxShadow: "none" }}
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
              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto px-8 py-3 text-base"
                  disabled={addProduct.isPending}
                >
                  {addProduct.isPending ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-400 text-center">
              Form includes client-side validation and safe frequency limits.
            </p>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto text-center text-sm text-gray-500 py-8">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default Page;
