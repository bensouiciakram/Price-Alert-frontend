"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProduct } from "../../../lib";
import { FaLink, FaTag, FaClock, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

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

      alert("Product added successfully! We'll start monitoring it for price changes.");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <section className="max-w-2xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="font-serif text-3xl sm:text-4xl text-base-content mb-3">
            Add Product to Monitor
          </h2>
          <p className="text-base-content/50 max-w-md mx-auto">
            Paste a product URL and set your target price. We will track it and alert you on drops.
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden animate-fade-in-up stagger-1">
          <div className="card-body p-6 sm:p-8 space-y-6">
            {/* Success / Error Alerts */}
            {addProduct.isSuccess && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20 text-success">
                <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Product added successfully! Monitoring started.</span>
              </div>
            )}
            {addProduct.isError && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/20 text-error">
                <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {addProduct.error?.message || "Failed to add product."}
                </span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* URL */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <FaLink className="w-4 h-4 text-primary" />
                  Product URL
                </label>
                <input
                  type="url"
                  placeholder="https://www.amazon.com/..."
                  className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.url ? "border-error/50" : ""
                  }`}
                  {...register("url")}
                />
                {errors.url && (
                  <span className="text-error text-xs">{errors.url.message}</span>
                )}
              </div>

              {/* Price and Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                    <FaTag className="w-4 h-4 text-primary" />
                    Desired Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 450.00"
                    className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                      errors.threshold ? "border-error/50" : ""
                    }`}
                    {...register("threshold")}
                  />
                  {errors.threshold && (
                    <span className="text-error text-xs">{errors.threshold.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                    <FaClock className="w-4 h-4 text-primary" />
                    Check Frequency
                  </label>
                  <select
                    className={`select select-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                      errors.freq ? "border-error/50" : ""
                    }`}
                    {...register("freq")}
                  >
                    <option value="">Select frequency</option>
                    <option value="3600">Every hour</option>
                    <option value="14400">Every 4 hours</option>
                    <option value="86400">Daily</option>
                  </select>
                  {errors.freq && (
                    <span className="text-error text-xs">{errors.freq.message}</span>
                  )}
                </div>
              </div>

              {/* Alert Channel */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <FaPaperPlane className="w-4 h-4 text-primary" />
                  Alert Channel
                </label>
                <select
                  className={`select select-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.channel ? "border-error/50" : ""
                  }`}
                  {...register("channel")}
                >
                  <option value="telegram">Telegram</option>
                  <option value="gmail">Gmail</option>
                </select>
                {errors.channel && (
                  <span className="text-error text-xs">{errors.channel.message}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full gap-2"
                disabled={addProduct.isPending}
              >
                <FaPaperPlane className="w-4 h-4" />
                {addProduct.isPending ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
